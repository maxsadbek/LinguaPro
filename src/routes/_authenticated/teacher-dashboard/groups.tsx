import { useEffect, useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Users,
  Plus,
  Search,
  MoreVertical,
  Loader2,
  Trash2,
  User,
  ArrowLeft,
} from 'lucide-react'
import { toast } from 'sonner'
import type { Group } from '@/api/service/teacher/group.type'
import { useAddStudentToGroup } from '@/hooks/teacher/groups/useAddStudentToGroup'
import { useRemoveStudentFromGroup } from '@/hooks/teacher/groups/useRemoveStudentFromGroup'
import { useTeacherGroups } from '@/hooks/teacher/groups/useTeacherGroups'
import { useProfile } from '@/hooks/teacher/profile/useProfile'
import { useStudents } from '@/hooks/teacher/students/useStudents'
import { Input } from '@/components/ui/input'
import { RoseButton } from '@/components/ui/rose-button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const Route = createFileRoute(
  '/_authenticated/teacher-dashboard/groups'
)({
  component: GroupsPage,
})

function GroupsPage() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStudentUsername, setSelectedStudentUsername] = useState('')

  // API Hooks
  const { data: profile } = useProfile()
  const {
    data: groups = [],
    isLoading: isLoadingGroups,
    isError: isErrorGroups,
  } = useTeacherGroups()
  const {
    data: allStudents = [],
    isLoading: isLoadingStudents,
    isError: isErrorStudents,
  } = useStudents()

  const addStudentMutation = useAddStudentToGroup(selectedGroup?.id ?? 0)
  const removeStudentMutation = useRemoveStudentFromGroup(
    selectedGroup?.id ?? 0
  )

  // Memoized Data - Filter groups by teacher ID
  const filteredGroups = useMemo(() => {
    const teacherId = profile?.id
    const q = searchQuery.trim().toLowerCase()

    let result = groups
    // Only show groups where teacher matches current user
    if (teacherId) {
      result = result.filter((g) => g.teacher === teacherId)
    }
    // Apply search filter
    if (q) {
      result = result.filter((g) => g.name.toLowerCase().includes(q))
    }
    return result
  }, [groups, searchQuery, profile?.id])

  useEffect(() => {
    if (!selectedGroup) return

    const freshGroup = filteredGroups.find((group) => group.id === selectedGroup.id)
    if (!freshGroup) {
      setSelectedGroup(null)
      setSelectedStudentUsername('')
      return
    }

    if (freshGroup !== selectedGroup) {
      setSelectedGroup(freshGroup)
    }
  }, [filteredGroups, selectedGroup])

  const availableStudents = useMemo(() => {
    const currentStudentIds = new Set(
      selectedGroup?.students.map((s) => s.student) || []
    )
    return allStudents.filter((s) => !currentStudentIds.has(s.id))
  }, [selectedGroup?.students, allStudents])

  // Handlers
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault()
    const username = selectedStudentUsername.trim()
    if (!username) return

    toast.promise(addStudentMutation.mutateAsync({ username }), {
      loading: 'Adding student...',
      success: (res) => res.detail || 'Student added successfully',
      error: 'Failed to add student',
    })
    setSelectedStudentUsername('')
  }

  const handleRemoveStudent = (studentId: number) => {
    toast.promise(removeStudentMutation.mutateAsync(studentId), {
      loading: 'Removing student...',
      success: (res) => res.detail || 'Student removed successfully',
      error: 'Failed to remove student',
    })
  }

  // --- RENDER: GROUP LIST VIEW ---
  if (!selectedGroup) {
    return (
      <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8'>
        {/* Header */}
        <div className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center md:mb-8'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight text-gray-900 md:text-3xl'>
              Groups
            </h1>
            <p className='mt-1 text-sm text-gray-500 md:text-base'>
              Faqat sizga biriktirilgan guruhlar ko'rsatiladi
            </p>
          </div>
        </div>

        {/* Search */}
        <div className='relative mb-6 w-full sm:w-[350px] md:w-[400px] lg:mb-8'>
          <Search
            className='absolute top-1/2 left-4 -translate-y-1/2 text-gray-400'
            size={20}
          />
          <Input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search groups by name...'
            className='h-12 w-full rounded-xl border-gray-200 bg-white pl-12 shadow-sm focus:border-rose-500 focus:ring-rose-500'
          />
        </div>

        {/* Groups Grid */}
        {isLoadingGroups ? (
          <div className='flex h-64 items-center justify-center text-rose-500'>
            <Loader2 className='animate-spin' size={32} />
          </div>
        ) : isErrorGroups ? (
          <div className='rounded-xl border border-rose-200 bg-rose-50 p-4 text-center text-sm text-rose-700'>
            Failed to load groups. Please try again later.
          </div>
        ) : filteredGroups.length === 0 ? (
          <div className='flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-20 text-center'>
            <div className='mb-4 rounded-full bg-white p-4 text-slate-400 shadow-sm'>
              <Users size={40} />
            </div>
            <h3 className='text-lg font-semibold text-gray-900'>
              No groups found
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Sizga tegishli guruh topilmadi
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3'>
            {filteredGroups.map((group) => (
              <div
                key={group.id}
                className='group flex min-h-[270px] flex-col justify-between rounded-[28px] border border-slate-100 bg-white p-5 shadow-[0_20px_45px_-20px_rgba(15,23,42,0.28)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(15,23,42,0.35)] sm:min-h-[300px] sm:p-6'
              >
                <div>
                  <div className='mb-6 flex items-start justify-between'>
                    <div className='flex items-center gap-3 sm:gap-4'>
                      <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg shadow-rose-200/70 sm:h-14 sm:w-14'>
                        <Users size={22} className='text-white sm:h-6 sm:w-6' />
                      </div>
                      <div className='min-w-0'>
                        <h3 className='truncate text-xl font-extrabold tracking-tight text-gray-900 transition-colors group-hover:text-rose-600 sm:text-[30px] sm:leading-8'>
                          {group.name}
                        </h3>
                        <p className='mt-0.5 text-sm text-gray-500 sm:text-base'>
                          Course #{group.course}
                        </p>
                      </div>
                    </div>
                    <button className='shrink-0 rounded-lg p-1 text-gray-400 transition-colors hover:bg-slate-100 hover:text-gray-700'>
                      <MoreVertical size={18} />
                    </button>
                  </div>

                  <div className='grid w-full grid-cols-2 divide-x divide-slate-200 rounded-2xl bg-slate-50 px-2 py-3 sm:px-3 sm:py-4'>
                    <div className='flex flex-col items-center justify-center text-center'>
                      <p className='text-[10px] font-extrabold tracking-[0.08em] text-slate-400 uppercase sm:text-xs'>
                        Status
                      </p>
                      <p className='mt-1 w-full truncate px-1 text-base font-bold text-slate-800 capitalize sm:text-lg'>
                        {group.status}
                      </p>
                    </div>
                    <div className='flex flex-col items-center justify-center text-center'>
                      <p className='text-[10px] font-extrabold tracking-[0.08em] text-slate-400 uppercase sm:text-xs'>
                        Students
                      </p>
                      <p className='mt-1 text-base font-bold text-slate-800 sm:text-lg'>
                        {group.students.length}
                      </p>
                    </div>
                  </div>
                </div>

                <RoseButton
                  className='mt-6 h-11 w-full rounded-2xl border-rose-500 text-base font-bold sm:h-12 sm:text-lg'
                  roseVariant='outline'
                  onClick={() => setSelectedGroup(group)}
                >
                  Manage Students
                </RoseButton>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // --- RENDER: GROUP DETAILS VIEW ---
  return (
    <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8'>
      {/* Header */}
      <div className='mb-6 flex items-center justify-between lg:mb-8'>
        <div className='flex items-center gap-3 sm:gap-4'>
          <button
            onClick={() => {
              setSelectedGroup(null)
              setSelectedStudentUsername('')
            }}
            className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 sm:h-10 sm:w-10'
          >
            <ArrowLeft size={18} className='sm:h-[20px] sm:w-[20px]' />
          </button>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 md:text-3xl'>
              {selectedGroup.name}
            </h1>
            <p className='text-xs text-gray-500 sm:text-sm'>
              Course #{selectedGroup.course} - Roster Management
            </p>
          </div>
        </div>
      </div>

      {/* Fix: Layout changed from Grid to Flex to prevent excessive wide empty spaces */}
      <div className='flex flex-col items-start gap-6 lg:flex-row lg:gap-8'>
        {/* Left Column: Add Student (Fixed Width on Desktop) */}
        <div className='w-full shrink-0 lg:sticky lg:top-6 lg:w-[320px] xl:w-[360px]'>
          <div className='rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6'>
            <h2 className='text-lg font-bold text-gray-900'>Add New Student</h2>
            <p className='mt-1 mb-5 text-xs text-gray-500 sm:text-sm'>
              Enroll a student into this group
            </p>

            <form
              onSubmit={handleAddStudent}
              className='space-y-3 sm:space-y-4'
            >
              <Select
                value={selectedStudentUsername}
                onValueChange={setSelectedStudentUsername}
              >
                <SelectTrigger className='h-11 w-full rounded-xl sm:h-12'>
                  <SelectValue placeholder='Select a student...' />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingStudents ? (
                    <div className='p-4 text-center text-sm text-slate-500'>
                      Loading...
                    </div>
                  ) : isErrorStudents ? (
                    <div className='p-4 text-center text-sm text-rose-500'>
                      Error loading students
                    </div>
                  ) : availableStudents.length === 0 ? (
                    <div className='p-4 text-center text-sm text-slate-500'>
                      No available students
                    </div>
                  ) : (
                    availableStudents.map((student) => (
                      <SelectItem
                        key={student.id}
                        value={student.username}
                      >
                        <div className='flex items-center gap-2'>
                          <User size={16} className='text-slate-400' />
                          <span className='truncate font-medium'>
                            {student.username}
                          </span>
                          {student.phone ? (
                            <span className='shrink-0 text-xs text-slate-400'>
                              {student.phone}
                            </span>
                          ) : null}
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>

              <RoseButton
                type='submit'
                roseVariant='solid'
                disabled={addStudentMutation.isPending || !selectedStudentUsername}
                className='h-11 w-full rounded-xl text-sm font-semibold sm:h-12 sm:text-base'
              >
                {addStudentMutation.isPending ? (
                  <Loader2 size={18} className='animate-spin' />
                ) : (
                  <>
                    <Plus size={18} className='mr-2' />
                    Add to Group
                  </>
                )}
              </RoseButton>
            </form>
          </div>
        </div>

        {/* Right Column: Students List (Takes remaining space) */}
        <div className='w-full min-w-0 flex-1'>
          <div className='overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm'>
            <div className='flex flex-col gap-3 border-b border-slate-100 bg-slate-50/50 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
              <div>
                <h2 className='text-lg font-bold text-gray-900'>
                  Enrolled Students
                </h2>
                <p className='text-xs text-gray-500 sm:text-sm'>
                  Currently active in {selectedGroup.name}
                </p>
              </div>
              <div className='inline-flex w-fit items-center gap-2 rounded-full bg-rose-100 px-3 py-1.5 text-xs font-bold text-rose-700 sm:px-4 sm:text-sm'>
                <Users size={16} />
                {selectedGroup.students.length} Total
              </div>
            </div>

            {selectedGroup.students.length === 0 ? (
              <div className='flex flex-col items-center justify-center p-10 text-center sm:p-16'>
                <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 sm:h-16 sm:w-16'>
                  <Users size={28} className='sm:h-8 sm:w-8' />
                </div>
                <h3 className='text-base font-semibold text-gray-900 sm:text-lg'>
                  Group is empty
                </h3>
                <p className='mt-1 max-w-sm text-xs text-gray-500 sm:text-sm'>
                  There are no students enrolled in this group yet. Add them
                  from the left panel.
                </p>
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[500px] text-left text-sm'>
                  <thead className='bg-slate-50 text-slate-500'>
                    <tr>
                      <th className='px-5 py-3 text-[10px] font-semibold tracking-wider uppercase sm:px-6 sm:py-4 sm:text-xs'>
                        Student Info
                      </th>
                      <th className='px-5 py-3 text-[10px] font-semibold tracking-wider uppercase sm:px-6 sm:py-4 sm:text-xs'>
                        Enrollment Date
                      </th>
                      <th className='px-5 py-3 text-right text-[10px] font-semibold tracking-wider uppercase sm:px-6 sm:py-4 sm:text-xs'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-100'>
                    {selectedGroup.students.map((s) => (
                      <tr
                        key={s.id}
                        className='group transition-colors hover:bg-slate-50'
                      >
                        <td className='px-5 py-3 sm:px-6 sm:py-4'>
                          <div className='flex items-center gap-2 sm:gap-3'>
                            <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-50 text-xs font-bold text-rose-600 sm:h-10 sm:w-10 sm:text-sm'>
                              #{s.student}
                            </div>
                            <span className='font-semibold text-slate-900'>
                              Student #{s.student}
                            </span>
                          </div>
                        </td>
                        <td className='px-5 py-3 text-xs text-slate-500 sm:px-6 sm:py-4 sm:text-sm'>
                          {new Date(s.joined_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                        <td className='px-5 py-3 text-right sm:px-6 sm:py-4'>
                          <button
                            onClick={() => handleRemoveStudent(s.student)}
                            disabled={removeStudentMutation.isPending}
                            className='inline-flex items-center gap-2 rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50'
                            title='Remove Student'
                          >
                            {removeStudentMutation.isPending ? (
                              <Loader2
                                size={16}
                                className='animate-spin sm:h-[18px] sm:w-[18px]'
                              />
                            ) : (
                              <Trash2
                                size={16}
                                className='sm:h-[18px] sm:w-[18px]'
                              />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
