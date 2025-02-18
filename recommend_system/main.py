# main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os
from dotenv import load_dotenv


# Load environment variables from a .env file
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


app = FastAPI()

# Configure CORS to allow requests from your Next.js frontend (default: http://localhost:3000)
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/recommend/")
async def recommend_endpoint(request: Request):
    data = await request.json()
    query = data.get("query", "")

    # Build a prompt to generate recommendations
    prompt = (
        f"Please provide a list of recommendations based on the following query: '{query}'. "
        "Include a brief description for each recommendation."
    )

    response = client.chat.completions.create(model="gpt-3.5-turbo",  # model="gpt-4",
    messages=[{"role": "user", "content": prompt}])

    return {"recommendations": response.choices[0].message.content}
