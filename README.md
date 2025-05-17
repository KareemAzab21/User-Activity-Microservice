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

kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

### 5. Get the External IP
```bash
kubectl get service user-activity-service
```

#### Look under the EXTERNAL-IP column and use that IP to access the app:
```bash
http://<external-ip>
```

