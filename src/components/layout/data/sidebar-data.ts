import {
  AudioWaveform,
  Bell,
  GalleryVerticalEnd,
  LayoutDashboard,
  ListTodo,
  MessagesSquare,
  UserCog,
  Users,
  Wrench,
  GraduationCap,
} from 'lucide-react'
import { CustomLogo } from '@/assets/custom-logo'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'LinguardPro Admin',
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
          title: "Ustozlar",
          url: '/teachers',
          icon: GraduationCap,
        },
        {
          title: 'Xabarlar',
          url: '/chats',
          badge: '3',
          icon: MessagesSquare,
        },
        {
          title: 'Users',
          url: '/users',
          icon: Users,
        },
      ],
    },
    {
      title: 'Sozlamalar',
      items: [
        {
          title: 'Profil',
          url: '/settings/profile',
          icon: UserCog,
        },
        {
          title: 'Hisob',
          url: '/settings/account',
          icon: Wrench,
        },
        {
          title: 'Bildirishlar',
          url: '/settings/notifications',
          icon: Bell,
        },
      ],
    },
  ],
}
