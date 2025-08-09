# Job Tracker (Development)

A Spring Boot + PostgreSQL application to track job applications, stages, and details. 
The application is containerized with Docker and orchestrated using Docker Compose.

---

## Features
- Spring Boot REST API
- PostgreSQL database with data persistence
- JPA/Hibernate for database interaction
- Docker-based local development

---

## Requirements
- Docker
- Docker Compose
- Java 21
- Maven

---

## Project Structure
```
jobtracker/
├── src/ # Java source code
├── pom.xml # Maven configuration
├── Dockerfile # App build instructions
├── compose.yaml # Multi-container setup
└── README.md # Project documentation

```

---

## Running Locally

### 1. Clone the repository
```
git clone https://github.com/your-username/jobtracker.git
cd jobtracker

``` 

## 2. Environment variables
Create a `.env` file in the project root:

``` 
POSTGRES_DB=jobs
POSTGRES_USER=shubham
POSTGRES_PASSWORD=123
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/jobs
SPRING_DATASOURCE_USERNAME=shubham
SPRING_DATASOURCE_PASSWORD=123
```

## 3. Build and start containers

``` 
docker compose up --build -d
```
This will 
- Start a PostgreSQL database containter with persistent storage.
- Build and run the Spring Boot app container

## 4. Stopping the containers

``` basic
docker compose down
```

To remove the database volume as well:

``` basic
docker compose down -v
```

## API Endpoints
Get all jobs:

``` basic 
GET http://localhost:8080/apis/jobs
```
