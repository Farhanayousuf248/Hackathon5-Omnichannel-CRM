import React, { useState, useEffect } from 'react'
import QRCode from 'qrcode'

export default function TicketDisplay({ ticket }) {
  const [qrCode, setQrCode] = useState(null)

  useEffect(() => {
    const generateQR = async () => {
      try {
        const qrImage = await QRCode.toDataURL(ticket.ticket_reference, {
          errorCorrectionLevel: 'H',
          type: 'image/jpeg',
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        })
        setQrCode(qrImage)
      } catch (err) {
        console.error('Failed to generate QR code:', err)
      }
    }

    generateQR()
  }, [ticket.ticket_reference])

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-600 mb-2">✅ Ticket Created Successfully!</h2>
          <p className="text-gray-600">Your support request has been received and processed by our AI system.</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* QR Code Section */}
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border-2 border-dashed border-green-300">
            {qrCode && (
              <div>
                <img src={qrCode} alt="Ticket QR Code" className="w-64 h-64" />
                <p className="text-center text-sm text-gray-600 mt-4">Scan with your phone to track</p>
              </div>
            )}
            {!qrCode && (
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
            )}
          </div>

          {/* Ticket Details Section */}
          <div className="space-y-4">
            <div>
              <label className="form-label">Ticket Reference</label>
              <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm break-all border-2 border-green-400">
                {ticket.ticket_reference}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(ticket.ticket_reference)}
                className="btn-secondary mt-2 w-full text-sm"
              >
                📋 Copy Reference
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 font-semibold">Category</p>
                <p className="text-lg font-bold text-blue-600 mt-1">{ticket.category}</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 font-semibold">Priority</p>
                <p className={`text-lg font-bold mt-1 ${
                  ticket.priority === 'High' ? 'text-red-600' :
                  ticket.priority === 'Medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  {ticket.priority}
                </p>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 font-semibold">Channel</p>
              <p className="text-lg font-bold text-purple-600 mt-1 capitalize">
                {ticket.source === 'email' && '📧 Email'}
                {ticket.source === 'whatsapp' && '💬 WhatsApp'}
                {ticket.source === 'webform' && '🌐 Web Form'}
              </p>
            </div>
          </div>
        </div>

        {/* Developer Branding */}
        <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded text-center">
          <p className="text-sm text-gray-700">
            <strong>Developer:</strong> Farhana Yousuf • <strong>Status:</strong> AI Engineering Student (GIAIC)
          </p>
          <p className="text-xs text-gray-600 mt-1">
            This ticket will be processed by our intelligent CRM system powered by OpenAI classification.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => window.location.reload()}
            className="btn-primary flex-1"
          >
            📊 Back to Dashboard
          </button>
          <button
            onClick={() => window.print()}
            className="btn-secondary flex-1"
          >
            🖨️ Print Ticket
          </button>
        </div>
      </div>
    </div>
  )
}
