import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logoutUser } from '@/api/auth.js'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../secure/AuthContext'
const menuItems = [
  {
    title: 'Dashboard',
    key: 'overview',
    icon: LayoutDashboard,
  },
  {
    title: 'Log Activities',
    key: 'log',
    icon: Activity,
  },
  {
    title: 'Eco-Challenges',
    key: 'challenge',
    icon: Target,
  },
  {
    title: 'History',
    key: 'history',
    icon: History,
  },
  {
    title: 'Recent Activity',
    key: 'recent',
    icon: List,
  },
]

export default function DashboardSidebar({ active, onSelect }) {
  const navigate = useNavigate()
  const { setAccessToken } = useContext(AuthContext)

  const handleLogout = async () => {
    try {
      await logoutUser()

      // Clear the access token from context
      setAccessToken(null)

      // Remove from localStorage (if you were using it)
      localStorage.removeItem('accessToken')

      // Navigate to login
      navigate('/login', { replace: true })

      console.log('✅ Logged out successfully')
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message)
    }
  }

  const { state, isMobile, setOpenMobile } = useSidebar()
  const isCollapsed = state === 'collapsed'

  const handleMenuClick = (key) => {
    onSelect(key)
    // Close sidebar on mobile after selection
    if (isMobile) {
      setOpenMobile(false)
    }
  }

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
                const isActive = active === item.key

                return (
                  <SidebarMenuItem key={item.title} className="list-none">
                    <SidebarMenuButton
                      tooltip={item.title}
                      onClick={() => handleMenuClick(item.key)}
                      className={`
          rounded-md transition-all h-10 px-3 w-full
          ${
            isActive
              ? 'bg-green-500/25 text-green-50 ring-1 ring-green-400/40'
              : 'bg-transparent text-gray-400 hover:bg-green-400/10 hover:text-green-300'
          }
        `}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="size-4 flex-shrink-0" />
                        {!isCollapsed && (
                          <span className="text-sm truncate">{item.title}</span>
                        )}
                      </div>
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
                <DropdownMenuItem
                  className="hover:bg-gray-800 text-red-400 hover:text-red-300 cursor-pointer focus:bg-gray-800 focus:text-red-300"
                  onSelect={handleLogout}
                >
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
