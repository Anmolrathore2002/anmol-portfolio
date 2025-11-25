from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pathlib import Path
import json, datetime

app = FastAPI(title="Anmol Portfolio Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

RESUME_PATH = Path("/mnt/data/Anmol_Resume.pdf")
CONTACT_STORE = Path("contacts.json")
if not CONTACT_STORE.exists():
    CONTACT_STORE.write_text("[]")

@app.get("/resume")
def get_resume():
    if not RESUME_PATH.exists():
        raise HTTPException(status_code=404, detail="Resume not found")
    return FileResponse(path=str(RESUME_PATH), filename="Anmol_Resume.pdf", media_type="application/pdf")

class ContactIn(BaseModel):
    name: str
    email: EmailStr
    subject: str | None = None
    message: str

@app.post("/api/contact")
def contact(payload: ContactIn):
    entry = {
        "name": payload.name,
        "email": payload.email,
        "subject": payload.subject,
        "message": payload.message,
        "received_at": datetime.datetime.utcnow().isoformat() + "Z"
    }
    data = json.loads(CONTACT_STORE.read_text())
    data.append(entry)
    CONTACT_STORE.write_text(json.dumps(data, indent=2))
    return {"status":"ok","saved":True}
