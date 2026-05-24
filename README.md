# Hackathon 5: AI-Powered Omnichannel Support Ticketing System

An advanced, production-ready **Omnichannel Support Ticketing System** built for GIAIC Hackathon 5. The application seamlessly manages customer inquiries from multiple streams (Email, WhatsApp, and Web Form) within a single unified interface.

## 🚀 Key Features

*   **Intelligent AI Classification:** Powered by OpenAI/Gemini models to automatically categorize requests (Bug, Billing, General) and assign real-time priority levels (High, Medium, Low).
*   **Ultra-Fast Fallback Engine:** Implements a strict 2-second API timeout limit. If the AI model lags or encounters an internet issue, a local keyword-matching algorithm instantly takes over so the submission never freezes.
*   **Omnichannel Routing:** Dynamic tab switching for simulating incoming user issues across Email, WhatsApp, and custom Web Forms.
*   **Instant QR Tracking & Print-Ready Workflow:** Generates a unique ticket reference ID with an scannable QR code instantly, along with functional invoice/ticket printing capabilities.

## 🛠️ Tech Stack

*   **Backend:** FastAPI (Python), Uvicorn, SQLite
*   **Frontend:** React, Vite, Tailwind CSS, TypeScript
*   **AI Integration:** OpenAI SDK / Google Gemini API

---
Developed with 💻 by **Farhana Yousuf** (AI Engineering Student - GIAIC)
