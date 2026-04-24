import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  Bell,
  ChevronDown,
  LogOut,
  Search,
  Settings,
  User,
  Menu,
} from 'lucide-react'

type SessionUser = {
  name?: string
  email?: string
}

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
  const [sessionUser] = useState<SessionUser | null>(() => {
    const raw = sessionStorage.getItem('linguapro_user')
    if (!raw) return null
    try {
      return JSON.parse(raw) as SessionUser
    } catch {
      return null
    }
  })
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement | null>(null)

  const initials = useMemo(
    () => getInitials(sessionUser?.name),
    [sessionUser?.name]
  )

  const handleLogout = () => {
    sessionStorage.removeItem('linguapro_user')
    sessionStorage.removeItem('linguapro_access_token')
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
      if (e.target instanceof Node && !el.contains(e.target)) {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <header className='sticky top-0 z-50 flex w-full items-center justify-between bg-white/70 px-4 py-3 backdrop-blur-md md:px-8 md:py-4'>
      <div className='flex items-center gap-4 md:gap-6'>
        {onMenuClick && (
          <button onClick={onMenuClick} className='md:hidden'>
            <Menu size={24} />
          </button>
        )}
        <Link to='/teacher-dashboard' className='leading-none'>
          <div className='text-lg font-black tracking-tight text-[#b80035]'>
            LINGUAPRO
          </div>
          <div className='mt-1 hidden text-[11px] font-bold tracking-[0.28em] text-slate-400 md:block'>
            TEACHER PORTAL
          </div>
        </Link>

        <div className='group relative hidden md:block'>
          <Search
            className='absolute top-1/2 left-3 -translate-y-1/2 text-slate-400'
            size={18}
          />
          <input
            className='w-64 rounded-full bg-slate-100/70 py-2 pr-6 pl-10 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-rose-600/20'
            placeholder='Search student or task...'
            type='text'
          />
        </div>
      </div>

      <div className='flex items-center gap-4 md:gap-6'>
        <Link
          to='/teacher-dashboard/notifications'
          className='relative rounded-full p-2 hover:bg-slate-100'
          aria-label='Notifications'
        >
          <Bell className='text-slate-600' size={20} />
          <span className='absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-600'></span>
        </Link>
        <Link
          to='/teacher-dashboard/settings'
          className='rounded-full p-2 hover:bg-slate-100'
          aria-label='Settings'
        >
          <Settings className='text-slate-600' size={20} />
        </Link>
        <div className='hidden h-8 w-px bg-slate-200 md:block'></div>
        <div ref={menuRef} className='relative'>
          <button
            type='button'
            onClick={() => setOpen((v) => !v)}
            className='flex items-center gap-2 rounded-full bg-slate-50 px-2 py-2 shadow-sm ring-1 ring-slate-200 transition hover:bg-white md:gap-3 md:px-3'
            aria-haspopup='menu'
            aria-expanded={open}
          >
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-xs font-extrabold text-rose-700 md:h-10 md:w-10 md:text-sm'>
              {initials}
            </div>
            <div className='hidden min-w-0 text-left md:block'>
              <p className='truncate text-sm leading-4 font-bold text-slate-900'>
                {sessionUser?.name ?? 'Teacher'}
              </p>
              <p className='truncate text-xs text-slate-500'>
                {sessionUser?.email ?? ''}
              </p>
            </div>
            <ChevronDown
              className={
                open
                  ? 'rotate-180 text-slate-500 transition-transform duration-200'
                  : 'text-slate-500 transition-transform duration-200'
              }
              size={16}
            />
          </button>

          {open && (
            <div
              role='menu'
              className='absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_-20px_rgba(2,6,23,0.25)]'
            >
              <div className='px-4 py-3'>
                <p className='text-xs font-semibold text-slate-500'>Account</p>
              </div>
              <div className='h-px bg-slate-100' />
              <Link
                to='/teacher-dashboard/profile'
                onClick={() => setOpen(false)}
                className='flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50'
                role='menuitem'
              >
                <User size={16} className='text-slate-500' />
                Profile
              </Link>
              <button
                type='button'
                onClick={handleLogout}
                className='flex w-full items-center gap-2 px-4 py-3 text-sm font-semibold text-rose-700 hover:bg-rose-50'
                role='menuitem'
              >
                <LogOut size={16} />
                Exit
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
