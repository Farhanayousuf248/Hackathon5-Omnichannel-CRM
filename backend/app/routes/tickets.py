from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
import uuid
from typing import Any

from backend.app.database import get_db
from backend.app.models import Ticket
from backend.app.agent import classify_request

router = APIRouter(prefix="/api/tickets", tags=["tickets"])


class TicketCreate(BaseModel):
    customer_name: str
    source: str
    message: str


@router.post("/email")
def create_email_ticket(payload: TicketCreate, db: Session = Depends(get_db)) -> Any:
    classification = classify_request(payload.message)
    ticket_ref = str(uuid.uuid4())
    ticket = Ticket(
        customer_name=payload.customer_name,
        source="email",
        message=payload.message,
        category=classification.get("category"),
        priority=classification.get("priority"),
        ai_response=classification.get("ai_response"),
        ticket_reference=ticket_ref,
    )
    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    return {
        "status": "success",
        "developer": "Farhana Yousuf",
        "ticket_reference": ticket_ref,
        "category": ticket.category,
        "priority": ticket.priority,
        "ai_response": ticket.ai_response,
    }


@router.post("/whatsapp")
def create_whatsapp_ticket(payload: TicketCreate, db: Session = Depends(get_db)) -> Any:
    classification = classify_request(payload.message)
    ticket_ref = str(uuid.uuid4())
    ticket = Ticket(
        customer_name=payload.customer_name,
        source="whatsapp",
        message=payload.message,
        category=classification.get("category"),
        priority=classification.get("priority"),
        ai_response=classification.get("ai_response"),
        ticket_reference=ticket_ref,
    )
    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    return {
        "status": "success",
        "developer": "Farhana Yousuf",
        "ticket_reference": ticket_ref,
        "category": ticket.category,
        "priority": ticket.priority,
        "ai_response": ticket.ai_response,
    }


@router.post("/webform")
def create_webform_ticket(payload: TicketCreate, db: Session = Depends(get_db)) -> Any:
    classification = classify_request(payload.message)
    ticket_ref = str(uuid.uuid4())
    ticket = Ticket(
        customer_name=payload.customer_name,
        source="webform",
        message=payload.message,
        category=classification.get("category"),
        priority=classification.get("priority"),
        ai_response=classification.get("ai_response"),
        ticket_reference=ticket_ref,
    )
    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    return {
        "status": "success",
        "developer": "Farhana Yousuf",
        "ticket_reference": ticket_ref,
        "category": ticket.category,
        "priority": ticket.priority,
        "ai_response": ticket.ai_response,
    }


@router.get("/dashboard-stats")
def dashboard_stats(db: Session = Depends(get_db)) -> Any:
    total = db.query(Ticket).count()
    bugs = db.query(Ticket).filter(Ticket.category == "Bug").count()
    billing = db.query(Ticket).filter(Ticket.category == "Billing").count()
    general = db.query(Ticket).filter(Ticket.category == "General").count()
    high = db.query(Ticket).filter(Ticket.priority == "High").count()
    medium = db.query(Ticket).filter(Ticket.priority == "Medium").count()
    low = db.query(Ticket).filter(Ticket.priority == "Low").count()
    return {
        "total": total,
        "by_category": {"Bug": bugs, "Billing": billing, "General": general},
        "by_priority": {"High": high, "Medium": medium, "Low": low},
        "developer": "Farhana Yousuf",
    }
