import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <div>
        <h1 className="text-white">Sidebar</h1>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
