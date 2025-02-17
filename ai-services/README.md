## FastAPI

Hướng dẫn cài đặt và chạy FastAPI
Đầu tiên ta cần tạo một virtual environment để cài đặt các thư viện cần thiết cho dự án

```bash
python3 -m venv .venv # Or python -m venv .venv
```

Kích hoạt virtual environment

```bash
source .venv/bin/activate # I user ubuntu bash shell
```

Cài đặt FastAPI và các thư viện cần thiết

```bash
pip install -r requirements.txt
```

Chạy FastAPI

```bash
uvicorn app.main:app --reload
```

Tạo file lưu các thư viện cần thiết

```bash
pip freeze > requirements.txt
```