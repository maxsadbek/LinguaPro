import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Users, Plus, Search, MoreVertical } from 'lucide-react'
import { GroupDetailsModal } from '@/components/teacher/modals/GroupDetailsModal'

export const Route = createFileRoute(
  '/_authenticated/teacher-dashboard/groups'
)({
  component: GroupsPage,
})

function GroupsPage() {
  const [groupDetailsOpen, setGroupDetailsOpen] = useState(false)
  return (
    <div>
      <div className='mb-8 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800'>Groups</h1>
          <p className='mt-2 text-gray-500'>
            Manage your student groups and classes
          </p>
        </div>
        <button className='flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#b80035] to-[#e11d48] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl'>
          <Plus size={18} />
          Create New Group
        </button>
      </div>

      <GroupDetailsModal
        open={groupDetailsOpen}
        onOpenChange={setGroupDetailsOpen}
      />

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

      {/* Groups Grid */}
      <div className='grid grid-cols-3 gap-6'>
        {[
          {
            name: 'Spanish Group A',
            level: 'Intermediate',
            students: 25,
            color: 'bg-blue-500',
          },
          {
            name: 'Spanish Group B',
            level: 'Intermediate',
            students: 22,
            color: 'bg-purple-500',
          },
          {
            name: 'Spanish Group C',
            level: 'Beginner',
            students: 18,
            color: 'bg-green-500',
          },
          {
            name: 'Spanish Group D',
            level: 'Advanced',
            students: 15,
            color: 'bg-orange-500',
          },
          {
            name: 'French Group A',
            level: 'Intermediate',
            students: 20,
            color: 'bg-pink-500',
          },
          {
            name: 'French Group B',
            level: 'Beginner',
            students: 23,
            color: 'bg-cyan-500',
          },
        ].map((group, index) => (
          <div
            key={index}
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
              onClick={() => setGroupDetailsOpen(true)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
