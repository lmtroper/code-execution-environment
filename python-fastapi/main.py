from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import subprocess
import mysql.connector
import os

# MySQL database configuration
# MYSQL_HOSTNAME = "db"
# MYSQL_USER = "root"
# MYSQL_PASSWORD = "my-secret-pw"
# MYSQL_DB = "entries"
# MY_SQL_PORT = 3306  # Update this line

# Construct the MySQL connection URL
# DATABASE_URL = f"mysql+mysqlconnector://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOSTNAME}:{MY_SQL_PORT}/{MYSQL_DB}"

connection = mysql.connector.connect(
    user='root', password='root', host='mysql', port='3306', database='db')
cursor= connection.cursor()
cursor.execute('SELECT * FROM submissions')
subs = cursor.fetchall()
print(subs)
connection.close()


app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["GET", "POST", "PUT", "DELETE"],
#     allow_headers=["*"],
# )

# Base = declarative_base()
# engine = create_engine(DATABASE_URL)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# class CodeSubmission(Base):
#     __tablename__ = 'code_submissions'
#     id = Column(Integer, primary_key=True, index=True)
#     code = Column(Text, nullable=False)
#     output = Column(Text, nullable=False)

# # Create the database tables if they don't exist
# Base.metadata.create_all(bind=engine)

# class CodeRequest(BaseModel):
#     code: str

# @app.post("/runcode/")
# async def run_code(code_request: CodeRequest):
#     code = code_request.code

#     # Run code in isolated environment
#     try:
#         # Write the code to a separate file
#         with open("temp_code.py", "w") as f:
#             f.write(code)
        
#         result = subprocess.run(["python", "temp_code.py"], capture_output=True, text=True, timeout=10)
        
#         if result.returncode != 0:
#             raise HTTPException(status_code=400, detail=result.stderr)
        
#         return {"output": result.stdout}
#     except subprocess.TimeoutExpired:
#         raise HTTPException(status_code=400, detail="Execution timed out.")
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))
#     finally:
#         # Clean up the temporary file
#         if os.path.exists("temp_code.py"):
#             os.remove("temp_code.py")

# @app.post("/submitcode/")
# async def submit_code(code_request: CodeRequest):
#     code = code_request.code

#     # Run the code and capture the output
#     try:
#         result = subprocess.run(["python", "-c", code], capture_output=True, text=True, timeout=10)
        
#         if result.returncode != 0:
#             raise HTTPException(status_code=400, detail=result.stderr)

#         # Save the code and output to the database
#         db = SessionLocal()
#         code_submission = CodeSubmission(code=code, output=result.stdout)
#         db.add(code_submission)
#         db.commit()
#         db.refresh(code_submission)
#         db.close()

#         return {"output": result.stdout}
#     except subprocess.TimeoutExpired:
#         raise HTTPException(status_code=400, detail="Execution timed out.")
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))
