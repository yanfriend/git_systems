package main

import (
	"bufio"
	"context"
	"fmt"
	"log"
	"os"

	pb "grpc-chat/chat"

	"google.golang.org/grpc"
)

func main() {
	conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	client := pb.NewChatClient(conn)
	stream, err := client.ChatStream(context.Background())
	if err != nil {
		log.Fatalf("Failed to start stream: %v", err)
	}

	// Prompt for username
	fmt.Print("Enter your username: ")
	scanner := bufio.NewScanner(os.Stdin)
	scanner.Scan()
	username := scanner.Text()

	// Goroutine to receive messages
	go func() {
		for {
			msg, err := stream.Recv()
			if err != nil {
				log.Printf("Stream error: %v", err)
				return
			}
			fmt.Printf("%s: %s\n", msg.User, msg.Text)
		}
	}()

	// Send messages from CLI
	for scanner.Scan() {
		text := scanner.Text()
		if text == "exit" {
			break
		}
		err := stream.Send(&pb.Message{User: username, Text: text})
		if err != nil {
			log.Printf("Send error: %v", err)
			return
		}
	}
	stream.CloseSend()
}
