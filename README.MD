# Applying AI to Personalized E-commerce Website Development

- IT Project Semester 1 2024-2025

# 1. Introduction

### 1.1 Team Members:

- Tống Đức Thành Nam - 52000896
- Lương Phan Hoàn Nhân - 52000899

### 1.2 Project Description:

- The project uses AI technology to develop a personalized e-commerce website.

### 1.3 Objectives:

- Build a personalized e-commerce website.

### 1.4 Technologies Used:

- Frontend: NextJS, Shadcn, TailwindCSS
- Backend: NodeJS, ExpressJS, MongoDB
- AI: Python, FastAPI, Pandas, Numpy, Scikit-learn, TensorFlow

# 2. Installation and Running Locally in Development Mode
- I use Ubuntu, so the commands may differ in other environments.
- Internet connection is required (since MongoDB Atlas is used, you may need to whitelist your IP). Update the environment variables based on this connection string and select the `fashionAI` database:
```bash
# MongoDB Atlas connection string
```
- First, add the following environment variables:
    - `.env` for the backend (fill in variables from `.env.example`)
    - `.env.local` for the frontend (fill in variables from `.env.example`)
    - `.env` for the AI service (fill in variables from `.env.example`)
    - When running Docker Compose, prepare a single `.env` file in the `source` folder containing all the above environment variables.
- To run the project, open three terminal tabs: one for the backend, one for the frontend, and one for the AI service.
- Sync project architecture (optional):

```bash
eza --tree --ignore-glob "node_modules|.idea|.vscode|.venv|__pycache__" > architecture.txt
```

### 2.1 Backend Setup:

- Install required libraries:

```bash
cd backend
npm install
```

- Run the backend:

```bash
npm run start 
# or 
npm run dev
```

- Open the API docs at: http://localhost:3001/api-docs

### 2.2 Frontend Setup:

- Install required libraries:

```bash
cd frontend
npm install
```

- Run the frontend:

```bash
npm run dev
```
- View the result at http://localhost:3000

### 2.3 AI Service Setup:

- Install required libraries:

```bash
cd ai-service
python3 -m venv .venv # Or python -m venv .venv
pip install -r requirements.txt
```

- Run the AI service:

```bash
uvicorn src.main:app 
```
- The AI service runs at http://localhost:8000

### 2.4 Dockerizing the Project (Preferred):

- Build Docker Compose:

```bash  
docker compose build # version 2
```

- Push Docker images (only when deploying to the cloud):

```bash
docker push <your_dockerhub_username>/fashion-ai-backend:latest
docker push <your_dockerhub_username>/fashion-ai-frontend:latest
docker push <your_dockerhub_username>/fashion-ai-ai-service:latest
```

## 3. Deployment (Preferably Using Docker):

- Use Docker Compose to deploy the project:

```bash
docker compose up # version 2
```
- To run the project, open the URL http://localhost:9999
