import { useMemo, useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Bell, LogOut, Search, Settings, User, Menu } from 'lucide-react'
import useUserStore from '@/stores/userStore'
import { useProfile } from '@/hooks/teacher/profile/useProfile'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useUnreadCount } from '@/features/notifications/hooks'

function getInitials(name?: string) {
  if (!name) return 'U'
  const parts = name
    .split(' ')
    .map((p) => p.trim())
    .filter(Boolean)
  const first = parts[0]?.[0] ?? 'U'
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : ''
  return `${first}${last}`.toUpperCase()
}

interface TeacherNavbarProps {
  onMenuClick?: () => void
}

export function TeacherNavbar({ onMenuClick }: TeacherNavbarProps) {
  const { data: profile } = useProfile()
  const { data: unreadData } = useUnreadCount()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement | null>(null)
  const clearUserInfoAndToken = useUserStore(
    (s) => s.actions.clearUserInfoAndToken
  )

  const initials = useMemo(
    () => getInitials(profile?.username),
    [profile?.username]
  )

  const handleLogout = () => {
    clearUserInfoAndToken()
    navigate({ to: '/sign-in', replace: true })
  }

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onPointerDown = (e: PointerEvent) => {
      const el = menuRef.current
      if (!el) return
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <header className='sticky top-0 z-50 flex w-full items-center justify-between border-b border-slate-100 bg-white/80 px-6 py-3 backdrop-blur-md'>
      {/* Left: mobile menu + search */}
      <div className='flex items-center gap-3'>
        {onMenuClick ? (
          <button
            onClick={onMenuClick}
            className='rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 md:hidden'
          >
            <Menu size={20} />
          </button>
        ) : (
          <SidebarTrigger className='md:hidden' />
        )}

        <div className='relative hidden md:block'>
          <Search
            className='absolute top-1/2 left-3 -translate-y-1/2 text-slate-400'
            size={16}
          />
          <input
            type='text'
            placeholder='Search student or task...'
            className='w-60 rounded-full bg-slate-100 py-2 pr-4 pl-9 text-sm text-slate-700 transition outline-none placeholder:text-slate-400 focus:bg-slate-50 focus:ring-2 focus:ring-slate-200'
          />
        </div>
      </div>

      {/* Right: icons + divider + user */}
      <div className='flex items-center gap-1'>
        <Link
          to='/teacher-dashboard/notifications'
          className='relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100'
          aria-label='Notifications'
        >
          <Bell size={20} />
          {(unreadData?.unread_count ?? 0) > 0 && (
            <span className='absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-rose-500' />
          )}
        </Link>

        <Link
          to='/teacher-dashboard/settings'
          className='rounded-lg p-2 text-slate-500 transition hover:bg-slate-100'
          aria-label='Settings'
        >
          <Settings size={20} />
        </Link>

        <div className='mx-3 h-6 w-px bg-slate-200' />

        {/* User dropdown */}
        <div ref={menuRef} className='relative'>
          <button
            type='button'
            onClick={() => setOpen((v) => !v)}
            className='flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-slate-100'
            aria-haspopup='menu'
            aria-expanded={open}
          >
            <div className='hidden text-right md:block'>
              <p className='text-base leading-5 font-semibold text-slate-800'>
                {profile?.username ?? 'Teacher'}
              </p>
            </div>

            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt='Profile'
                className='h-11 w-11 rounded-full object-cover ring-2 ring-slate-200'
              />
            ) : (
              <div className='flex h-11 w-11 items-center justify-center rounded-full bg-slate-200 text-base font-bold text-slate-600'>
                {initials}
              </div>
            )}
          </button>

          {open && (
            <div
              role='menu'
              className='absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg'
            >
              <div className='border-b border-slate-100 px-4 py-2.5'>
                <p className='text-xs font-semibold tracking-wide text-slate-400 uppercase'>
                  Account
                </p>
              </div>
              <Link
                to='/teacher-dashboard/profile'
                onClick={() => setOpen(false)}
                className='flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50'
                role='menuitem'
              >
                <User size={15} className='text-slate-400' />
                Profile
              </Link>
              <button
                type='button'
                onClick={handleLogout}
                className='flex w-full items-center gap-2 px-4 py-2.5 text-sm text-rose-600 transition hover:bg-rose-50'
                role='menuitem'
              >
                <LogOut size={15} />
                Exit
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
