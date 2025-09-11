# AvukatAjanda Backend API (Python/FastAPI)

Modern legal practice management system backend built with FastAPI, SQLAlchemy, and PostgreSQL.

## 🚀 Features

- **FastAPI Framework**: High-performance async API
- **SQLAlchemy 2.0**: Modern ORM with type hints
- **JWT Authentication**: Secure token-based auth
- **PostgreSQL**: Production-ready database
- **Alembic Migrations**: Database version control
- **CORS Support**: Configurable cross-origin requests
- **Health Checks**: Built-in monitoring endpoints
- **Docker Support**: Container-ready deployment

## 📋 Requirements

- Python 3.11+
- PostgreSQL 12+
- Docker (optional)

## 🛠️ Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/serhattopaloglu25/avukat-ajanda-backend-py.git
cd avukat-ajanda-backend-py
```

### 2. Create virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 5. Run database migrations
```bash
# Initialize Alembic (first time only)
alembic init alembic

# Create initial migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head
```

### 6. Run the development server
```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at http://localhost:8000

## 🐳 Docker Deployment

### Build and run with Docker
```bash
# Build the image
docker build -t avukat-ajanda-api .

# Run the container
docker run -p 10000:10000 \
  -e DATABASE_URL="postgresql://user:pass@host/db" \
  -e JWT_SECRET="your-secret-key" \
  -e CORS_ORIGINS="https://avukatajanda.com" \
  avukat-ajanda-api
```

### Docker Compose (recommended)
```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "10000:10000"
    environment:
      DATABASE_URL: postgresql://postgres:password@db:5432/avukatajanda
      JWT_SECRET: ${JWT_SECRET}
      CORS_ORIGINS: https://avukatajanda.com
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: avukatajanda
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 🚀 Render Deployment

### Automatic deployment
1. Fork this repository
2. Connect your GitHub account to Render
3. Create a new Web Service
4. Select this repository
5. Use the provided `render.yaml` for configuration
6. Deploy!

### Manual deployment
1. Create a PostgreSQL database on Render
2. Create a new Web Service
3. Set environment variables:
   - `DATABASE_URL`: From your PostgreSQL instance
   - `JWT_SECRET`: Generate a secure key
   - `CORS_ORIGINS`: Your frontend domains
   - `PORT`: 10000
4. Deploy from GitHub

## 📚 API Documentation

Once running, access the interactive API documentation:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔗 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user
- `POST /auth/refresh` - Refresh token

### Clients
- `GET /api/clients` - List clients
- `POST /api/clients` - Create client
- `GET /api/clients/{id}` - Get client
- `PUT /api/clients/{id}` - Update client
- `DELETE /api/clients/{id}` - Delete client

### Cases
- `GET /api/cases` - List cases
- `POST /api/cases` - Create case
- `GET /api/cases/{id}` - Get case
- `PUT /api/cases/{id}` - Update case
- `DELETE /api/cases/{id}` - Delete case

### Events
- `GET /api/events` - List events
- `POST /api/events` - Create event
- `GET /api/events/{id}` - Get event
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event

### Statistics
- `GET /api/stats` - Dashboard statistics
- `GET /api/stats/summary` - Detailed summary
- `GET /api/stats/monthly` - Monthly statistics

### Health
- `GET /health` - Health check
- `GET /api/health` - Alternative health endpoint

## 🧪 Testing

### Run tests
```bash
pytest tests/ -v
```

### Run with coverage
```bash
pytest tests/ --cov=app --cov-report=html
```

## 📁 Project Structure

```
avukat-ajanda-backend-py/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI application
│   ├── db.py            # Database configuration
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic schemas
│   ├── auth.py          # Authentication utilities
│   └── routers/
│       ├── __init__.py
│       ├── auth.py      # Auth endpoints
│       ├── clients.py   # Client CRUD
│       ├── cases.py     # Case CRUD
│       ├── events.py    # Event CRUD
│       └── stats.py     # Statistics
├── alembic/
│   ├── env.py           # Alembic environment
│   ├── script.py.mako   # Migration template
│   └── versions/        # Migration files
├── tests/
│   └── ...              # Test files
├── .env.example         # Environment template
├── .gitignore
├── alembic.ini          # Alembic config
├── Dockerfile           # Docker configuration
├── requirements.txt     # Python dependencies
├── render.yaml          # Render deployment
└── README.md
```

## 🔒 Security Considerations

- Always use strong JWT secrets in production
- Enable HTTPS in production
- Regularly update dependencies
- Use environment variables for sensitive data
- Implement rate limiting for production
- Regular security audits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/serhattopaloglu25/avukat-ajanda-backend-py/issues)
- Email: support@avukatajanda.com

## 🔄 Migration from Node.js

This Python/FastAPI backend is designed to be a drop-in replacement for the Node.js backend. The API endpoints and data structures are compatible, allowing for a smooth migration with zero downtime using blue-green deployment.

### Migration steps:
1. Deploy Python API to separate service
2. Test with staging environment
3. Switch DNS/domain when ready
4. Keep Node.js as backup

---

Built with ❤️ for legal professionals
