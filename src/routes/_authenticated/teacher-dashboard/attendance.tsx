import { useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Calendar, Check, ChevronDown, Loader2, Search } from 'lucide-react'
import { toast } from 'sonner'
import type { AttendanceStatus } from '@/api/service/teacher/attendance.type'
import { useAttendanceList } from '@/hooks/teacher/attendance/useAttendanceList'
import { useAttendanceStats } from '@/hooks/teacher/attendance/useAttendanceStats'
import { useCreateAttendance } from '@/hooks/teacher/attendance/useCreateAttendance'
import { useUpdateAttendance } from '@/hooks/teacher/attendance/useUpdateAttendance'
import { Calendar as CalendarPicker } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RoseButton } from '@/components/ui/rose-button'

export const Route = createFileRoute(
  '/_authenticated/teacher-dashboard/attendance'
)({
  component: AttendancePage,
})

type AttendanceStudent = {
  attendanceId?: number
  studentId: number
  name: string
  status: AttendanceStatus
  note: string
}

type GroupOption = {
  id: number
  name: string
  students: number
}

function formatDate(value: Date) {
  const mm = String(value.getMonth() + 1).padStart(2, '0')
  const dd = String(value.getDate()).padStart(2, '0')
  return `${mm}/${dd}/${value.getFullYear()}`
}

