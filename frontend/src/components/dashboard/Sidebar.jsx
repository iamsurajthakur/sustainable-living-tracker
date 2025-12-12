import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  Activity,
  Target,
  History,
  Settings,
  ChevronUp,
  User2,
  List,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const menuItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Log Activities',
    url: '/log-activities',
    icon: Activity,
  },
  {
    title: 'Eco-Challenges',
    url: '/eco-challenges',
    icon: Target,
  },
  {
    title: 'History',
    url: '/history',
    icon: History,
  },
  {
    title: 'Recent Activity',
    url: '/settings',
    icon: List,
  },
]

export default function DashboardSidebar() {
  const location = useLocation()
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'

  return (
    <Sidebar
      collapsible="icon"
      className="bg-[#050A07] border-r border-green-500/25"
    >
      <SidebarContent className="bg-[#08120D]">
        <SidebarGroup className="px-3 py-4">
          {!isCollapsed && (
            <SidebarGroupLabel className="text-green-400 text-xs uppercase px-1 mb-2">
              MAIN MENU
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.title} className="list-none">
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={`
                        rounded-md transition-all h-10 px-3 w-full
                        ${
                          isActive
                            ? 'bg-green-500/25 text-green-50 ring-1 ring-green-400/40 shadow-[0_0_12px_rgba(34,197,94,0.25)]'
                            : 'bg-transparent text-gray-400 hover:bg-green-400/10 hover:text-green-300'
                        }
                      `}
                    >
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="size-4 flex-shrink-0" />
                        {!isCollapsed && (
                          <span className="text-sm truncate">{item.title}</span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <div className="border-t border-green-500/25 p-1.5 bg-[#08120D]">
        <SidebarMenu>
          <SidebarMenuItem className="list-none">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className={`hover:bg-green-400/10 data-[state=open]:bg-green-500/20 text-white h-14 w-full ${
                    isCollapsed ? 'justify-center px-0' : 'px-4'
                  }`}
                >
                  <div className="flex size-8 items-center justify-center rounded-lg bg-green-500 text-black shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                    <User2 className="size-5" />
                  </div>
                  {!isCollapsed && (
                    <>
                      <div className="flex flex-col text-left text-sm leading-tight min-w-0 flex-1 ml-3">
                        <span className="truncate font-semibold text-white">
                          John Doe
                        </span>
                        <span className="truncate text-xs text-gray-400">
                          john@example.com
                        </span>
                      </div>
                      <ChevronUp className="size-4 text-gray-400 flex-shrink-0" />
                    </>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-lg bg-[#08120D] border border-green-500/25 shadow-[0_0_20px_rgba(0,0,0,0.6)]"
                side="top"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem className="hover:bg-gray-800 text-gray-300 hover:text-white cursor-pointer focus:bg-gray-800 focus:text-white">
                  <User2 className="mr-2 size-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800 text-gray-300 hover:text-white cursor-pointer focus:bg-gray-800 focus:text-white">
                  <Settings className="mr-2 size-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800 text-red-400 hover:text-red-300 cursor-pointer focus:bg-gray-800 focus:text-red-300">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </Sidebar>
  )
}
