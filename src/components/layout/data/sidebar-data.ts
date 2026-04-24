import {
  AudioWaveform,
  Bell,
  Book,
  GalleryVerticalEnd,
  GraduationCap,
  LayoutDashboard,
  ListTodo,
  Megaphone,
  MessagesSquare,
  Settings,
} from 'lucide-react'
import { CustomLogo } from '@/assets/custom-logo'
import { type SidebarData } from '../types'

export const adminProfileStorageKey = 'linguapro_admin_profile'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'LinguaPro Admin',
      logo: CustomLogo,
      plan: 'MANAGEMENT CONSOLE',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: "O'quvchilar",
          url: '/students',
          icon: ListTodo,
        },
        {
          title: 'Ustozlar',
          url: '/teachers',
          icon: GraduationCap,
        },
        {
          title: 'Kurslar',
          url: '/courses',
          icon: Book,
        },
        {
          title: 'Xabarlar',
          url: '/chats',
          badge: '3',
          icon: MessagesSquare,
        },
      ],
    },
    {
      title: 'Sozlamalar',
      items: [
        {
          title: 'Sozlamalar',
          url: '/settings',
          icon: Settings,
        },
        {
          title: "E'lonlar",
          url: '/announcements',
          icon: Megaphone,
        },
        {
          title: 'Bildirishlar',
          url: '/notifications',
          icon: Bell,
        },
      ],
    },
  ],
}
