import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { BookOpen, Plus, Download } from 'lucide-react'
import { toast } from 'sonner'
import {
  useDeleteAssignment,
  useGetAssignments,
  useGradeAssignment,
  useUpdateAssignment,
} from '@/hooks/useAssignments'
import { RoseButton } from '@/components/ui/rose-button'
import { AssignTaskModal } from '@/components/teacher/modals/AssignTaskModal'
import { GroupDetailsModal } from '@/components/teacher/modals/GroupDetailsModal'
import type { Assignment } from '@/types/assignment.types'

export const Route = createFileRoute(
  '/_authenticated/teacher-dashboard/homework'
)({
  component: HomeworkPage,
})

function HomeworkPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [groupDetailsOpen, setGroupDetailsOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const { data: assignments, isLoading } = useGetAssignments()
  const deleteMutation = useDeleteAssignment()
  const updateMutation = useUpdateAssignment()
  const gradeMutation = useGradeAssignment()

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
    if (!window.confirm("Topshiriqni o'chirishni tasdiqlaysizmi?")) return
    try {
      await deleteMutation.mutateAsync(id)
      toast.success("Topshiriq o'chirildi")
    } catch {
      toast.error("Topshiriqni o'chirishda xatolik yuz berdi")
    }
  }

  const handleQuickEdit = async (item: Assignment) => {
    const title = window.prompt('Yangi vazifa nomi', item.title)
    if (!title) return
    try {
      await updateMutation.mutateAsync({
        id: item.id,
        payload: {
          title,
          description: item.description,
          group: item.group,
          deadline: item.deadline,
          max_score: item.max_score,
          attachment: item.attachment,
          submission_type: item.submission_type,
        },
      })
      toast.success('Vazifa yangilandi')
    } catch {
      toast.error('Vazifani yangilashda xatolik yuz berdi')
    }
  }

  const handleGrade = async (item: Assignment) => {
    const raw = window.prompt(`Ball kiriting (0 - ${item.max_score})`, '0')
    if (raw === null) return
    const score = Number(raw)
    if (Number.isNaN(score) || score < 0 || score > item.max_score) {
      toast.error('Kiritilgan ball noto‘g‘ri')
      return
    }
    try {
      await gradeMutation.mutateAsync({ id: item.id, payload: { score } })
      toast.success("Baholash muvaffaqiyatli bajarildi")
    } catch {
      toast.error("Baholashda xatolik yuz berdi")
    }
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

      <AssignTaskModal open={modalOpen} onOpenChange={setModalOpen} />
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
              <p className='text-sm text-gray-500'>Guruh ID: {hw.group}</p>
              <div className='mt-4 flex items-center justify-between text-sm text-gray-600'>
                <span>Muddat: {formatDate(hw.deadline)}</span>
                <span>
                  Maks ball: {hw.max_score}
                </span>
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
              <div className='mt-4 grid grid-cols-2 gap-2'>
                <RoseButton roseVariant='outline' onClick={() => handleQuickEdit(hw)}>
                  Tahrirlash
                </RoseButton>
                <RoseButton roseVariant='outline' onClick={() => handleGrade(hw)}>
                  Baholash
                </RoseButton>
                <RoseButton roseVariant='outline' onClick={() => handleDelete(hw.id)}>
                  O&apos;chirish
                </RoseButton>
                <RoseButton
                  roseVariant='outline'
                  onClick={() =>
                    hw.attachment
                      ? window.open(hw.attachment, '_blank')
                      : setGroupDetailsOpen(true)
                  }
                >
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
