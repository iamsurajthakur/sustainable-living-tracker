import Home from './pages/Home'
import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
