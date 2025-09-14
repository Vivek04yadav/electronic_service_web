from pydantic import BaseModel
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactForm(BaseModel):
    name: str
    phone: str
    email: str
    message: str

@app.post("/api/contact")
async def receive_contact_form(data: ContactForm):
    print("📩 Contact form submitted!")
    print("Name:", data.name)
    print("Phone:", data.phone)
    print("Email:", data.email)
    print("Message:", data.message)
    return JSONResponse(content={"message": "Thank you! We received your message."})
