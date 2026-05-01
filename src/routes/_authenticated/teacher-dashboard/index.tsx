import { createFileRoute } from '@tanstack/react-router'
import { Users, ClipboardCheck, MessageSquare } from 'lucide-react'
import { useTeacherGroups } from '@/hooks/teacher/groups/useTeacherGroups'
import { useProfile } from '@/hooks/teacher/profile/useProfile'
import { useUnreadCount } from '@/features/notifications/hooks'

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
    <div className='flex flex-col items-start justify-between gap-3 border-b border-gray-100 py-4 last:border-0 sm:flex-row sm:items-center sm:gap-4'>
      <div className='flex w-full items-center gap-4 sm:w-auto'>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${color}`}
        >
          {initials}
        </div>
        <div className='min-w-0 flex-1'>
          <p className='truncate font-semibold text-gray-800'>{name}</p>
          <p className='truncate text-xs text-gray-500'>
            {level} • {task}
          </p>
        </div>
      </div>
      <div className='flex w-full items-center justify-between gap-4 pl-14 sm:w-auto sm:justify-end sm:pl-0'>
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

export const Route = createFileRoute('/_authenticated/teacher-dashboard/')({
  component: DashboardPage,
})

function DashboardPage() {
  const { data: groups = [], isLoading: isLoadingGroups } = useTeacherGroups()
  const { data: unreadData, isLoading: isLoadingUnread } = useUnreadCount()
  const { data: profile } = useProfile()

  const activeGroupsCount = groups.filter(
    (group) => group.status === 'active'
  ).length
  const teacherStudentsCount = new Set(
    groups.flatMap((group) => group.students.map((student) => student.student))
  ).size
  const unreadCount = unreadData?.unread_count ?? 0

  return (
    <>
      {/* Welcome Section */}
      <div className='mb-6 md:mb-8'>
        <h1 className='text-2xl font-bold text-gray-800 md:text-3xl'>
          Welcome back,{' '}
          <span className='text-[#b80035]'>
            {profile?.username || 'teacher'}
          </span>
          .
        </h1>
        <p className='mt-2 text-gray-500'>
          Here's what's happening with your classes today.
        </p>
      </div>

      {/* Stats Row */}
      <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mb-8 md:gap-5 lg:grid-cols-4'>
        <StatCard
          icon={<Users size={24} />}
          value={isLoadingGroups ? '...' : String(activeGroupsCount)}
          label='Active Groups'
        />
        <StatCard
          icon={<Users size={24} />}
          value={isLoadingGroups ? '...' : String(teacherStudentsCount)}
          label='Students'
        />
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
          value={isLoadingUnread ? '...' : String(unreadCount)}
          label='Unread Msg'
          badge={
            unreadCount > 0 ? (
              <span className='relative flex h-3 w-3'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75'></span>
                <span className='relative inline-flex h-3 w-3 rounded-full bg-red-500'></span>
              </span>
            ) : undefined
          }
        />
      </div>

      {/* Two Column Section */}
      <div className='mb-6 grid grid-cols-1 gap-6 md:mb-8 lg:grid-cols-5'>
        {/* Homework Submissions - Left (60%) */}
        <div className='col-span-1 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)] md:p-6 lg:col-span-3'>
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
        <div className='col-span-1 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)] md:p-6 lg:col-span-2'>
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
    </>
  )
}
