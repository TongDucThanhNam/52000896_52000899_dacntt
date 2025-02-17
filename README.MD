# Ứng dụng AI vào việc Phát triển Website thương mại cá nhân hóa người dùng

- Dự án công nghệ thông tin HK1 2024-2025

# 1. Giới thiệu

### 1.1 Thành viên nhóm:

- Tống Đức Thành Nam - 52000896
- Lương Phan Hoàn Nhân - 52000899

### 1.2 Mô tả dự án:

- Dự án sử dụng công nghệ AI để phát triển website thương mại cá nhân hóa người dùng.

### 1.3 Mục tiêu:

- Xây dựng website thương mại cá nhân hóa người dùng.

### 1.4 Công nghệ sử dụng:

- Frontend: NextJS, Shadcn, TailwindCSS
- Backend: NodeJS, ExpressJS, MongoDB
- AI: Python, FastAPI, Pandas, Numpy, Scikit-learn, TensorFlow

# 2. Cài đặt và chạy local ở chế độ development

- Đầu tiên chúng ta cần thêm các biến môi trường:
    - `.env` cho backend (điền các biến từ `.env.example`)
    - `.env.local` cho frontend (điền các biến từ `.env.example`)
    - `.env` cho ai-service (điền các biến từ `.env.example`)
- Để chạy dự án, ta sẽ cần mở 3 tab terminal, một tab để chạy backend, một tab để chạy frontend.
- Sync project architecture (optional):

```bash
eza --tree --ignore-glob "node_modules|.idea|.vscode|.venv|__pycache__" > architecture.txt
```

### 2.1 Cài đặt Backend:

- Cài đặt các thư viện cần thiết:

```bash
cd backend
npm install
```

- Chạy backend:

```bash
npm run start 
# hoặc 
npm run dev
```

- Mở API docs tại địa chỉ: http://localhost:3001/api-docs

### 2.2 Cài đặt Frontend:

- Cài đặt các thư viện cần thiết:

```bash
cd frontend
npm install
```

- Chạy frontend:

```bash
npm run dev
```

### 2.3 Cài đặt AI:

- Cài đặt các thư viện cần thiết:

```bash
cd ai-service
python3 -m venv .venv # Or python -m venv .venv
pip install -r requirements.txt
```

- Chạy AI service:

```bash
uvicorn src.main:app 
```

### 2.4 Docker hóa dự án:

- Build docker compose:

```bash  
docker compose build # verson 2
```

- Push docker images (chỉ khi cần deploy trên cloud):

```bash
docker push tongducthanhnam/fashion-ai-be:latest
docker push tongducthanhnam/fashion-ai-fe:latest
docker push tongducthanhnam/fashion-ai-ai:latest
```

### 3. Triển khai:

- Sử dụng docker-compose để triển khai dự án:

```bash
docker compose up # verson 2
```