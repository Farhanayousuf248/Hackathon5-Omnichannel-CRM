from pydantic import BaseModel
from typing import Optional

class TicketCreate(BaseModel):
    customer_name: str
    customer_email: Optional[str] = None
    subject: Optional[str] = None
    message: str