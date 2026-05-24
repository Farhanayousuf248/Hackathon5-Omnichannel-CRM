import React from 'react'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">🚀 Hackathon5 CRM</h1>
            <p className="text-blue-100 mt-1">Omnichannel Support Ticketing System</p>
          </div>
          <div className="text-right text-sm">
            <p className="font-semibold">Developer: Farhana Yousuf</p>
            <p className="text-blue-100">AI Engineering Student (GIAIC)</p>
          </div>
        </div>
      </div>
    </header>
  )
}
