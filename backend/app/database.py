from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.app.models import Base
import os

# Use file-based SQLite DB in project folder by default
db_path = os.getenv("HACKATHON_DB_PATH", "./hackathon.db")
SQLALCHEMY_DATABASE_URL = f"sqlite:///{db_path}"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db():
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
