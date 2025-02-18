# FastAPI Authentication System

## 📌 Overview
This is a simple authentication system built with **FastAPI**, **SQLAlchemy**, and **JWT** for user authentication. It supports:
- User registration
- User login with OAuth2 password flow
- Protected routes using JWT authentication

## 🚀 Getting Started
### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/your-repo/auth_system.git
cd auth_system
```

### 2️⃣ **Create a Virtual Environment** (Optional but recommended)
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3️⃣ **Install Dependencies**
```bash
pip install -r requirements.txt
```

### 4️⃣ **Set Up the Database**
Modify `database.py` if needed and create the tables:
```bash
python create_db.py
```

### 5️⃣ **Run the FastAPI Server**
```bash
uvicorn main:app --reload
```
Server will run at: `http://127.0.0.1:8000`

## 🔑 Authentication Workflow
### **1. Register a New User**
Send a `POST` request to `/register`:
```json
{
    "username": "testuser",
    "password": "password123"
}
```

### **2. Login to Get a JWT Token**
Send a `POST` request to `/login` with credentials:
```json
{
    "username": "testuser",
    "password": "password123"
}
```
Response:
```json
{
    "access_token": "your_jwt_token_here",
    "token_type": "bearer"
}
```

### **3. Access a Protected Route**
Send a `GET` request to `/protected` with the token:
```http
Authorization: Bearer your_jwt_token_here
```

## 🛠 Project Structure
```
auth_system/
├── main.py        # FastAPI application entry point
├── models.py      # SQLAlchemy models (User)
├── schemas.py     # Pydantic schemas for request/response validation
├── database.py    # Database setup & session management
├── create_db.py   # Script to create database tables
└── requirements.txt  # Dependencies
```

## 🧪 Running Tests
Install pytest:
```bash
pip install pytest httpx
```
Run the tests:
```bash
pytest test_main.py
```

## 📄 License
This project is licensed under the MIT License.

## 📩 Contact
For issues or contributions, open a GitHub issue or reach out to **your.email@example.com**.

