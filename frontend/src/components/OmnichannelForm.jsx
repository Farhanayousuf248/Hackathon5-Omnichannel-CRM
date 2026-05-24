import React, { useState } from 'react'
import axios from 'axios'

const API_BASE = 'http://127.0.0.1:8001/api'

export default function OmnichannelForm({ onTicketCreated }) {
  const [activeTab, setActiveTab] = useState('email')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const [formData, setFormData] = useState({
    customer_name: '',
    message: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e, source) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const endpoint = `${API_BASE}/tickets/${source}`
      const response = await axios.post(endpoint, {
        ...formData,
        source,
      })
      
      setSuccess(`✅ Ticket created successfully!`)
      setFormData({ customer_name: '', message: '' })
      
      // Pass ticket data to parent
      onTicketCreated({
        ...response.data,
        source,
      })
    } catch (err) {
      console.error('Network/API error submitting ticket:', err)
      setError(
        err.response?.data?.detail ||
        err.message ||
        `Failed to create ticket via ${source}`
      )
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'email', label: '📧 Email', icon: '✉️' },
    { id: 'whatsapp', label: '💬 WhatsApp', icon: '💭' },
    { id: 'webform', label: '🌐 Web Form', icon: '📝' },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-semibold border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <form onSubmit={(e) => handleSubmit(e, activeTab)} className="space-y-4">
          <div>
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="form-label">
              Message ({activeTab === 'email' ? 'Email Body' : activeTab === 'whatsapp' ? 'WhatsApp Message' : 'Web Form Message'})
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={`Describe your ${
                activeTab === 'email'
                  ? 'issue via email'
                  : activeTab === 'whatsapp'
                  ? 'WhatsApp inquiry'
                  : 'web form question'
              }...`}
              className="form-input resize-none"
              rows="6"
              required
            />
          </div>

          {/* Alerts */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p className="font-semibold">⚠️ Error</p>
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              <p>{success}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? '⏳ Submitting...' : `🚀 Submit via ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-sm text-gray-700">
            <strong>💡 Tip:</strong> Your ticket will be automatically classified by our AI agent and assigned a priority level. You'll receive a unique ticket reference number with a QR code for tracking.
          </p>
        </div>
      </div>
    </div>
  )
}
