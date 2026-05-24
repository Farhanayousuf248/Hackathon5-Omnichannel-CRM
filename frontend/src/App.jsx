import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import OmnichannelForm from './components/OmnichannelForm'
import TicketDisplay from './components/TicketDisplay'

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [successTicket, setSuccessTicket] = useState(null)

  const handleTicketCreated = (ticketData) => {
    setSuccessTicket(ticketData)
    setCurrentView('ticket-display')
  }

  return (
    <div className="app-container">
      <Header />
      <main className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <div className="flex gap-4 mb-8 justify-center">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                currentView === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setCurrentView('form')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                currentView === 'form'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              📝 Create Ticket
            </button>
          </div>

          {/* Content */}
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'form' && (
            <OmnichannelForm onTicketCreated={handleTicketCreated} />
          )}
          {currentView === 'ticket-display' && successTicket && (
            <TicketDisplay ticket={successTicket} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
