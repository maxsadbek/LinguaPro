import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Users,
  Plus,
  Search,
  MoreVertical,
  ArrowLeft,
  TrendingUp,
  Calendar,
  UserCircle2,
} from 'lucide-react'
import { GroupModal } from '@/components/GroupModal'

export const Route = createFileRoute(
  '/_authenticated/teacher-dashboard/groups'
)({
  component: GroupsPage,
})

type Group = {
  id: string
  name: string
  level: string
  students: number
  color: string
}

const groups: Group[] = [
  {
    id: '1',
    name: 'Spanish Group A',
    level: 'Intermediate',
    students: 25,
    color: 'bg-blue-500',
  },
  {
    id: '2',
    name: 'Spanish Group B',
    level: 'Intermediate',
    students: 22,
    color: 'bg-purple-500',
  },
  {
    id: '3',
    name: 'Spanish Group C',
    level: 'Beginner',
    students: 18,
    color: 'bg-green-500',
  },
  {
    id: '4',
    name: 'Spanish Group D',
    level: 'Advanced',
    students: 15,
    color: 'bg-orange-500',
  },
  {
    id: '5',
    name: 'French Group A',
    level: 'Intermediate',
    students: 20,
    color: 'bg-pink-500',
  },
  {
    id: '6',
    name: 'French Group B',
    level: 'Beginner',
    students: 23,
    color: 'bg-cyan-500',
  },
]

type Student = {
  id: string
  name: string
  phone: string
  attendance: 'present' | 'late' | 'absent'
}

const students: Student[] = [
  {
    id: '1',
    name: 'Student 6-1',
    phone: '+998 90 000 00 01',
    attendance: 'present',
  },
  {
    id: '2',
    name: 'Student 6-2',
    phone: '+998 90 000 00 02',
    attendance: 'late',
  },
  {
    id: '3',
    name: 'Student 6-3',
    phone: '+998 90 000 00 03',
    attendance: 'present',
  },
]

