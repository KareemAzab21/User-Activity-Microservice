# Event-Driven Microservice with Node.js, MongoDB , GKE and Confluent (apache kafka)

🚀 A scalable, Kubernetes-deployed microservice with a REST API for user activity tracking.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Running Locally](#running-locally)
- [Docker Deployment](#docker-deployment)
- [Kubernetes (GKE) Deployment](#kubernetes-gke-deployment)
- [Project Structure](#project_structure)


## Project Overview
A simple, scalable microservice that:
✔ Stores user activity logs in MongoDB  
✔ Exposes a REST API for logging & querying activities  
✔ Deploys on GCP Kubernetes (GKE)  
✔ Follows best practices for containerized deployment  

## Features
- ✅ REST API for activity logging
- ✅ MongoDB integration
- ✅ Docker containerization
- ✅ Kubernetes deployment (GKE)
- ✅ Helm chart for MongoDB (optional)
- ✅ Environment variable configuration

## Tech Stack
| Component       | Technology |
|----------------|------------|
| Backend        | Node.js (Express) |
| Database       | MongoDB |
| Containerization | Docker |
| Orchestration  | Kubernetes (GKE) |
| Cloud Provider | Google Cloud Platform |
| CI/CD          | (Optional) Cloud Build |

## Prerequisites
- Node.js v16+
- Docker
- Google Cloud SDK
- kubectl
- MongoDB Atlas account (or local MongoDB)
- Cluster on Confluent

## Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-repo/user-activity-service.git
cd user-activity-service
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a .env file in the root directory:
```bash
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/activity
PORT=3000
KAFKA_BROKERS=<Broker Server>
KAFKA_USERNAME=<API KEY>
KAFKA_PASSWORD=<API SECRET>
```

## 🧪 Running Locally

### npm start

#### The API will be available at:
```bash
👉 http://localhost:3000
```

## 🐳 Docker Deployment
### Build the Docker Image
```bash
docker build -t user-activity-service .
```

### Run the Container
```bash
docker run -p 3000:3000 -e MONGODB_URI=your_connection_string user-activity-service
```

## ☁️ Kubernetes (GKE) Deployment
### 1. Set Up a GKE Cluster
```bash
gcloud container clusters create activity-cluster \
  --num-nodes=1 \
  --machine-type=e2-micro \
  --zone=us-central1-a
```

### 2. Configure kubectl
```bash
gcloud container clusters get-credentials activity-cluster \
  --zone=us-central1-a
```

### 3. Deploy MongoDB (Optional, for testing)

#### If you don’t use MongoDB Atlas and want to spin up MongoDB in the cluster:
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install mongodb bitnami/mongodb --set auth.enabled=false
```

##### 📌 Make sure your application points to the internal MongoDB service (e.g., mongodb://mongodb:27017).

### 4. Deploy the Application
```bash
# Build the Docker image
docker build -t gcr.io/[YOUR-GCP-PROJECT-ID]/activity-service:latest .

# Push to Google Container Registry
docker push gcr.io/[YOUR-GCP-PROJECT-ID]/activity-service:latest
kubectl apply -f k8s/mongo-secret.yaml
kubectl apply -f k8s/kafka-secret.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```
##### 📌 make sure to create your own mongo-secret.yaml and kafka-secret.yaml which contained the credentials to your mangoDB and kafka broker. You can find mine in .gitignore 😊

### 5. Get the External IP
```bash
kubectl get service user-activity-service
```

#### Look under the EXTERNAL-IP column and use that IP to access the app:
```bash
http://<external-ip>
```

### 📬 You can test by Postmant
#### POST to push activity to a topic by producer
```bash
http://<external-ip>/api/activities
```
#### GET to get the activity stored in MongoDB by Consumer
```bash
http://<external-ip>/api/activities?page=1&limit=5
```
---

## 🏗️ Project Structure (DDD Approach)
```bash
User-Activity-Microservice/
├── k8s/                     # Kubernetes manifests
├── src/
│   ├── core/                # � Domain Layer
│   │   ├── entities/        # Business objects (e.g., Activity)
│   │   ├── services/        # Domain logic (e.g., ActivityService)
│   │   └── interfaces/      # Domain contracts (e.g., IActivityRepository)
│   │
│   ├── infrastructure/      # 🏗️ Infrastructure Layer
│   │   ├── database/        # MongoDB adapters (Repository implementations)
│   │   └── kafka/           # Kafka producers/consumers
│   │
│   └── interfaces/http/     # 🌐 Application Layer
│       ├── controllers/     # Route handlers
│       ├── routes/          # Express routers
│       └── server.js        # Web server setup
│
├── .env.example             # Environment template
└── docker-compose.yaml      # Local orchestration
```
### Why Domain-Driven Design?

  ####  1.Clear Separation of Concerns

  - core/: Pure business logic (no tech details)

  - infrastructure/: Database/Kafka implementations

  - interfaces/: Delivery mechanisms (HTTP, CLI, etc.)

  #### 2.Improved Maintainability

  - Changes to Kafka/MongoDB won’t break domain logic.

  - Easy to swap technologies (e.g., Kafka → RabbitMQ).

  #### 3.Ubiquitous Language

  - Domain terms (e.g., Activity) are consistent across code, docs, and discussions.

  #### 4.Scalability

  - Isolated layers simplify adding features (e.g., new delivery methods like WebSockets).

---    

### 🔑 Key DDD Concepts Applied

  - Entities: Activity (unique identity, business rules)

  - Value Objects: Metadata (immutable, no identity)

  - Aggregates: UserActivities (consistency boundary)

  - Repositories: ActivityRepository (persistence abstraction)


