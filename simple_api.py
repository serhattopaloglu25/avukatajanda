from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import uvicorn

app = FastAPI(title="Avukat Ajanda API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class LoginRequest(BaseModel):
    email: str
    password: str

class ClientRequest(BaseModel):
    name: str
    email: str = None
    phone: str = None
    address: str = None

# Mock data
clients = []
cases = []

@app.get("/")
async def root():
    return {"message": "Avukat Ajanda API v1.0"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.post("/api/auth/login")
async def login(request: LoginRequest):
    if request.email == "demo@avukatajanda.com" and request.password == "demo123":
        return {
            "access_token": "mock-token-123",
            "token_type": "bearer",
            "user": {"id": 1, "email": request.email, "name": "Demo User"}
        }
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/api/clients")
async def get_clients():
    return clients

@app.post("/api/clients")
async def create_client(client: ClientRequest):
    new_client = {
        "id": len(clients) + 1,
        **client.dict()
    }
    clients.append(new_client)
    return new_client

@app.get("/api/dashboard/stats")
async def dashboard_stats():
    return {
        "total_clients": len(clients),
        "total_cases": len(cases),
        "active_cases": 5,
        "closed_cases": 3,
        "upcoming_events": 2
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
