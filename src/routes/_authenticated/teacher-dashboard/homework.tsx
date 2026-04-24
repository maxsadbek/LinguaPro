import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { BookOpen, Plus, Filter, Download } from 'lucide-react'
import { AssignTaskModal } from '@/components/teacher/modals/AssignTaskModal'
import { GroupDetailsModal } from '@/components/teacher/modals/GroupDetailsModal'

export const Route = createFileRoute(
  '/_authenticated/teacher-dashboard/homework'
)({
  component: HomeworkPage,
})

function HomeworkPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [groupDetailsOpen, setGroupDetailsOpen] = useState(false)

  return (
    <div>
      <div className='mb-8 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800'>Homework</h1>
          <p className='mt-2 text-gray-500'>
            Create and manage homework assignments
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className='flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#b80035] to-[#e11d48] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl'
        >
          <Plus size={18} />
          Yangi vazifa
        </button>
      </div>

      <AssignTaskModal open={modalOpen} onOpenChange={setModalOpen} />
      <GroupDetailsModal
        open={groupDetailsOpen}
        onOpenChange={setGroupDetailsOpen}
      />

      {/* Filters */}
      <div className='mb-6 flex items-center gap-4'>
        <button className='flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50'>
          <Filter size={16} />
          Filter
        </button>
        <button className='rounded-lg bg-[#fff0f3] px-4 py-2 text-sm font-semibold text-[#b80035]'>
          Barchasi
        </button>
        <button className='rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100'>
          Faol
        </button>
        <button className='rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100'>
          Tugatilgan
        </button>
        <button className='ml-auto flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50'>
          <Download size={16} />
          Eksport
        </button>
      </div>

      {/* Homework Cards */}
      <div className='grid grid-cols-2 gap-6'>
        {[
          {
            title: 'Unit 5 Quiz',
            group: 'IELTS 7.5 Morning',
            due: '22-Aprel, 2026',
            submitted: 22,
            total: 25,
            status: 'active',
          },
          {
            title: 'Essay Writing',
            group: 'General English B2',
            due: '25-Aprel, 2026',
            submitted: 15,
            total: 22,
            status: 'active',
          },
          {
            title: 'Vocabulary Exercise',
            group: 'Kids Starter',
            due: '18-Aprel, 2026',
            submitted: 18,
            total: 18,
            status: 'completed',
          },
          {
            title: 'Grammar Practice',
            group: 'IELTS Intensive',
            due: '23-Aprel, 2026',
            submitted: 8,
            total: 20,
            status: 'active',
          },
        ].map((hw, index) => (
          <div
            key={index}
            className='rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'
          >
            <div className='mb-4 flex items-start justify-between'>
              <div className='rounded-xl bg-[#fff0f3] p-3 text-[#b80035]'>
                <BookOpen size={24} />
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  hw.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {hw.status === 'active' ? 'Faol' : 'Tugatilgan'}
              </span>
            </div>
            <h3 className='text-lg font-bold text-gray-800'>{hw.title}</h3>
            <p className='text-sm text-gray-500'>{hw.group}</p>
            <div className='mt-4 flex items-center justify-between text-sm text-gray-600'>
              <span>Muddat: {hw.due}</span>
              <span>
                {hw.submitted}/{hw.total} topshirildi
              </span>
            </div>
            <div className='mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-200'>
              <div
                className='h-full bg-[#b80035]'
                style={{ width: `${(hw.submitted / hw.total) * 100}%` }}
              />
            </div>
            <button
              className='mt-4 w-full rounded-lg border border-[#b80035] py-2 text-sm font-semibold text-[#b80035] transition-colors hover:bg-[#fff0f3]'
              onClick={() => setGroupDetailsOpen(true)}
            >
              Batafsil
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
