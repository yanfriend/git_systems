Below is an example of a `README.md` file for your AI-powered Recommendations Agent project:

---

```markdown
# AI-powered Recommendations Agent

This project is an AI-powered recommendations agent that uses a FastAPI backend to process user queries and OpenAI's GPT-4 model to generate recommendations. The frontend is built with Next.js (TypeScript) and provides an interactive interface for users to request recommendations.

## Features

- **FastAPI Backend:** Processes queries and generates recommendations using OpenAI's ChatCompletion API.
- **Next.js Frontend:** Modern, responsive user interface built with React and TypeScript.
- **AI-powered Recommendations:** Dynamically generated responses based on user input.
- **CORS Configuration:** Allows seamless communication between the frontend (port 3000) and backend (port 8000).

## Prerequisites

- **Python 3.7+**
- **Node.js 14+**
- An [OpenAI API Key](https://openai.com/api/) (set in a `.env` file)

## Project Structure

```
/ai-recommendations-agent
│
├── backend
│   ├── main.py            # FastAPI backend code
│   ├── .env               # Environment variables (contains OPENAI_API_KEY)
│   └── requirements.txt   # Python dependencies
│
└── frontend
    ├── package.json       # Node project file
    ├── tsconfig.json      # TypeScript configuration
    └── pages
        └── index.tsx      # Next.js homepage (or use app/page.tsx if using Next.js 13+)
```

## Installation

### Backend (FastAPI)

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/ai-recommendations-agent.git
   cd ai-recommendations-agent/backend
   ```

2. **Create and Activate a Virtual Environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables:**
   Create a `.env` file in the backend directory with:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. **Run the FastAPI Server:**
   ```bash
   uvicorn main:app --reload --port 8000
   ```

### Frontend (Next.js)

1. **Navigate to the Frontend Directory:**
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Next.js Development Server:**
   ```bash
   npm run dev
   ```

4. **Open Your Browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the application.

## How It Works

1. **User Input:**
   - The user enters a query (e.g., "book recommendations") in the input box on the Next.js frontend.

2. **API Call:**
   - The frontend sends a POST request with the query to the FastAPI backend at `http://localhost:8000/recommend/`.

3. **AI Processing:**
   - The FastAPI backend uses the OpenAI ChatCompletion API to generate recommendations based on the input query.

4. **Display Recommendations:**
   - The backend returns the recommendations, which are then displayed on the frontend.

## Customization

- **Styling:** Modify the inline styles in `pages/index.tsx` or apply your own CSS/SCSS for a custom design.
- **Prompt Customization:** Adjust the prompt in `main.py` to tailor the type and format of recommendations.
- **Deployment:** Consider deploying the backend on services like [Railway](https://railway.app/), [Render](https://render.com/), or AWS, and the frontend on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

## Troubleshooting

- **Empty Query Response:**  
  Ensure that you are entering a non-empty query in the input box.
- **CORS Issues:**  
  Verify that the CORS settings in `main.py` allow requests from your frontend domain (e.g., `http://localhost:3000`).
- **Environment Variables:**  
  Double-check that the `.env` file contains the correct OpenAI API key.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Contact

For any questions or feedback, please reach out to [baifriend@gmail.com](mailto:baifriend@gmail.com).
```

---

Feel free to adjust the file structure, instructions, and customization details to suit your project's specific needs.