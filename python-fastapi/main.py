from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

class CodeRequest(BaseModel):
    code: str

@app.post("/runcode/")
async def run_code(request: Request, code_request: CodeRequest):
    code = code_request.code
    
    # Run the code and capture the output
    try:
        output = subprocess.check_output(["python", "-c", code], stderr=subprocess.STDOUT, timeout=10, encoding="utf-8")
        return {"output": output}
    except subprocess.CalledProcessError as e:
        return {"output": e.output}
    except subprocess.TimeoutExpired:
        return {"output": "Execution timed out."}
    except Exception as e:
        return {"output": str(e)}
