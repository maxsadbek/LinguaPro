import {
  AudioWaveform,
  Book,
  BookOpen,
<<<<<<< HEAD
  ClipboardCheck,
=======
  CalendarDays,
  ClipboardList,
>>>>>>> ca99db207a537d7b313f46eb718bd774c300e118
  GalleryVerticalEnd,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  ScrollText,
  Settings,
  User,
} from 'lucide-react'
import { CustomLogo } from '@/assets/custom-logo'
import { type SidebarData } from '../types'

export const adminProfileStorageKey = 'linguapro_admin_profile'
export type SidebarRole = 'admin' | 'teacher' | 'student'

export const studentSidebarData = {
  navGroups: [
    {
      title: 'Workspace',
      items: [
        { title: 'Overview', url: '/student', icon: LayoutDashboard },
        { title: 'Schedule', url: '/student/schedule', icon: CalendarDays },
        { title: 'Homework', url: '/student/homework', icon: ClipboardList },
        { title: 'Messages', url: '/student/messages', icon: MessageSquare },
        { title: 'Courses', url: '/student/courses', icon: BookOpen },
        { title: 'Profile', url: '/student/profile', icon: User },
      ],
    },
  ],
}

export const adminSidebarData: SidebarData = {
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
          url: '/admin-dashboard',
          icon: LayoutDashboard,
        },
        {
          title: 'Users',
          url: '/users',
          icon: User,
        },
        {
          title: 'Teachers',
          url: '/teachers',
          icon: GraduationCap,
        },
        {
          title: 'Courses',
          url: '/courses',
          icon: Book,
        },
        {
          title: 'Reports',
          url: '/notifications',
          icon: ScrollText,
        },
        {
          title: 'Assignments',
          url: '/assignments',
          icon: BookOpen,
        },
      ],
    },
    {
      title: 'System',
      items: [
        {
          title: 'Settings',
          url: '/settings',
          icon: Settings,
        },
      ],
    },
  ],
}

export const sidebarData = adminSidebarData

export const teacherSidebarData = {
  user: {
    name: 'Teacher',
    email: '',
    avatar: '/avatars/shadcn.jpg',
  },
  navItems: [
    {
      title: 'Dashboard',
      url: '/teacher-dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Groups',
      url: '/teacher-dashboard/groups',
      icon: BookOpen,
    },
    {
      title: 'Attendance',
      url: '/teacher-dashboard/attendance',
      icon: ClipboardCheck,
    },
    {
      title: 'Homework',
      url: '/teacher-dashboard/homework',
      icon: GraduationCap,
    },
    {
      title: 'Messages',
      url: '/teacher-dashboard/messages',
      icon: MessageSquare,
    },
  ],
  ctaLabel: 'New Class Session',
} as const

export const roleSidebarData: Record<SidebarRole, SidebarData> = {
  admin: adminSidebarData,
  teacher: {
    user: teacherSidebarData.user,
    teams: [
      {
        name: 'LinguaPro Teacher',
        logo: CustomLogo,
        plan: 'TEACHER PORTAL',
      },
    ],
    navGroups: [
      {
        title: 'General',
        items: teacherSidebarData.navItems.map((item) => ({
          title: item.title,
          url: item.url,
          icon: item.icon,
        })),
      },
    ],
  },
}
