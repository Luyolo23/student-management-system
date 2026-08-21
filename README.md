# Student Management System

A Full-Stack Web Application for managing student records with CRUD operations.

## Tech Stack
- **Frontend**: React.js, Axios, CSS3
- **Backend**: Java Spring Boot (Spring Data JPA, REST Controller)
- **Database**: MySQL (`studentdb`)
- **Build Tool**: Apache Maven

---

## Features
- **Create**: Add new student records (Full Name, Email, Course)
- **Read**: Fetch and view the list of enrolled students
- **Update**: Edit existing student details seamlessly
- **Delete**: Remove student records from the database

---

## Setup & Running Instructions

### 1. Database Setup
Ensure MySQL is running on your machine. You can create the database manually or let Spring Boot create it automatically:
```sql
CREATE DATABASE IF NOT EXISTS studentdb;
```

---

### 2. Backend Setup (Java Spring Boot)
Navigate to the backend directory and start the server using Maven:
```bash
cd backend
mvn spring-boot:run
```
The backend server will start at `http://localhost:8080`.

---

### 3. Frontend Setup (React.js)
In a new terminal window, navigate to the frontend directory and start the dev server:
```bash
cd frontend
npm install
npm start
```
The React frontend will start at `http://localhost:3000`.

---

## Testing Backend APIs with Postman

Base URL: `http://localhost:8080/students`

### 1. Get All Students
- **Method**: `GET`
- **URL**: `http://localhost:8080/students`
- **Headers**: None required

### 2. Add New Student (POST)
- **Method**: `POST`
- **URL**: `http://localhost:8080/students`
- **Headers**: `Content-Type: application/json`
- **Body** (`raw` -> `JSON`):
  ```json
  {
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "course": "Computer Science"
  }
  ```

### 3. Update Existing Student (PUT)
- **Method**: `PUT`
- **URL**: `http://localhost:8080/students/1` *(Replace `1` with the student ID)*
- **Headers**: `Content-Type: application/json`
- **Body** (`raw` -> `JSON`):
  ```json
  {
    "fullName": "John Smith",
    "email": "john.smith@example.com",
    "course": "Software Engineering"
  }
  ```

### 4. Delete Student (DELETE)
- **Method**: `DELETE`
- **URL**: `http://localhost:8080/students/1` *(Replace `1` with the student ID)*
- **Headers**: None required

---

## Technical Learnings & Challenges

- **State Synchronization**: Integrated React `useEffect` and props to automatically refresh student lists upon creation or edit without full browser reloads.