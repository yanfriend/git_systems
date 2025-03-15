package main

import (
	"fmt"
	"io"
	"log"
	"net"
	"sync"

	pb "grpc-chat/chat" // Import generated Protobuf package

	"google.golang.org/grpc"
)

type chatServer struct {
	pb.UnimplementedChatServer                               // Embed to satisfy interface
	clients                    map[chan *pb.Message]struct{} // Track client channels
	broadcast                  chan *pb.Message              // Channel for broadcasting
	mu                         sync.Mutex                    // Protect clients map
}

func NewChatServer() *chatServer {
	return &chatServer{
		clients:   make(map[chan *pb.Message]struct{}),
		broadcast: make(chan *pb.Message, 10), // Buffered for async broadcasts
	}
}

// ChatStream handles bidirectional streaming
func (s *chatServer) ChatStream(stream pb.Chat_ChatStreamServer) error {
	// Create a channel for this client to receive messages
	clientChan := make(chan *pb.Message)
	s.mu.Lock()
	s.clients[clientChan] = struct{}{} // Add client to map
	s.mu.Unlock()

	// Cleanup when client disconnects
	defer func() {
		s.mu.Lock()
		delete(s.clients, clientChan)
		s.mu.Unlock()
		close(clientChan)
	}()

	// Goroutine to send messages to this client
	go func() {
		for msg := range clientChan {
			if err := stream.Send(msg); err != nil {
				return // Client disconnected
			}
		}
	}()

	// Receive messages from this client
	for {
		msg, err := stream.Recv()
		if err == io.EOF {
			return nil // Client closed stream
		}
		if err != nil {
			return err
		}
		s.broadcast <- msg // Send to broadcast channel
	}
}

// broadcastMessages distributes messages to all clients
func (s *chatServer) broadcastMessages() {
	for msg := range s.broadcast {
		s.mu.Lock()
		for clientChan := range s.clients {
			select {
			case clientChan <- msg: // Send to client
			default: // Skip if client isn’t ready
			}
		}
		s.mu.Unlock()
	}
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	s := grpc.NewServer()
	server := NewChatServer()
	pb.RegisterChatServer(s, server)

	// Start broadcasting goroutine
	go server.broadcastMessages()

	fmt.Println("Server running on :50051")
	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
