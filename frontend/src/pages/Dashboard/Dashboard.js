import React from 'react'
import { Routes, Route } from 'react-router-dom'

function Dashboard() {
    return (
        <Routes>
            <Route to='/dashboard' element={<Dashboard />} />
            <Route to='/dashboard' element={<Dashboard />} />
        </Routes>
    )
}

export default Dashboard