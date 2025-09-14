"""
Minimal Backend for Quick Testing
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import sqlite3
import json

app = FastAPI(title="AvukatAjanda API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
def init_db():
    conn = sqlite3.connect('avukat.db')
    c = conn.cursor()
    
    # Create tables
    c.execute('''CREATE TABLE IF NOT EXISTS clients
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT NOT NULL,
                  email TEXT,
                  phone TEXT,
                  address TEXT,
                  notes TEXT,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS cases
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  case_number TEXT NOT NULL,
                  title TEXT NOT NULL,
                  client_id INTEGER,
                  status TEXT DEFAULT 'active',
                  description TEXT,
                  start_date DATE,
                  end_date DATE,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  FOREIGN KEY (client_id) REFERENCES clients (id))''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS events
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  title TEXT NOT NULL,
                  description TEXT,
                  event_type TEXT,
                  event_date DATE,
                  event_time TIME,
                  location TEXT,
                  case_id INTEGER,
                  client_id INTEGER,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  FOREIGN KEY (case_id) REFERENCES cases (id),
                  FOREIGN KEY (client_id) REFERENCES clients (id))''')
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

# Pydantic models
class Client(BaseModel):
    id: Optional[int] = None
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    notes: Optional[str] = None
    created_at: Optional[str] = None

class Case(BaseModel):
    id: Optional[int] = None
    case_number: str
    title: str
    client_id: int
    status: str = 'active'
    description: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    created_at: Optional[str] = None
    client: Optional[Client] = None

class Event(BaseModel):
    id: Optional[int] = None
    title: str
    description: Optional[str] = None
    event_type: str = 'meeting'
    event_date: str
    event_time: Optional[str] = None
    location: Optional[str] = None
    case_id: Optional[int] = None
    client_id: Optional[int] = None
    created_at: Optional[str] = None

class Stats(BaseModel):
    total_clients: int
    total_cases: int
    active_cases: int
    closed_cases: int
    upcoming_events: int

# Routes
@app.get("/")
def read_root():
    return {"message": "AvukatAjanda API", "status": "running"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Clients endpoints
@app.get("/api/clients", response_model=List[Client])
def get_clients():
    conn = sqlite3.connect('avukat.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT * FROM clients ORDER BY created_at DESC")
    clients = [dict(row) for row in c.fetchall()]
    conn.close()
    return clients

@app.post("/api/clients", response_model=Client)
def create_client(client: Client):
    conn = sqlite3.connect('avukat.db')
    c = conn.cursor()
    c.execute("""INSERT INTO clients (name, email, phone, address, notes)
                 VALUES (?, ?, ?, ?, ?)""",
              (client.name, client.email, client.phone, client.address, client.notes))
    client_id = c.lastrowid
    conn.commit()
    conn.close()
    client.id = client_id
    return client

@app.put("/api/clients/{client_id}", response_model=Client)
def update_client(client_id: int, client: Client):
    conn = sqlite3.connect('avukat.db')
    c = conn.cursor()
    c.execute("""UPDATE clients SET name=?, email=?, phone=?, address=?, notes=?
                 WHERE id=?""",
              (client.name, client.email, client.phone, client.address, client.notes, client_id))
    conn.commit()
    conn.close()
    client.id = client_id
    return client

@app.delete("/api/clients/{client_id}")
def delete_client(client_id: int):
    conn = sqlite3.connect('avukat.db')
    c = conn.cursor()
    c.execute("DELETE FROM clients WHERE id=?", (client_id,))
    conn.commit()
    conn.close()
    return {"message": "Client deleted"}

# Cases endpoints
@app.get("/api/cases", response_model=List[Case])
def get_cases():
    conn = sqlite3.connect('avukat.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("""SELECT c.*, cl.name as client_name, cl.email as client_email
                 FROM cases c
                 LEFT JOIN clients cl ON c.client_id = cl.id
                 ORDER BY c.created_at DESC""")
    cases = []
    for row in c.fetchall():
        case_dict = dict(row)
        if case_dict.get('client_name'):
            case_dict['client'] = {
                'id': case_dict['client_id'],
                'name': case_dict['client_name'],
                'email': case_dict.get('client_email')
            }
        cases.append(case_dict)
    conn.close()
    return cases

@app.post("/api/cases", response_model=Case)
def create_case(case: Case):
    conn = sqlite3.connect('avukat.db')
    c = conn.cursor()
    c.execute("""INSERT INTO cases (case_number, title, client_id, status, description, start_date, end_date)
                 VALUES (?, ?, ?, ?, ?, ?, ?)""",
              (case.case_number, case.title, case.client_id, case.status, 
               case.description, case.start_date, case.end_date))
    case_id = c.lastrowid
    conn.commit()
    conn.close()
    case.id = case_id
    return case

@app.put("/api/cases/{case_id}", response_model=Case)
def update_case(case_id: int, case: Case):
    conn = sqlite3.connect('avukat.db')
    c = conn.cursor()
    c.execute("""UPDATE cases SET case_number=?, title=?, client_id=?, status=?, 
                 description=?, start_date=?, end_date=?
                 WHERE id=?""",
              (case.case_number, case.title, case.client_id, case.status,
               case.description, case.start_date, case.end_date, case_id))
    conn.commit()
    conn.close()
    case.id = case_id
    return case

@app.delete("/api/cases/{case_id}")
def delete_case(case_id: int):
    conn = sqlite3.connect('avukat.db')
    c = conn.cursor()
    c.execute("DELETE FROM cases WHERE id=?", (case_id,))
    conn.commit()
    conn.close()
    return {"message": "Case deleted"}

# Events endpoints
@app.get("/api/events", response_model=List[Event])
def get_events():
    conn = sqlite3.connect('avukat.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT * FROM events ORDER BY event_date, event_time")
    events = [dict(row) for row in c.fetchall()]
    conn.close()
    return events

@app.get("/api/events/upcoming", response_model=List[Event])
def get_upcoming_events(days: int = 7):
    conn = sqlite3.connect('avukat.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("""SELECT * FROM events 
                 WHERE date(event_date) >= date('now') 
                 AND date(event_date) <= date('now', '+{} days')
                 ORDER BY event_date, event_time""".format(days))
    events = [dict(row) for row in c.fetchall()]
    conn.close()
    return events

@app.post("/api/events", response_model=Event)
def create_event(event: Event):
    conn = sqlite3.connect('avukat.db')
    c = conn.cursor()
    c.execute("""INSERT INTO events (title, description, event_type, event_date, 
                 event_time, location, case_id, client_id)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
              (event.title, event.description, event.event_type, event.event_date,
               event.event_time, event.location, event.case_id, event.client_id))
    event_id = c.lastrowid
    conn.commit()
    conn.close()
    event.id = event_id
    return event

