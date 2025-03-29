# Task Manager (React + FastAPI)

## Features  
- **Task Management**: Create, read, update, and delete tasks  
- **Completion Tracking**: Toggle tasks between complete/incomplete  
- **Type Safety**: Full TypeScript integration  
- **Real-Time Updates**: Instant UI refresh on changes  

## Tech Stack  
**Frontend**:  
- React 18 with TypeScript  
- Axios for API communication  
- Functional components with hooks  

**Backend**:  
- FastAPI Python framework  
- SQLAlchemy ORM with SQLite  
- Pydantic data validation  

## Project Structure  
`/backend`  
▸ `app/` → FastAPI application code  
 - `main.py` → API routes and endpoints  
 - `models.py` → Database models  
 - `schemas.py` → Request/response validation  

`/frontend`  
▸ `src/` → React source code  
 - `components/` → React components  
 - `hooks/` → Custom hooks  
 - `types/` → TypeScript definitions  

## Setup Instructions  
1. **Backend Setup**:  
   - Install Python dependencies:  
     `pip install fastapi uvicorn sqlalchemy`  
   - Start development server:  
     `uvicorn app.main:app --reload`  

2. **Frontend Setup**:  
   - Install Node.js dependencies:  
     `npm install`  
   - Launch development server:  
     `npm start`  

## API Documentation  
| Endpoint | Method | Description |  
|----------|--------|-------------|  
| `/tasks` | POST | Create new task |  
| `/tasks` | GET | List all tasks |  
| `/tasks/{id}` | PUT | Update task |  
| `/tasks/{id}` | DELETE | Remove task |  

## Type Definitions  
Located in `frontend/src/types/task.ts`:  
- `Task` interface: Defines task properties  
- `TaskFormData` interface: Specifies task creation format  

## Troubleshooting  
**Common Issues**:  
- *CORS Errors*: Enable CORS middleware in FastAPI  
- *Type Mismatches*: Verify interface definitions  
- *Database Issues*: Reset SQLite database if needed  

**Debugging Tips**:  
1. Check browser console for errors  
2. Verify network requests in DevTools  
3. Examine backend logs for API errors  

## License  
Open-source under MIT License.