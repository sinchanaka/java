# User Registration App

Full-stack user registration application using:
- **Frontend**: HTML + CSS + Vanilla JavaScript
- **Backend**: Java Spring Boot
- **Database**: MongoDB

## Quick Start

### 1. Start MongoDB
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 2. Run the Backend
```bash
cd backend
mvn spring-boot:run
```
Server runs at: http://localhost:8080

### 3. Open the Frontend
Open `frontend/index.html` in your browser.

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/users | Register a new user |
| GET  | /api/users | Get all users |

## Sample Request
```json
{
  "userId": "user001",
  "username": "john_doe",
  "password": "pass@123",
  "name": "John Doe",
  "city": "Mangaluru",
  "dateOfBirth": "1995-06-15"
}
```

## Sample Response (201 Created)
```json
{
  "message": "User registered successfully!",
  "id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "userId": "user001",
  "username": "john_doe",
  "name": "John Doe",
  "city": "Mangaluru",
  "dateOfBirth": "1995-06-15"
}
```

See **BEGINNER_GUIDE.pdf** for full step-by-step instructions.
