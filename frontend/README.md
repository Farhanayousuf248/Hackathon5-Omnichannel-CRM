# Hackathon5 CRM Frontend

A professional omnichannel support ticketing system built with React + Vite + Tailwind CSS.

## Features

- **Dashboard**: Real-time stats on tickets by category and priority
- **Omnichannel Forms**: Email, WhatsApp, and Web Form submission tabs
- **QR Code & Reference Display**: Unique ticket references with QR codes for tracking
- **AI-Powered Classification**: Backend classifies tickets using OpenAI
- **Developer Branding**: Professional header and footer showcasing Farhana Yousuf

## Setup

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

**Note**: The frontend proxies API requests to `http://localhost:8001` (backend). Ensure the backend is running on port 8001.

### Build

```bash
npm run build
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Top banner with developer branding
│   │   ├── Footer.jsx          # Footer with branding
│   │   ├── Dashboard.jsx       # Stats dashboard
│   │   ├── OmnichannelForm.jsx # Email/WhatsApp/Webform tabs
│   │   └── TicketDisplay.jsx   # QR code and ticket reference
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # React entry point
│   └── index.css               # Tailwind styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Developer

**Farhana Yousuf**  
*AI Engineering Student (GIAIC)*  
Hackathon5 CRM Solution

## License

MIT
