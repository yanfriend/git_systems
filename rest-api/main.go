package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
)

// Task represents a to-do item
type Task struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
}

// In-memory store with mutex for thread safety
var (
	tasks  = make(map[int]Task)
	nextID = 1
	mu     sync.Mutex // Protects tasks map
)

// Get all tasks
func getTasks(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()
	taskList := make([]Task, 0, len(tasks))
	for _, task := range tasks {
		taskList = append(taskList, task)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(taskList)
}

// Create a task
func createTask(w http.ResponseWriter, r *http.Request) {
	var task Task
	if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	mu.Lock()
	defer mu.Unlock()
	task.ID = nextID
	nextID++
	tasks[task.ID] = task
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(task)
}

// Update a task
func updateTask(w http.ResponseWriter, r *http.Request) {
	var task Task
	if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	mu.Lock()
	defer mu.Unlock()
	if _, exists := tasks[task.ID]; !exists {
		http.Error(w, "Task not found", http.StatusNotFound)
		return
	}
	tasks[task.ID] = task
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(task)
}

// Delete a task
func deleteTask(w http.ResponseWriter, r *http.Request) {
	var task Task
	if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	mu.Lock()
	defer mu.Unlock()
	if _, exists := tasks[task.ID]; !exists {
		http.Error(w, "Task not found", http.StatusNotFound)
		return
	}
	delete(tasks, task.ID)
	w.WriteHeader(http.StatusNoContent)
}

func main() {
	http.HandleFunc("/tasks", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			getTasks(w, r)
		case http.MethodPost:
			createTask(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})
	http.HandleFunc("/task", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodPut:
			updateTask(w, r)
		case http.MethodDelete:
			deleteTask(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})
	fmt.Println("Server running on :8080")
	http.ListenAndServe(":8080", nil)
}
