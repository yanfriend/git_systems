FROM python:3.11

WORKDIR /app

COPY . /app

RUN pip install fastapi uvicorn psycopg2-binary

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
