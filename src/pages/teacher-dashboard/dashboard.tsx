import { useState, useEffect } from 'react'
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  BarChart3,
  BookOpen,
  MessageSquare,
  Megaphone,
  User,
  Search,
  Bell,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight,
  Video,
  Plus,
} from 'lucide-react'

interface User {
  name: string
  email: string
  role: string
}

interface StatCardProps {
  icon: React.ReactNode
  value: string
  label: string
  badge?: React.ReactNode
}

interface HomeworkRowProps {
  name: string
  initials: string
  color: string
  level: string
  task: string
  status: string
  statusType: 'pending' | 'submitted' | 'late'
  action: string
}

interface ScheduleItemProps {
  time: string
  title: string
  detail: string
}

const Sidebar = ({
  activeNav,
  setActiveNav,
  onLogout,
}: {
  activeNav: string
  setActiveNav: (nav: string) => void
  onLogout: () => void
}) => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Groups', icon: Users },
    { name: 'Attendance', icon: ClipboardCheck },
    { name: 'Results', icon: BarChart3 },
    { name: 'Homework', icon: BookOpen },
    { name: 'Messages', icon: MessageSquare },
    { name: 'Announcements', icon: Megaphone },
    { name: 'Profile', icon: User },
  ]

  return (
    <aside className='fixed top-0 left-0 flex h-screen w-56 flex-col bg-[#f2f4f6] px-4 py-6'>
      {/* Logo */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold tracking-tight text-[#b80035]'>
          LINGUAPRO
        </h1>
        <p className='mt-1 text-xs font-medium text-gray-500'>TEACHER PORTAL</p>
      </div>

      {/* Navigation */}
      <nav className='flex-1 space-y-1'>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeNav === item.name
          return (
            <button
              key={item.name}
              onClick={() => setActiveNav(item.name)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                isActive
                  ? 'bg-white font-bold text-[#b80035] shadow-sm'
                  : 'text-gray-600 hover:bg-[#fff0f3] hover:text-[#b80035]'
              }`}
            >
              <Icon size={20} />
              <span className='text-sm'>{item.name}</span>
            </button>
          )
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={onLogout}
        className='flex items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition-all duration-200 hover:bg-[#fff0f3] hover:text-[#b80035]'
      >
        <LogOut size={20} />
        <span className='text-sm'>Logout</span>
      </button>

      {/* New Class Session Button */}
      <button className='mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#b80035] to-[#e11d48] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl'>
        <Plus size={18} />
        New Class Session
      </button>
    </aside>
  )
}

const Header = ({ user }: { user: User | null }) => {
  return (
    <header className='ml-56 flex items-center justify-between bg-white px-8 py-4 shadow-sm'>
      {/* Search Bar */}
      <div className='relative w-96'>
        <Search
          className='absolute top-1/2 left-4 -translate-y-1/2 text-gray-400'
          size={20}
        />
        <input
          type='text'
          placeholder='Search...'
          className='w-full rounded-xl bg-[#f7f9fb] py-3 pr-4 pl-12 text-sm focus:ring-2 focus:ring-[#b80035]/20 focus:outline-none'
        />
      </div>

      {/* Right Section */}
      <div className='flex items-center gap-6'>
        <button className='relative text-gray-600 transition-colors hover:text-[#b80035]'>
          <Bell size={22} />
          <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#b80035] text-xs text-white'>
            3
          </span>
        </button>
        <button className='text-gray-600 transition-colors hover:text-[#b80035]'>
          <Settings size={22} />
        </button>
        <div className='flex items-center gap-3 border-l border-gray-200 pl-6'>
          <div className='text-right'>
            <p className='text-sm font-semibold text-gray-800'>
              {user?.name || 'Elena'}
            </p>
            <p className='text-xs text-gray-500'>
              {user?.email || 'elena@linguapro.com'}
            </p>
          </div>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#b80035] to-[#e11d48] font-semibold text-white'>
            {user?.name?.charAt(0) || 'E'}
          </div>
        </div>
      </div>
    </header>
  )
}

const StatCard = ({ icon, value, label, badge }: StatCardProps) => {
  return (
    <div className='rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'>
      <div className='flex items-start justify-between'>
        <div className='rounded-xl bg-[#fff0f3] p-3 text-[#b80035]'>{icon}</div>
        {badge && <div className='flex-shrink-0'>{badge}</div>}
      </div>
      <p className='mt-4 text-3xl font-bold text-gray-800'>{value}</p>
      <p className='mt-1 text-sm text-gray-500'>{label}</p>
    </div>
  )
}

const AIInsightCard = () => {
  return (
    <div className='rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'>
      <div className='flex items-start justify-between'>
        <div className='rounded-xl bg-[#fff0f3] p-3 text-[#b80035]'>
          <Sparkles size={24} />
        </div>
        <span className='rounded-full bg-[#fff0f3] px-3 py-1 text-xs font-semibold text-[#b80035]'>
          AI INSIGHT
        </span>
      </div>
      <p className='mt-4 text-lg font-bold text-gray-800'>
        Students are struggling with past tense conjugations.
      </p>
      <p className='mt-2 text-sm text-gray-500'>
        Based on recent quiz results, 65% of your students need additional
        practice with irregular verbs.
      </p>
      <button className='mt-4 flex items-center gap-2 text-sm font-semibold text-[#b80035] transition-all hover:gap-3'>
        Generate Lesson Plan <ChevronRight size={16} />
      </button>
    </div>
  )
}

const HomeworkRow = ({
  name,
  initials,
  color,
  level,
  task,
  status,
  statusType,
  action,
}: HomeworkRowProps) => {
  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-700',
    submitted: 'bg-green-100 text-green-700',
    late: 'bg-red-100 text-red-700',
  }

  return (
    <div className='flex items-center justify-between border-b border-gray-100 py-4 last:border-0'>
      <div className='flex items-center gap-4'>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${color}`}
        >
          {initials}
        </div>
        <div>
          <p className='font-semibold text-gray-800'>{name}</p>
          <p className='text-xs text-gray-500'>
            {level} • {task}
          </p>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[statusType]}`}
        >
          {status}
        </span>
        <button className='rounded-lg px-4 py-2 text-sm font-semibold text-[#b80035] transition-colors hover:bg-[#fff0f3]'>
          {action}
        </button>
      </div>
    </div>
  )
}

const ScheduleItem = ({ time, title, detail }: ScheduleItemProps) => {
  return (
    <div className='flex gap-4 py-3'>
      <div className='w-1 rounded-full bg-[#b80035]'></div>
      <div className='flex-1'>
        <p className='text-sm font-semibold text-gray-800'>{time}</p>
        <p className='mt-1 text-base font-medium text-gray-800'>{title}</p>
        <p className='mt-1 text-sm text-gray-500'>{detail}</p>
      </div>
    </div>
  )
}

const LiveSessionCard = () => {
  return (
    <div className='rounded-2xl bg-gradient-to-br from-[#b80035] to-[#e11d48] p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'>
      <div className='mb-4 flex items-center gap-3'>
        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/20'>
          <Video size={20} className='text-white' />
        </div>
        <div>
          <p className='text-lg font-bold text-white'>Live Session</p>
          <p className='text-sm text-white/80'>Starting in 15 minutes</p>
        </div>
      </div>
      <p className='mb-4 text-sm text-white/90'>
        Intermediate Spanish - Group B
      </p>
      <button className='w-full rounded-xl bg-white py-3 font-semibold text-[#b80035] transition-colors hover:bg-white/90'>
        Open Classroom
      </button>
    </div>
  )
}

export default function TeacherDashboard() {
  const [user] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null
    const raw = sessionStorage.getItem('linguapro_user')
    if (!raw) return null
    try {
      const parsedUser = JSON.parse(raw)
      return parsedUser.role === 'teacher' ? parsedUser : null
    } catch {
      return null
    }
  })
  const [activeNav, setActiveNav] = useState('Dashboard')

  useEffect(() => {
    if (!user) {
      window.location.href = '/login'
    }
  }, [user])

  const handleLogout = () => {
    sessionStorage.clear()
    window.location.href = '/login'
  }

  if (!user) {
    return null
  }

  return (
    <div className='min-h-screen bg-[#f7f9fb]'>
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onLogout={handleLogout}
      />
      <Header user={user} />

      <main className='ml-56 p-8'>
        {/* Welcome Section */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-800'>
            Welcome back,{' '}
            <span className='text-[#b80035]'>
              {user.name?.split(' ')[0] || 'Elena'}
            </span>
            .
          </h1>
          <p className='mt-2 text-gray-500'>
            Here's what's happening with your classes today.
          </p>
        </div>

        {/* Stats Row */}
        <div className='mb-8 grid grid-cols-5 gap-4'>
          <StatCard
            icon={<Users size={24} />}
            value='12'
            label='Active Groups'
            badge={
              <span className='rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-600'>
                +2 new
              </span>
            }
          />
          <StatCard icon={<Users size={24} />} value='148' label='Students' />
          <StatCard
            icon={<ClipboardCheck size={24} />}
            value='24'
            label='Tasks Pending'
            badge={
              <span className='rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600'>
                High
              </span>
            }
          />
          <StatCard
            icon={<MessageSquare size={24} />}
            value='08'
            label='Unread Msg'
            badge={
              <span className='relative flex h-3 w-3'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75'></span>
                <span className='relative inline-flex h-3 w-3 rounded-full bg-red-500'></span>
              </span>
            }
          />
          <AIInsightCard />
        </div>

        {/* Two Column Section */}
        <div className='mb-8 grid grid-cols-5 gap-6'>
          {/* Homework Submissions - Left (60%) */}
          <div className='col-span-3 rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'>
            <div className='mb-6 flex items-center justify-between'>
              <h2 className='text-lg font-bold text-gray-800'>
                Homework Submissions
              </h2>
              <button className='text-sm font-semibold text-[#b80035] hover:underline'>
                View All
              </button>
            </div>
            <HomeworkRow
              name='Marc Lawson'
              initials='ML'
              color='bg-blue-500'
              level='Intermediate'
              task='Unit 5 Quiz'
              status='Submitted'
              statusType='submitted'
              action='Grade'
            />
            <HomeworkRow
              name='Sarah Kim'
              initials='SK'
              color='bg-purple-500'
              level='Advanced'
              task='Essay Writing'
              status='Pending'
              statusType='pending'
              action='Review'
            />
            <HomeworkRow
              name='Javier Delgado'
              initials='JD'
              color='bg-orange-500'
              level='Beginner'
              task='Vocabulary Exercise'
              status='Late'
              statusType='late'
              action='Review'
            />
          </div>

          {/* Today's Schedule - Right (40%) */}
          <div className='col-span-2 rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'>
            <div className='mb-6 flex items-center justify-between'>
              <h2 className='text-lg font-bold text-gray-800'>
                Today's Schedule
              </h2>
              <button className='text-sm font-semibold text-[#b80035] hover:underline'>
                View Full Calendar
              </button>
            </div>
            <ScheduleItem
              time='09:00 AM'
              title='Spanish Group A'
              detail='Room 201 • 25 students'
            />
            <ScheduleItem
              time='11:30 AM'
              title='Office Hours'
              detail='Virtual • By appointment'
            />
            <ScheduleItem
              time='02:00 PM'
              title='Spanish Group B'
              detail='Room 201 • 22 students'
            />
            <ScheduleItem
              time='04:00 PM'
              title='Faculty Meeting'
              detail='Conference Room B'
            />
          </div>
        </div>

        {/* Live Session Card */}
        <div className='max-w-md'>
          <LiveSessionCard />
        </div>
      </main>
    </div>
  )
}