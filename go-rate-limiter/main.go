package main

import (
	"fmt"
	"net/http"
	"sync"
	"time"
)

// Rate limiter configuration
const (
	Limit         = 5              // Max requests per user
	WindowSize    = 10 * time.Second // Time window
	CleanupPeriod = 30 * time.Second // How often to clean old data
)

// User request history
var requestLogs = make(map[string][]time.Time)
var mutex = sync.Mutex{} // Ensure thread safety

// Rate limiter middleware
func rateLimiterMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		userID := r.URL.Query().Get("user_id")
		if userID == "" {
			http.Error(w, `{"error": "user_id is required"}`, http.StatusBadRequest)
			return
		}

		mutex.Lock()
		defer mutex.Unlock()

		// Remove old requests beyond the window size
		now := time.Now()
		validRequests := []time.Time{}
		for _, t := range requestLogs[userID] {
			if now.Sub(t) < WindowSize {
				validRequests = append(validRequests, t)
			}
		}

		// Update request log for the user
		requestLogs[userID] = validRequests

		// Enforce rate limit
		if len(validRequests) >= Limit {
			http.Error(w, `{"error": "Too Many Requests"}`, http.StatusTooManyRequests)
			return
		}

		// Add the new request
		requestLogs[userID] = append(requestLogs[userID], now)

		// Proceed to the next handler
		next.ServeHTTP(w, r)
	})
}

// Request handler
func requestHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintln(w, `{"message": "Allowed"}`)
}

// Cleanup function to remove old entries (runs in the background)
func cleanupOldRequests() {
	for {
		time.Sleep(CleanupPeriod)
		mutex.Lock()
		for userID, timestamps := range requestLogs {
			validRequests := []time.Time{}
			for _, t := range timestamps {
				if time.Since(t) < WindowSize {
					validRequests = append(validRequests, t)
				}
			}
			if len(validRequests) == 0 {
				delete(requestLogs, userID) // Remove user if no valid requests
			} else {
				requestLogs[userID] = validRequests
			}
		}
		mutex.Unlock()
	}
}

func main() {
	// Run the cleanup goroutine
	go cleanupOldRequests()

	// Set up HTTP server
	mux := http.NewServeMux()
	mux.Handle("/request", rateLimiterMiddleware(http.HandlerFunc(requestHandler)))

	fmt.Println("🚀 Server running on http://localhost:8080")
	http.ListenAndServe(":8080", mux)
}
