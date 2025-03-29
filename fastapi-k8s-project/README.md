# FastAPI + Kubernetes Deployment

This project demonstrates deploying a FastAPI application with a PostgreSQL database on Kubernetes using Minikube.

## Prerequisites
- Docker
- Minikube
- Kubectl
- Helm (optional for PostgreSQL)

## Project Structure

### `Dockerfile`
Defines the FastAPI application container, including dependencies and the command to start the server.

### `k8s/postgres-deployment.yaml`
Deploys a PostgreSQL database in a Kubernetes pod.

### `k8s/postgres-service.yaml`
Exposes the PostgreSQL database as a Kubernetes service.

### `k8s/fastapi-deployment.yaml`
Deploys the FastAPI application in a Kubernetes pod.

### `k8s/fastapi-service.yaml`
Exposes the FastAPI application as a Kubernetes service.

### `requirements.txt`
Lists Python dependencies required for the FastAPI application.

### `main.py`
Main FastAPI application file, defining API routes and database connectivity.

## Setup and Deployment Steps

### 1. Start Minikube
```sh
minikube start
```

### 2. Build and Push Docker Image
```sh
docker build -t baifriend/fastapi-app:latest .
docker push baifriend/fastapi-app:latest
```

### 3. Deploy PostgreSQL Database
#### Option 1: Using Kubernetes YAML
```sh
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/postgres-service.yaml
```
#### Option 2: Using Helm (Optional)
```sh
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install postgres bitnami/postgresql --set auth.postgresPassword=mysecretpassword
```

### 4. Deploy FastAPI Application
```sh
kubectl apply -f k8s/fastapi-deployment.yaml
kubectl apply -f k8s/fastapi-service.yaml
```

### 5. Verify Deployment
```sh
kubectl get pods
kubectl get services
```

### 6. Port Forward FastAPI Service (if needed)
```sh
kubectl port-forward service/fastapi-service 8000:8000
```

### 7. Test the Application
```sh
curl -X GET http://127.0.0.1:8000/db-status
```

## Troubleshooting

### Image Pull Failure (ImagePullBackOff)
- Ensure the image is correctly built and pushed to Docker Hub.
- Run `docker login` to authenticate.
- Verify the image tag matches the deployment file.

### Database Connection Issues
- Check PostgreSQL pod status: `kubectl get pods`
- Logs: `kubectl logs <postgres-pod-name>`
- Ensure the FastAPI environment variables are set correctly in `fastapi-deployment.yaml`.

### Service Unreachable
- Check service: `kubectl get services`
- Ensure pods are running: `kubectl get pods`
- Restart Minikube if needed: `minikube delete && minikube start`

## Cleanup
```sh
kubectl delete -f k8s/
```

