import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Users, Search, CheckCircle } from 'lucide-react'

export const Route = createFileRoute(
  '/_authenticated/teacher-dashboard/attendance'
)({
  component: AttendancePage,
})

type AttendanceStudent = {
  id: string
  name: string
  status: 'present' | 'late' | 'absent'
  time: string
  initialStatus: 'present' | 'late' | 'absent'
  confirmed: boolean
}

type Group = {
  id: string
  name: string
  students: number
}

const groups: Group[] = [
  { id: '1', name: 'Spanish Group A', students: 25 },
  { id: '2', name: 'Spanish Group B', students: 22 },
  { id: '3', name: 'French Group A', students: 20 },
]

const initialStudents: AttendanceStudent[] = [
  { id: '1', name: 'Marc Lawson', status: 'present', time: '09:02 AM', initialStatus: 'present', confirmed: false },
  { id: '2', name: 'Sarah Kim', status: 'present', time: '09:05 AM', initialStatus: 'present', confirmed: false },
  { id: '3', name: 'Javier Delgado', status: 'late', time: '09:15 AM', initialStatus: 'late', confirmed: false },
  { id: '4', name: 'Emily Chen', status: 'absent', time: '-', initialStatus: 'absent', confirmed: false },
  { id: '5', name: 'Michael Brown', status: 'present', time: '09:01 AM', initialStatus: 'present', confirmed: false },
]

function AttendancePage() {
  const [selectedGroup, setSelectedGroup] = useState<Group>(groups[0])
  const [students, setStudents] = useState<AttendanceStudent[]>(initialStudents)
  const [searchQuery, setSearchQuery] = useState('')

  const handleStatusChange = (studentId: string, newStatus: 'present' | 'late' | 'absent') => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              status: newStatus,
              confirmed: false,
              time: newStatus === 'absent' ? '-' : newStatus === 'late' ? '09:15 AM' : '09:00 AM',
            }
          : s
      )
    )
  }

  const handleConfirm = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, confirmed: true } : s))
    )
    setTimeout(() => {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === studentId
            ? { ...s, confirmed: false, initialStatus: s.status }
            : s
        )
      )
    }, 1500)
  }

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>Attendance</h1>
        <p className='mt-2 text-gray-500'>Track and manage student attendance</p>
      </div>

      <div className='mb-6 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)] md:p-6'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center md:gap-4'>
          <span className='shrink-0 text-sm font-semibold text-gray-600'>Select Group:</span>
          <div className='flex flex-wrap items-center gap-2'>
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
                  selectedGroup.id === group.id
                    ? 'bg-[#b80035] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Users size={16} />
                {group.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='rounded-2xl bg-white p-4 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)] md:p-6'>
        <div className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
          <div>
            <h2 className='text-lg font-bold text-gray-800'>{selectedGroup.name}</h2>
            <p className='text-sm text-gray-500'>{selectedGroup.students} students</p>
          </div>
          <div className='relative w-full sm:w-auto'>
            <Search className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400' size={16} />
            <input
              type='text'
              placeholder='Search students...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full rounded-lg border border-gray-200 py-2 pr-3 pl-10 text-sm focus:border-[#b80035] focus:outline-none sm:w-64'
            />
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[600px]'>
            <thead>
              <tr className='border-b border-gray-200'>
                <th className='pb-4 text-left text-sm font-semibold text-gray-600'>Student</th>
                <th className='pb-4 text-left text-sm font-semibold text-gray-600'>Status</th>
                <th className='pb-4 text-left text-sm font-semibold text-gray-600'>Time</th>
                <th className='pb-4 text-left text-sm font-semibold text-gray-600'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const isChanged = student.status !== student.initialStatus
                return (
                  <tr key={student.id} className='border-b border-gray-100 last:border-0'>
                    <td className='py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white'>
                          {student.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <span className='font-medium text-gray-800'>{student.name}</span>
                      </div>
                    </td>
                    <td className='py-4'>
                      <div className='flex items-center gap-1'>
                        {(['present', 'late', 'absent'] as const).map((status) => (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(student.id, status)}
                            className={`rounded px-2 py-1 text-xs font-semibold capitalize ${
                              student.status === status
                                ? status === 'present'
                                  ? 'bg-green-500 text-white'
                                  : status === 'late'
                                    ? 'bg-yellow-500 text-white'
                                    : 'bg-red-500 text-white'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className='py-4 text-sm text-gray-600'>{student.time}</td>
                    <td className='py-4'>
                      <button
                        onClick={() => isChanged && !student.confirmed && handleConfirm(student.id)}
                        disabled={!isChanged}
                        className={`relative flex h-8 w-24 items-center justify-center overflow-hidden rounded-md border text-sm font-semibold transition-all duration-300 ${
                          !isChanged
                            ? 'cursor-not-allowed border-gray-200 text-gray-300'
                            : student.confirmed
                              ? 'border-green-500 bg-green-50 text-green-600'
                              : 'cursor-pointer border-[#b80035] text-[#b80035] hover:bg-[#b80035]/10'
                        }`}
                      >
                        <span
                          className={`absolute flex items-center gap-1 transition-all duration-300 ${
                            student.confirmed ? '-translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
                          }`}
                        >
                          Confirm
                        </span>
                        <span
                          className={`absolute flex items-center gap-1 transition-all duration-300 ${
                            student.confirmed ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                          }`}
                        >
                          <CheckCircle size={16} className='text-green-500' />
                          <span className='text-green-600'>Done</span>
                        </span>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}