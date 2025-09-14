#!/usr/bin/env python3
"""
Ultra Simple Test Backend with Invoice Support
"""
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
from urllib.parse import urlparse, parse_qs
from datetime import datetime

# In-memory database
clients = []
cases = []
events = []
invoices = []

class APIHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_GET(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Set CORS headers
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        # Routes
        if path == '/':
            response = {"message": "AvukatAjanda API", "status": "running"}
        elif path == '/health':
            response = {"status": "healthy", "timestamp": datetime.now().isoformat()}
        elif path == '/api/clients':
            response = clients
        elif path == '/api/cases':
            response = cases
        elif path == '/api/events':
            response = events
        elif path == '/api/invoices':
            response = invoices
        elif path == '/api/events/upcoming':
            response = events[:5]  # Return first 5 events
        elif path == '/api/stats':
            response = {
                "total_clients": len(clients),
                "total_cases": len(cases),
                "active_cases": len([c for c in cases if c.get('status') == 'active']),
                "closed_cases": len([c for c in cases if c.get('status') == 'closed']),
                "upcoming_events": len(events)
            }
        elif path == '/auth/me':
            response = {
                "id": 1,
                "email": "test@example.com",
                "name": "Test User",
                "is_active": True,
                "created_at": datetime.now().isoformat()
            }
        else:
            response = {"error": "Not found"}
        
        self.wfile.write(json.dumps(response).encode())

    def do_POST(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Read request body
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length) if content_length > 0 else b'{}'
        
        try:
            data = json.loads(body) if body else {}
        except:
            data = {}
        
        # Set CORS headers
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        # Routes
        if path == '/api/clients':
            data['id'] = len(clients) + 1
            data['created_at'] = datetime.now().isoformat()
            clients.append(data)
            response = data
        elif path == '/api/cases':
            data['id'] = len(cases) + 1
            data['created_at'] = datetime.now().isoformat()
            cases.append(data)
            response = data
        elif path == '/api/events':
            data['id'] = len(events) + 1
            data['created_at'] = datetime.now().isoformat()
            events.append(data)
            response = data
        elif path == '/api/invoices':
            data['id'] = len(invoices) + 1
            data['created_at'] = datetime.now().isoformat()
            # Calculate total if not provided
            if 'total' not in data and 'amount' in data:
                amount = float(data['amount'])
                tax = float(data.get('tax', 18))
                data['total'] = amount + (amount * tax / 100)
            invoices.append(data)
            response = data
        elif path == '/auth/login':
            response = {
                "access_token": "dummy_token_123",
                "token_type": "bearer",
                "user": {
                    "id": 1,
                    "email": "test@example.com",
                    "name": "Test User",
                    "is_active": True,
                    "created_at": datetime.now().isoformat()
                }
            }
        else:
            response = {"message": "Created"}
        
        self.wfile.write(json.dumps(response).encode())

    def do_PUT(self):
        self.do_POST()  # Same logic for now

    def do_DELETE(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        response = {"message": "Deleted"}
        self.wfile.write(json.dumps(response).encode())

    def log_message(self, format, *args):
        # Override to show cleaner logs
        print(f"{self.address_string()} - {format % args}")

if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, APIHandler)
    print('🚀 Test Backend running on http://localhost:8000')
    print('📖 Visit http://localhost:8000 to test')
    print('✅ Invoice endpoints added')
    print('Press Ctrl+C to stop')
    httpd.serve_forever()