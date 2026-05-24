import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_BASE = 'http://127.0.0.1:8001/api'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_BASE}/tickets/dashboard-stats`)
        setStats(response.data)
        setError(null)
      } catch (err) {
        console.error('Network/API error fetching dashboard stats:', err)
        setError(
          err.response?.data?.detail ||
          err.message ||
          'Failed to load dashboard'
        )
        setStats(null)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 5000) // Refresh every 5 seconds
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p className="font-semibold">⚠️ Error</p>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-600">
          <div className="text-blue-600 text-2xl font-bold">{stats?.total || 0}</div>
          <p className="text-gray-700 font-semibold mt-1">Total Tickets</p>
        </div>
        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-600">
          <div className="text-green-600 text-2xl font-bold">{stats?.by_category?.Bug || 0}</div>
          <p className="text-gray-700 font-semibold mt-1">🐛 Bug Reports</p>
        </div>
        <div className="card bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-600">
          <div className="text-orange-600 text-2xl font-bold">{stats?.by_category?.Billing || 0}</div>
          <p className="text-gray-700 font-semibold mt-1">💳 Billing Issues</p>
        </div>
        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-600">
          <div className="text-purple-600 text-2xl font-bold">{stats?.by_category?.General || 0}</div>
          <p className="text-gray-700 font-semibold mt-1">📋 General</p>
        </div>
      </div>

      {/* Priority Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card border-l-4 border-red-500">
          <h3 className="text-lg font-semibold text-red-600">🔴 High Priority</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">{stats?.by_priority?.High || 0}</p>
        </div>
        <div className="card border-l-4 border-yellow-500">
          <h3 className="text-lg font-semibold text-yellow-600">🟡 Medium Priority</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{stats?.by_priority?.Medium || 0}</p>
        </div>
        <div className="card border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-green-600">🟢 Low Priority</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats?.by_priority?.Low || 0}</p>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-center text-sm text-gray-600">
        <p>Dashboard auto-refreshes every 5 seconds • Developer: Farhana Yousuf</p>
      </div>
    </div>
  )
}
