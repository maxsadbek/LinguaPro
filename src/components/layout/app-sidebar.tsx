import { useLayout } from '@/context/layout-provider'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
// import { AppTitle } from './app-title'
import { adminProfileStorageKey, sidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'
import { NavUser } from './nav-user'
import { TeamSwitcher } from './team-switcher'

export function AppSidebar() {
  const { collapsible, variant } = useLayout()

  const storedUser = (() => {
    try {
      const raw = localStorage.getItem(adminProfileStorageKey)
      if (!raw) return null
      const parsed = JSON.parse(raw) as unknown
      if (
        typeof parsed === 'object' &&
        parsed !== null &&
        'name' in parsed &&
        'email' in parsed &&
        'avatar' in parsed
      ) {
        const u = parsed as { name: unknown; email: unknown; avatar: unknown }
        if (
          typeof u.name === 'string' &&
          typeof u.email === 'string' &&
          typeof u.avatar === 'string'
        ) {
          return { name: u.name, email: u.email, avatar: u.avatar }
        }
      }
      return null
    } catch {
      return null
    }
  })()

  const user = storedUser ?? sidebarData.user

  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />

        {/* Replace <TeamSwitch /> with the following <AppTitle />
         /* if you want to use the normal app title instead of TeamSwitch dropdown */}
        {/* <AppTitle /> */}
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