function toISODate(value: Date) {
  const mm = String(value.getMonth() + 1).padStart(2, '0')
  const dd = String(value.getDate()).padStart(2, '0')
  return `${value.getFullYear()}-${mm}-${dd}`
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function AttendancePage() {
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0)
  const [groupOpen, setGroupOpen] = useState(false)
  const [date, setDate] = useState<Date>(() => new Date())
  const [searchQuery, setSearchQuery] = useState('')
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>(
    'idle'
  )

  const isoDate = useMemo(() => toISODate(date), [date])
  const attendanceListQuery = useAttendanceList()
  const createAttendanceMutation = useCreateAttendance()
  const updateAttendanceMutation = useUpdateAttendance()

  const groups = useMemo<GroupOption[]>(() => {
    const list = attendanceListQuery.data ?? []
    const map = new Map<
      number,
      { id: number; name: string; students: Set<number> }
    >()
    for (const item of list) {
      const existing = map.get(item.group)
      if (existing) existing.students.add(item.student)
      else
        map.set(item.group, {
          id: item.group,
          name: item.group_name,
          students: new Set([item.student]),
        })
    }
    return Array.from(map.values()).map((g) => ({
      id: g.id,
      name: g.name,
      students: g.students.size,
    }))
  }, [attendanceListQuery.data])

  const groupId = selectedGroupId || groups[0]?.id || 0
  const selectedGroupName =
    groups.find((g) => g.id === groupId)?.name ?? 'Select group'

  const statsQuery = useAttendanceStats(groupId)
  const stats = statsQuery.data

  const [students, setStudents] = useState<AttendanceStudent[]>([])

  useMemo(() => {
    const list = attendanceListQuery.data ?? []
    setStudents(
      list
        .filter((item) => item.group === groupId && item.date === isoDate)
        .map((item) => ({
          attendanceId: item.id,
          studentId: item.student,
          name: item.student_name,
          status: item.status,
          note: item.note,
        }))
    )
  }, [attendanceListQuery.data, groupId, isoDate])

  const filteredStudents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return q
      ? students.filter((s) => s.name.toLowerCase().includes(q))
      : students
  }, [searchQuery, students])

  const setStudentStatus = (studentId: number, status: AttendanceStatus) =>
    setStudents((prev) =>
      prev.map((s) => (s.studentId === studentId ? { ...s, status } : s))
    )

  const setStudentNote = (studentId: number, note: string) =>
    setStudents((prev) =>
      prev.map((s) => (s.studentId === studentId ? { ...s, note } : s))
    )

  const queryClient = useQueryClient()

  const handleSave = async () => {
    if (saveState === 'saving' || !groupId) return
    setSaveState('saving')
    await toast.promise(
      Promise.all(
        students.map((s) => {
          const data = {
            student: s.studentId,
            group: groupId,
            date: isoDate,
            status: s.status,
            note: s.note || undefined,
          }
          return s.attendanceId
            ? updateAttendanceMutation.mutateAsync({ id: s.attendanceId, data })
            : createAttendanceMutation.mutateAsync(data)
        })
      ),
      { loading: 'Saving...', success: 'Saved', error: 'Error' }
    )
    await queryClient.invalidateQueries({
      queryKey: ['attendance', 'stats', groupId],
    })
    setSaveState('saved')
    window.setTimeout(() => setSaveState('idle'), 1300)
  }

  // Circular Stats Logic
  const overall = stats?.present_pct ?? 0
  const radius = 45
  const stroke = 9
  const circumference = 2 * Math.PI * radius
  const offset =
    circumference - (Math.max(0, Math.min(100, overall)) / 100) * circumference

  return (
    <div className='mx-auto max-w-7xl space-y-4 p-4 text-slate-900'>
      {/* Top Bar */}
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold'>Attendance</h1>
          <p className='text-sm text-slate-500'>
            Manage student presence and notes
          </p>
        </div>
        <div className='relative w-full sm:w-64'>
          <Search
            className='absolute top-1/2 left-3 -translate-y-1/2 text-slate-400'
            size={16}
          />
          <input
            type='text'
            placeholder='Search student...'
            className='h-10 w-full rounded-lg border-none bg-slate-100 pr-4 pl-9 text-base transition-all focus:ring-1 focus:ring-rose-500'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Quick Stats Panel */}
      <div className='grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-12'>
        <div className='flex items-center justify-center border-r border-slate-100 pr-4 md:col-span-3'>
          <div className='relative flex items-center justify-center'>
            <svg width='110' height='110' className='-rotate-90'>
              <circle
                cx='55'
                cy='55'
                r={radius}
                fill='none'
                stroke='#f1f5f9'
                strokeWidth={stroke}
              />
              <circle
                cx='55'
                cy='55'
                r={radius}
                fill='none'
                stroke='#e11d48'
                strokeWidth={stroke}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap='round'
                className='transition-all duration-700 ease-out'
              />
            </svg>
            <div className='absolute flex flex-col items-center'>
              <span className='text-2xl font-bold'>{overall}%</span>
              <span className='text-xs font-bold tracking-tighter text-slate-400 uppercase'>
                Present
              </span>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 items-center gap-4 pl-2 md:col-span-9 lg:grid-cols-4'>
          {[
            {
              label: 'Present',
              val: stats?.present,
              color: 'text-emerald-600',
            },
            { label: 'Absent', val: stats?.absent, color: 'text-rose-600' },
            { label: 'Late', val: stats?.late, color: 'text-amber-600' },
            { label: 'Total', val: stats?.total, color: 'text-slate-600' },
          ].map((s) => (
            <div key={s.label}>
              <p className='text-xs font-bold tracking-widest text-slate-400 uppercase'>
                {s.label}
              </p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.val ?? 0}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Control Panel */}
      <div className='flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-3'>
        <div className='min-w-[200px] flex-1'>
          <label className='mb-1 block text-xs font-bold text-slate-400 uppercase'>
            Group
          </label>
          <div className='relative'>
            <button
              onClick={() => setGroupOpen(!groupOpen)}
              className='flex h-10 w-full items-center justify-between rounded-lg border border-slate-200 px-3 text-base transition-colors hover:bg-slate-50'
            >
              <span className='truncate'>{selectedGroupName}</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${groupOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {groupOpen && (
              <div className='absolute top-full left-0 z-20 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-xl'>
                {groups.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      setSelectedGroupId(g.id)
                      setGroupOpen(false)
                    }}
                    className='flex w-full justify-between px-3 py-2 text-left text-base hover:bg-slate-50'
                  >
                    <span>{g.name}</span>
                    <span className='text-sm text-slate-400'>{g.students}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='min-w-[200px] flex-1'>
          <label className='mb-1 block text-xs font-bold text-slate-400 uppercase'>
            Session Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <button className='flex h-10 w-full items-center justify-between rounded-lg border border-slate-200 px-3 text-base hover:bg-slate-50'>
                <span className='flex items-center gap-2'>
                  <Calendar size={16} /> {formatDate(date)}
                </span>
                <ChevronDown size={16} />
              </button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <CalendarPicker
                mode='single'
                selected={date}
                onSelect={(d) => d && setDate(d)}
              />
            </PopoverContent>
          </Popover>
        </div>

        <RoseButton
          onClick={handleSave}
          roseVariant='solid'
          className='h-10 px-6 text-base font-medium'
        >
          {saveState === 'saving' ? (
            <Loader2 size={18} className='animate-spin' />
          ) : saveState === 'saved' ? (
            <Check size={18} />
          ) : (
            'Update List'
          )}
        </RoseButton>
      </div>

      {/* Table Section */}
      <div className='overflow-hidden rounded-xl border border-slate-200 bg-white'>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse text-left text-sm'>
            <thead className='border-b border-slate-200 bg-slate-50'>
              <tr>
                <th className='w-12 px-4 py-3 text-xs font-bold text-slate-500 uppercase'>
                  #
                </th>
                <th className='px-4 py-3 text-xs font-bold text-slate-500 uppercase'>
                  Student Name
                </th>
                <th className='px-4 py-3 text-xs font-bold text-slate-500 uppercase'>
                  Attendance
                </th>
                <th className='px-4 py-3 text-xs font-bold text-slate-500 uppercase'>
                  Note
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100'>
              {filteredStudents.map((s, idx) => (
                <tr
                  key={s.studentId}
                  className='transition-colors hover:bg-slate-50/50'
                >
                  <td className='px-4 py-3 font-medium text-slate-400'>
                    {idx + 1}
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-700'>
                        {getInitials(s.name)}
                      </div>
                      <span className='text-base font-semibold text-slate-800'>
                        {s.name}
                      </span>
                    </div>
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex gap-1'>
                      {(
                        ['present', 'absent', 'late'] as AttendanceStatus[]
                      ).map((st) => (
                        <button
                          key={st}
                          onClick={() => setStudentStatus(s.studentId, st)}
                          className={`rounded px-3 py-1.5 text-xs font-bold uppercase transition-all ${
                            s.status === st
                              ? st === 'present'
                                ? 'bg-emerald-500 text-white'
                                : st === 'absent'
                                  ? 'bg-rose-500 text-white'
                                  : 'bg-slate-800 text-white'
                              : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className='px-4 py-3'>
                    <input
                      type='text'
                      value={s.note}
                      placeholder='Add note...'
                      onChange={(e) =>
                        setStudentNote(s.studentId, e.target.value)
                      }
                      disabled={s.status !== 'late'}
                      className='h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 text-sm outline-none focus:ring-1 focus:ring-rose-500 disabled:opacity-30'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