# Stats endpoint
@app.get("/api/stats", response_model=Stats)
def get_stats():
    conn = sqlite3.connect('avukat.db')
    c = conn.cursor()
    
    stats = {}
    c.execute("SELECT COUNT(*) FROM clients")
    stats['total_clients'] = c.fetchone()[0]
    
    c.execute("SELECT COUNT(*) FROM cases")
    stats['total_cases'] = c.fetchone()[0]
    
    c.execute("SELECT COUNT(*) FROM cases WHERE status='active'")
    stats['active_cases'] = c.fetchone()[0]
    
    c.execute("SELECT COUNT(*) FROM cases WHERE status='closed'")
    stats['closed_cases'] = c.fetchone()[0]
    
    c.execute("""SELECT COUNT(*) FROM events 
                 WHERE date(event_date) >= date('now') 
                 AND date(event_date) <= date('now', '+7 days')""")
    stats['upcoming_events'] = c.fetchone()[0]
    
    conn.close()
    return stats

# Auth endpoints (dummy for now)
@app.post("/auth/login")
def login(username: str, password: str):
    return {
        "access_token": "dummy_token_123",
        "token_type": "bearer",
        "user": {
            "id": 1,
            "email": username,
            "name": "Test User",
            "is_active": True,
            "created_at": datetime.now().isoformat()
        }
    }

@app.get("/auth/me")
def get_me():
    return {
        "id": 1,
        "email": "test@example.com",
        "name": "Test User",
        "is_active": True,
        "created_at": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)