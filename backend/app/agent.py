"""
Developer: Farhana Yousuf

AI agent module: classifies incoming ticket text into a structured JSON
response containing `category` and `priority`. Uses OpenAI when available
and falls back to deterministic heuristics when not.
"""
from typing import Dict
import json
import os
import openai


def _fallback_classify(text: str) -> Dict[str, str]:
    txt = (text or "").lower()
    category = "General"
    priority = "Medium"

    if any(k in txt for k in ["error", "bug", "crash", "failed"]):
        category = "Bug"
        priority = "High"
    elif any(k in txt for k in ["pay", "money", "billing", "transaction"]):
        category = "Billing"
    else:
        category = "General"
        priority = "Medium"

    ai_response = (
        "Our AI support assistant has classified this request and prioritized it for rapid CRM processing. "
        "A human-support specialist will follow up with the next steps shortly."
    )
    return {"category": category, "priority": priority, "ai_response": ai_response}


def classify_request(text: str) -> Dict[str, str]:
    """Classify incoming text into category and priority.

    Tries OpenAI with a strict 2-second timeout, then falls back immediately to a local deterministic classifier.
    """
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return _fallback_classify(text)

    openai.api_key = api_key
    system_prompt = (
        "You are a support ticket classifier. Receive a user message and output valid JSON with keys:"
        " category (one of Bug, Billing, General), priority (Low, Medium, High), and ai_response (a short explanation)."
        " Output ONLY the JSON object."
    )
    user_prompt = f"Classify the following ticket message:\n\n{text}"
    try:
        resp = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            max_tokens=150,
            temperature=0,
            request_timeout=2,
        )
        reply = resp.choices[0].message.content.strip()
        parsed = json.loads(reply)
        category = parsed.get("category", "General")
        priority = parsed.get("priority", "Low")
        ai_response = parsed.get("ai_response", reply)
        return {"category": category, "priority": priority, "ai_response": ai_response}
    except Exception as err:
        # Fallback immediately on any timeout or API failure
        return _fallback_classify(text)