function GroupsPage() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [studentList] = useState<Student[]>(students)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    schedule: '',
    room: '',
    students: 0,
  })

  const filteredStudents = studentList.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone.includes(searchQuery)
  )

  // Group List View
  if (!selectedGroup) {
    return (
      <div>
        <div className='mb-8 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-800'>Groups</h1>
            <p className='mt-2 text-gray-500'>
              Manage your student groups and classes
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className='flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#b80035] to-[#e11d48] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl'
          >
            <Plus size={18} />
            Create New Group
          </button>
        </div>

        {/* Search Bar */}
        <div className='mb-6'>
          <div className='relative w-96'>
            <Search
              className='absolute top-1/2 left-4 -translate-y-1/2 text-gray-400'
              size={20}
            />
            <input
              type='text'
              placeholder='Search groups...'
              className='w-full rounded-xl bg-white py-3 pr-4 pl-12 text-sm shadow-sm focus:ring-2 focus:ring-[#b80035]/20 focus:outline-none'
            />
          </div>
        </div>

        <GroupModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddGroup={() => {
            setIsModalOpen(false)
            setNewGroup({
              name: '',
              description: '',
              schedule: '',
              room: '',
              students: 0,
            })
          }}
          newGroup={newGroup}
          setNewGroup={setNewGroup}
        />

        {/* Groups Grid */}
        <div className='grid grid-cols-3 gap-6'>
          {groups.map((group) => (
            <div
              key={group.id}
              className='rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'
            >
              <div className='mb-4 flex items-start justify-between'>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${group.color}`}
                >
                  <Users size={24} className='text-white' />
                </div>
                <button className='text-gray-400 hover:text-gray-600'>
                  <MoreVertical size={20} />
                </button>
              </div>
              <h3 className='text-lg font-bold text-gray-800'>{group.name}</h3>
              <p className='text-sm text-gray-500'>{group.level}</p>
              <div className='mt-4 flex items-center gap-2 text-sm text-gray-600'>
                <Users size={16} />
                <span>{group.students} students</span>
              </div>
              <button
                className='mt-4 w-full rounded-lg border border-[#b80035] py-2 text-sm font-semibold text-[#b80035] transition-colors hover:bg-[#fff0f3]'
                onClick={() => setSelectedGroup(group)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Student Details View
  return (
    <div>
      {/* Breadcrumb */}
      <div className='mb-4 flex items-center gap-2 text-sm'>
        <span className='text-gray-500'>{selectedGroup.name}</span>
        <span className='text-gray-400'>/</span>
        <span className='font-semibold tracking-wide text-[#b80035] uppercase'>
          Group Students
        </span>
      </div>

      {/* Header */}
      <div className='mb-8 flex items-center gap-4'>
        <button
          onClick={() => setSelectedGroup(null)}
          className='flex items-center gap-2 rounded-full bg-[#b80035] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#a00030]'
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div>
          <h1 className='text-3xl font-bold text-gray-800'>
            {selectedGroup.name}
          </h1>
          <p className='mt-1 text-gray-500'>Group students and statistics</p>
        </div>
      </div>

      {/* Students List Card */}
      <div className='mb-6 rounded-2xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-lg font-bold text-gray-800'>Students List</h2>
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <Search
                className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400'
                size={16}
              />
              <input
                type='text'
                placeholder='Search...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-64 rounded-lg border border-gray-200 py-2 pr-3 pl-10 text-sm focus:border-[#b80035] focus:outline-none'
              />
            </div>
            <button className='flex items-center gap-2 rounded-lg bg-[#b80035] px-4 py-2 text-sm font-semibold text-white'>
              <Plus size={16} />
              Add Student
            </button>
          </div>
        </div>

        {/* Table */}
        <div className='overflow-hidden rounded-xl border border-gray-100'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600'>
                  Name
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600'>
                  Phone
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600'>
                  Attendance
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600'>
                  Overall Activity
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600'>
                  Grade
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {filteredStudents.map((student) => (
                <tr key={student.id} className='hover:bg-gray-50'>
                  <td className='px-4 py-3 text-sm font-medium text-gray-800'>
                    {student.name}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-600'>
                    {student.phone}
                  </td>
                  <td className='px-4 py-3'>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        student.attendance === 'present'
                          ? 'bg-green-100 text-green-700'
                          : student.attendance === 'late'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {student.attendance === 'present'
                        ? '92%'
                        : student.attendance === 'late'
                          ? '78%'
                          : '65%'}
                    </span>
                  </td>
                  <td className='px-4 py-3'>
                    <span className='text-sm font-semibold text-blue-600'>
                      {student.attendance === 'present'
                        ? '85%'
                        : student.attendance === 'late'
                          ? '72%'
                          : '45%'}
                    </span>
                  </td>
                  <td className='px-4 py-3'>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                        student.attendance === 'present'
                          ? 'bg-purple-100 text-purple-700'
                          : student.attendance === 'late'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {student.attendance === 'present'
                        ? 'A+'
                        : student.attendance === 'late'
                          ? 'B+'
                          : 'C'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Card */}
      {selectedStudent && (
        <div className='mb-6 rounded-2xl border border-blue-100 bg-blue-50/50 p-6'>
          <div className='mb-4 flex items-center justify-between'>
            <h3 className='text-lg font-bold text-gray-800'>
              {selectedStudent.name} - Activity
            </h3>
            <button
              onClick={() => setSelectedStudent(null)}
              className='rounded-full p-1 text-gray-400 hover:bg-blue-100 hover:text-gray-600'
            >
              <span className='text-lg leading-none'>×</span>
            </button>
          </div>
          <div className='grid grid-cols-3 gap-8'>
            <div className='text-center'>
              <p className='text-3xl font-bold text-blue-600'>85%</p>
              <p className='mt-1 text-sm text-gray-600'>Overall Activity</p>
            </div>
            <div className='text-center'>
              <p className='text-3xl font-bold text-green-600'>24/30</p>
              <p className='mt-1 text-sm text-gray-600'>Class Attendance</p>
            </div>
            <div className='text-center'>
              <p className='text-3xl font-bold text-purple-600'>A+</p>
              <p className='mt-1 text-sm text-gray-600'>Grade</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className='grid grid-cols-3 gap-6'>
        <div className='rounded-2xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>Average Attendance</p>
              <p className='mt-1 text-2xl font-bold text-green-600'>67%</p>
            </div>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600'>
              <TrendingUp size={24} />
            </div>
          </div>
        </div>
        <div className='rounded-2xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>Most Active Student</p>
              <p className='mt-1 text-lg font-bold text-gray-800'>Student.</p>
            </div>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600'>
              <UserCircle2 size={24} />
            </div>
          </div>
        </div>
        <div className='rounded-2xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>Total Classes</p>
              <p className='mt-1 text-2xl font-bold text-gray-800'>24/48</p>
            </div>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600'>
              <Calendar size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
