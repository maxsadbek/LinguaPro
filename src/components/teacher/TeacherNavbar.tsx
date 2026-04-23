import { useEffect, useMemo, useState } from 'react'
import { Bell, Search, Settings } from 'lucide-react'

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

export function TeacherNavbar() {
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('linguapro_user')
    if (!raw) {
      setSessionUser(null)
      return
    }

    try {
      setSessionUser(JSON.parse(raw) as SessionUser)
    } catch {
      setSessionUser(null)
    }
  }, [])

  const initials = useMemo(() => getInitials(sessionUser?.name), [sessionUser?.name])

  return (
    <header className='sticky top-0 z-50 flex w-full items-center justify-between bg-white/70 px-8 py-4 backdrop-blur-md'>
      <div className='group relative'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' size={18} />
        <input
          className='w-64 rounded-full bg-slate-100/70 py-2 pl-10 pr-6 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-rose-600/20'
          placeholder='Search student or task...'
          type='text'
        />
      </div>

      <div className='flex items-center gap-6'>
        <button className='relative rounded-full p-2 hover:bg-slate-100'>
          <Bell className='text-slate-600' size={20} />
          <span className='absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-600'></span>
        </button>
        <button className='rounded-full p-2 hover:bg-slate-100'>
          <Settings className='text-slate-600' size={20} />
        </button>
        <div className='h-8 w-[1px] bg-slate-200'></div>
        <div className='flex items-center gap-3'>
          <div className='text-right'>
            <p className='text-xs font-bold text-slate-900'>{sessionUser?.name ?? 'Teacher'}</p>
            <p className='text-[10px] text-slate-500'>{sessionUser?.email ?? ''}</p>
          </div>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700'>
            {initials}
          </div>
        </div>
      </div>
    </header>
  )
}
