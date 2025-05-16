# Event-Driven Microservice with Node.js, MongoDB & GKE

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
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Architecture](#architecture)
- [Future Improvements](#future-improvements)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

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

