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
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
]

export default function DashboardSidebar() {
  const location = useLocation()
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'

  return (
    <Sidebar
      collapsible="icon"
      className="bg-[#0A0E27] border-r border-gray-800"
    >
      {/* Content - No Header */}
      <SidebarContent className="bg-[#0A0E27]">
        <SidebarGroup className="px-3 py-4">
          {!isCollapsed && (
            <SidebarGroupLabel className="text-gray-500 text-xs uppercase px-1 mb-2">
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
                            ? 'bg-gray-800 text-white'
                            : 'bg-transparent text-gray-400 hover:bg-gray-800/50 hover:text-white'
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
      <div className="border-t border-gray-800 p-1.5">
        <SidebarMenu>
          <SidebarMenuItem className="list-none">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className={`bg-transparent hover:bg-gray-800/50 data-[state=open]:bg-gray-800/50 text-white h-14 w-full ${isCollapsed ? 'justify-center px-0' : 'px-4'}`}
                >
                  <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white flex-shrink-0">
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
                className="w-56 rounded-lg bg-[#0A0E27] border-gray-800"
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
