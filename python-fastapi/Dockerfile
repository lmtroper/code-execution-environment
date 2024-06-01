FROM python:3.11-slim

# Install PostgreSQL development package
RUN apt-get update && \
    apt-get install -y libpq-dev gcc
    # RUN useradd -ms /bin/bash sandboxuser
# USER sandboxuser

WORKDIR /app

# RUN chown -R sandboxuser:sandboxuser /app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install fastapi uvicorn
RUN pip install mysql-connector-python

COPY . .

ENV PYTHONUNBUFFERED 1
ENV PORT=8001

EXPOSE 8001

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
