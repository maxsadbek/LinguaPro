import { Link, useRouterState } from '@tanstack/react-router'
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  BarChart3,
  BookOpen,
  MessageSquare,
  Megaphone,
  User,
} from 'lucide-react'

const navItems = [
  {
    label: 'Dashboard',
    to: '/teacher-dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Groups',
    to: '/teacher-dashboard/groups',
    icon: Users,
  },
  {
    label: 'Attendance',
    to: '/teacher-dashboard/attendance',
    icon: ClipboardCheck,
  },
  {
    label: 'Results',
    to: '/teacher-dashboard/results',
    icon: BarChart3,
  },
  {
    label: 'Homework',
    to: '/teacher-dashboard/homework',
    icon: BookOpen,
  },
  {
    label: 'Messages',
    to: '/teacher-dashboard/messages',
    icon: MessageSquare,
  },
  {
    label: 'Announcements',
    to: '/teacher-dashboard/announcements',
    icon: Megaphone,
  },
  {
    label: 'Profile',
    to: '/teacher-dashboard/profile',
    icon: User,
  },
] as const

export function TeacherSidebar() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  })

  return (
    <aside className='sticky top-0 flex h-screen w-64 flex-col gap-2 border-r border-slate-200/50 bg-slate-50 p-4'>
      <div className='mb-4 px-4 py-6'>
        <h1 className='font-headline text-lg font-black tracking-tight text-rose-700 uppercase'>
          LinguaPro
        </h1>
        <p className='mt-1 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase'>
          Teacher Portal
        </p>
      </div>

      <nav className='flex flex-col gap-1'>
        {navItems.map((item) => {
          const isActive =
            item.to === '/teacher-dashboard'
              ? pathname === '/teacher-dashboard' ||
                pathname === '/teacher-dashboard/'
              : pathname.startsWith(item.to)
          const Icon = item.icon
          return (
            <Link
              key={item.to}
              to={item.to}
              className={
                isActive
                  ? 'flex items-center gap-3 rounded-xl bg-white px-4 py-3 font-bold text-rose-600 shadow-sm transition-all duration-200 ease-in-out'
                  : 'flex items-center gap-3 px-4 py-3 text-slate-600 transition-all duration-200 ease-in-out hover:bg-rose-50 hover:text-rose-700'
              }
            >
              <Icon size={20} />
              <span className='font-headline text-sm'>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className='mt-auto rounded-2xl bg-white/50 p-4'>
        <button className='primary-gradient font-headline w-full rounded-full py-3 text-sm font-bold text-white shadow-md shadow-rose-900/20 transition-transform active:scale-95'>
          New Class Session
        </button>
      </div>
    </aside>
  )
}
