import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  BookOpen,
  Plus,
  Download,
  ChevronDown,
  PencilLine,
  Trash2,
  Eye,
  Check,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  useDeleteAssignment,
  useGetAssignments,
} from '@/hooks/useAssignments'
import { RoseButton } from '@/components/ui/rose-button'
import { AssignTaskModal } from '@/components/teacher/modals/AssignTaskModal'
import { GroupDetailsModal } from '@/components/teacher/modals/GroupDetailsModal'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Assignment } from '@/types/assignment.types'

export const Route = createFileRoute(
  '/_authenticated/teacher-dashboard/homework'
)({
  component: HomeworkPage,
})

function HomeworkPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null)
  const [groupDetailsOpen, setGroupDetailsOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const { data: assignments, isLoading } = useGetAssignments()
  const deleteMutation = useDeleteAssignment()

  const formatDate = (value: string) => {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleDateString('uz-UZ', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  const getStatus = (item: Assignment): 'active' | 'completed' => {
    return new Date(item.deadline).getTime() >= Date.now() ? 'active' : 'completed'
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id)
      toast.success("Topshiriq o'chirildi")
    } catch {
      toast.error("Topshiriqni o'chirishda xatolik yuz berdi")
    }
  }

  const handleEdit = (item: Assignment) => {
    setEditingAssignment(item)
    setModalOpen(true)
  }

  const filteredAssignments = (assignments ?? []).filter((hw) => {
    const status = getStatus(hw)
    if (filter === 'active') return status === 'active'
    if (filter === 'completed') return status === 'completed'
    return true
  })

  return (
    <div>
      <div className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center md:mb-8'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800 md:text-3xl'>
            Homework
          </h1>
          <p className='mt-1 text-sm text-gray-500 md:mt-2 md:text-base'>
            Create and manage homework assignments
          </p>
        </div>
        <RoseButton
          onClick={() => setModalOpen(true)}
          className='flex w-full items-center justify-center gap-2 sm:w-auto'
        >
          <Plus size={18} />
          Yangi vazifa
        </RoseButton>
      </div>

      <AssignTaskModal
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open)
          if (!open) {
            setEditingAssignment(null)
          }
        }}
        editingAssignment={editingAssignment}
      />
      <GroupDetailsModal
        open={groupDetailsOpen}
        onOpenChange={setGroupDetailsOpen}
      />

      {/* Filters */}
      <div className='mb-6 flex flex-wrap items-center gap-2 md:gap-4'>
        <button
          onClick={() => setFilter('all')}
          className={`rounded-lg px-4 py-2 text-sm font-semibold ${
            filter === 'all'
              ? 'bg-[#fff0f3] text-[#b80035]'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Barchasi
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`rounded-lg px-4 py-2 text-sm font-semibold ${
            filter === 'active'
              ? 'bg-[#fff0f3] text-[#b80035]'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Faol
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`rounded-lg px-4 py-2 text-sm font-semibold ${
            filter === 'completed'
              ? 'bg-[#fff0f3] text-[#b80035]'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Tugatilgan
        </button>
        <button className='mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 sm:mt-0 sm:ml-auto sm:w-auto'>
          <Download size={16} />
          Eksport
        </button>
      </div>

      {/* Homework Cards */}
      <div className='grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2'>
        {isLoading ? (
          <div className='rounded-2xl bg-white p-6 text-sm text-gray-500 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'>
            Topshiriqlar yuklanmoqda...
          </div>
        ) : filteredAssignments.length === 0 ? (
          <div className='rounded-2xl bg-white p-6 text-sm text-gray-500 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'>
            Hozircha topshiriqlar mavjud emas.
          </div>
        ) : (
          filteredAssignments.map((hw) => {
            const status = getStatus(hw)
            return (
            <div
              key={hw.id}
              className='rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'
            >
              <div className='mb-4 flex items-start justify-between'>
                <div className='rounded-xl bg-[#fff0f3] p-3 text-[#b80035]'>
                  <BookOpen size={24} />
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {status === 'active' ? 'Faol' : 'Tugatilgan'}
                </span>
              </div>
              <h3 className='text-lg font-bold text-gray-800'>{hw.title}</h3>
              <p className='mt-1 text-sm text-gray-500'>Guruh ID: {hw.group}</p>
              <div className='mt-4 grid grid-cols-2 gap-2 text-sm'>
                <div className='rounded-xl bg-gray-50 px-3 py-2 text-gray-600'>
                  <p className='text-[11px] font-semibold tracking-wide text-gray-400 uppercase'>
                    Muddat
                  </p>
                  <p className='mt-1 font-medium text-gray-700'>
                    {formatDate(hw.deadline)}
                  </p>
                </div>
                <div className='rounded-xl bg-gray-50 px-3 py-2 text-gray-600'>
                  <p className='text-[11px] font-semibold tracking-wide text-gray-400 uppercase'>
                    Maks ball
                  </p>
                  <p className='mt-1 font-medium text-gray-700'>
                  Maks ball: {hw.max_score}
                  </p>
                </div>
              </div>
              <div className='mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-200'>
                <div
                  className='h-full bg-[#b80035]'
                  style={{
                    width:
                      status === 'active'
                        ? `${Math.min(
                            Math.max(
                              ((new Date(hw.deadline).getTime() - Date.now()) /
                                (7 * 24 * 60 * 60 * 1000)) *
                                100,
                              10
                            ),
                            100
                          )}%`
                        : '100%',
                  }}
                />
              </div>
              <div className='mt-5 flex flex-wrap items-center gap-2'>
                <RoseButton
                  roseVariant='outline'
                  className='h-10 rounded-xl border-gray-300 px-3 text-gray-700 hover:bg-gray-50'
                  onClick={() => handleEdit(hw)}
                >
                  <PencilLine size={16} />
                  Tahrirlash
                </RoseButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <RoseButton
                      roseVariant='outline'
                      className='h-10 rounded-xl border-red-200 px-3 text-red-600 hover:bg-red-50'
                    >
                      <Trash2 size={16} />
                      O&apos;chirish
                      <ChevronDown size={15} />
                    </RoseButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='start' className='w-52 rounded-xl p-1'>
                    <DropdownMenuItem
                      variant='destructive'
                      className='rounded-lg'
                      onClick={() => handleDelete(hw.id)}
                    >
                      <Check size={16} />
                      O&apos;chirishni tasdiqlash
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <RoseButton
                  roseVariant='outline'
                  className='h-10 rounded-xl border-gray-300 px-3 text-gray-700 hover:bg-gray-50'
                  onClick={() =>
                    hw.attachment
                      ? window.open(hw.attachment, '_blank')
                      : setGroupDetailsOpen(true)
                  }
                >
                  <Eye size={16} />
                  Batafsil
                </RoseButton>
              </div>
            </div>
          )})
        )}
      </div>
    </div>
  )
}
