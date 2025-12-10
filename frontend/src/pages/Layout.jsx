import React from 'react'
import { Outlet } from 'react-router-dom'
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import { PanelLeft } from 'lucide-react'

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-black">
        <DashboardSidebar />
        <SidebarInset className="bg-black">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-800 px-6 bg-[#08120d]">
            {/* Left side - Toggle button */}
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-white hover:bg-gray-800 -ml-1">
                <PanelLeft className="h-5 w-5" />
              </SidebarTrigger>

              <div className="">
                <div className="flex items-center gap-2 border border-[#161616] rounded-md px-3 py-1 text-1xl text-[#e0e1e6] bg-[#292d2b]">
                  <div className="size-2 rounded-full bg-green-500"></div>
                  <span>Welcome back, John</span>
                </div>
              </div>
            </div>

            {/* Right side - Logo and branding */}
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg overflow-hidden">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-white text-sm">
                  Sustainify
                </span>
                <span className="text-xs text-gray-400">Admin</span>
              </div>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-6 overflow-auto bg-black">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export default Layout
