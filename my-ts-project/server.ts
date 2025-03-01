import express, { Request, Response } from "express";
import rateLimit from "express-rate-limit";


const app = express();
app.use(express.json());

app.get("/status", (req: Request, res: Response) => {
    res.json({ message: "API is working!", timestamp: new Date() });
});



const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 min
    max: 10, // Limit each IP to 10 requests per window
    message: "Too many requests, please try again later.",
});

app.use("/api", limiter);


app.get("/api/hello", (req: Request, res: Response) => {
    res.json({ message: "Hello, world", timestamp: new Date() });
});




import { createClient } from 'redis';

// Create the Redis client and connect to Redis
const client = createClient({
    url: 'redis://localhost:6379', // Adjust this URL as necessary
});

// Connect to Redis
client.connect().catch((err) => console.error('Error connecting to Redis:', err));

// Define your route
app.get("/data", async (req: Request, res: Response): Promise<void> => {
    // Use the native Promise-based `get` and `set` methods
    const cachedData = await client.get("mydata");
    if (cachedData) {
        res.json({ data: JSON.parse(cachedData), cache: true });
        return; // Optional: Early exit after sending the response
    }

    const data = { message: "Expensive Computation", timestamp: new Date() };
    await client.set("mydata", JSON.stringify(data), { EX: 60 }); // Cache for 60s

    res.json({ data, cache: false });
});



app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});


