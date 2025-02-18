// pages/index.tsx

"use client"

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState("");

  const fetchRecommendations = async () => {
    try {
      const response = await fetch("http://localhost:8000/recommend/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>AI-powered Recommendations Agent</h1>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a query, e.g., 'book recommendations'"
          
          style={{
            width: "100%", // CHANGED: Makes the input responsive
            maxWidth: "400px", // CHANGED: Restricts the maximum width
            padding: "1rem", // CHANGED: Increased padding for better visibility
            marginRight: "0.5rem",
            border: "2px solid #0070f3", // CHANGED: Added blue border for emphasis
            borderRadius: "4px", // CHANGED: Rounded corners for a softer look
            fontSize: "1rem", // CHANGED: Set font size for better readability
            outline: "none", // CHANGED: Removes default outline for cleaner appearance
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // CHANGED: Added subtle shadow for depth
          }}
        />
        <button onClick={fetchRecommendations} style={{ padding: "0.5rem 1rem" }}>
          Get Recommendations
        </button>
      </div>
      {recommendations && (
        <div>
          <h2>Recommendations:</h2>
          <p>{recommendations}</p>
        </div>
      )}
    </div>
  );
}
