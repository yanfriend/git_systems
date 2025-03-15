package main

import (
	"fmt"
	"io"
	"net/http"
	"regexp"
	"sync"
)

// Result holds the scraping outcome
type Result struct {
	URL   string
	Title string
	Error error
}

func fetchTitle(url string, ch chan<- Result, wg *sync.WaitGroup) {
	defer wg.Done()
	resp, err := http.Get(url)
	if err != nil {
		ch <- Result{URL: url, Error: err}
		return
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		ch <- Result{URL: url, Error: err}
		return
	}
	re := regexp.MustCompile(`<title>(.*?)</title>`)
	matches := re.FindStringSubmatch(string(body))
	if len(matches) > 1 {
		ch <- Result{URL: url, Title: matches[1]}
	} else {
		ch <- Result{URL: url, Error: fmt.Errorf("title not found")}
	}
}

func main() {
	urls := []string{
		"https://golang.org",
		"https://example.com",
		"https://github.com",
	}
	ch := make(chan Result, len(urls)) // Buffered channel
	var wg sync.WaitGroup

	// Launch goroutines
	for _, url := range urls {
		wg.Add(1)
		go fetchTitle(url, ch, &wg)
	}

	// Close channel when all goroutines finish
	go func() {
		wg.Wait()
		close(ch)
	}()

	// Collect results
	for result := range ch {
		if result.Error != nil {
			fmt.Printf("Error scraping %s: %v\n", result.URL, result.Error)
		} else {
			fmt.Printf("Title of %s: %s\n", result.URL, result.Title)
		}
	}
}
