from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.database import init_db
from backend.app.routes.tickets import router as tickets_router

app = FastAPI(title="Hackathon5 API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    # Terminal startup banner for developer grading visibility
    banner = """
=============================================================
DEVELOPER: FARHANA YOUSUF
STATUS: AI ENGINEERING STUDENT (GIAIC)
=============================================================
"""
    print(banner)
    # Ensure database tables exist
    init_db()


@app.get("/")
async def root():
    return {"status": "ok", "developer": "Farhana Yousuf"}


# Include tickets router (provides /tickets/* endpoints)
app.include_router(tickets_router)
