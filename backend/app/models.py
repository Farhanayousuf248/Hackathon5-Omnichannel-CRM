from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.sql import func
from sqlalchemy import DateTime

Base = declarative_base()


class Ticket(Base):
    __tablename__ = "tickets"
    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(255), nullable=False, index=True)
    source = Column(String(50), nullable=False, index=True)
    message = Column(Text, nullable=False)
    category = Column(String(50), nullable=False, default="General")
    priority = Column(String(50), nullable=False, default="Low")
    ai_response = Column(Text, nullable=True)
    ticket_reference = Column(String(100), unique=True, nullable=False, index=True)
    created_at = Column(DateTime, server_default=func.now())

