from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import mysql.connector
import subprocess
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# MySQL connection settings
MYSQL_HOST = "db" 
MYSQL_PORT = 3306
MYSQL_USER = "root"
MYSQL_PASSWORD = "root"
MYSQL_DB = "db"

class CodeRequest(BaseModel):
    code: str

@app.post("/runcode/")
async def run_code(code_request: CodeRequest):
    print("Running code...\n\n")
    code = code_request.code

    try:
        # Write the code to a separate file
        with open("temp_code.py", "w") as f:
            f.write(code)
        
        result = subprocess.run(["python", "temp_code.py"], capture_output=True, text=True, timeout=10)
        
        if result.returncode != 0:
            error_message = result.stderr
            return {"output": error_message} # Return stderr as error detail
        
        return {"output": result.stdout}
    
    except subprocess.TimeoutExpired:
        error_message = "Execution timed out."
        print("Timeout error:", error_message)
        raise HTTPException(status_code=400, detail=error_message)
    
    except Exception as e:
        error_message = str(e)
        print("Unknown error:", error_message)
        raise HTTPException(status_code=400, detail=error_message)
    
    finally:
        # Clean up the temporary file
        if os.path.exists("temp_code.py"):
            os.remove("temp_code.py")

@app.post("/savecode/")
async def save_code(code_request: CodeRequest):
    code = code_request.code

    try:
        # Write the code to a separate file
        with open("temp_code.py", "w") as f:
            f.write(code)
        
        result = subprocess.run(["python", "temp_code.py"], capture_output=True, text=True, timeout=10)
        
        if result.returncode != 0:
            error_message = result.stderr
            return {"message": "Code saved successfully!", "output": error_message} # Return stderr as error detail
        
        # Connect to the MySQL database
        connection = mysql.connector.connect(
            host=MYSQL_HOST,
            port=MYSQL_PORT,
            user=MYSQL_USER,
            password=MYSQL_PASSWORD,
            database=MYSQL_DB
        )
        cursor = connection.cursor()

        # Insert the code and output into the submissions table
        query = "INSERT INTO submissions (code, output_code, created_at) VALUES (%s, %s, %s)"
        cursor.execute(query, (code, result.stdout, datetime.now()))

        # Commit the transaction
        connection.commit()

        return {"message": "Code saved and executed successfully!", "output": result.stdout}

    except (subprocess.SubprocessError, mysql.connector.Error) as e:
        error_message = str(e)
        print("Error:", error_message)
        raise HTTPException(status_code=500, detail=error_message)
    
    except subprocess.TimeoutExpired:
        error_message = "Execution timed out."
        print("Timeout error:", error_message)
        raise HTTPException(status_code=400, detail=error_message)
    
    except Exception as e:
        error_message = str(e)
        print("Unknown error:", error_message)
        raise HTTPException(status_code=400, detail=error_message)
    
    finally:
        # Clean up the temporary file
        if os.path.exists("temp_code.py"):
            os.remove("temp_code.py")
        
        # Close the database connection
        if 'connection' in locals() and connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection closed.")

@app.get("/submissions/")
async def get_submissions():
    try:
        # Connect to the MySQL database
        connection = mysql.connector.connect(
            host=MYSQL_HOST,
            port=MYSQL_PORT,
            user=MYSQL_USER,
            password=MYSQL_PASSWORD,
            database=MYSQL_DB
        )
        cursor = connection.cursor()

        query = "SELECT * FROM submissions ORDER BY created_at DESC"
        cursor.execute(query)
        submissions = cursor.fetchall()

        # Format the results as a list of dictionaries
        result = [
            {"id": row[0], "code": row[1], "output_code": row[2], "created_at": row[3].isoformat()}
            for row in submissions
        ]

        return result

    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving submissions from MySQL: {e}")

    finally:
        # Close the connection
        if 'connection' in locals() and connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection closed.")
