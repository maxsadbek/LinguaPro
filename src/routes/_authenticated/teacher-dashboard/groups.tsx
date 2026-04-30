import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Users,
  Plus,
  Search,
  MoreVertical,
  Loader2,
  Trash2,
  User,
} from 'lucide-react'
import { toast } from 'sonner'
import type { Group } from '@/api/service/teacher/group.type'
import { useAddStudentToGroup } from '@/hooks/teacher/groups/useAddStudentToGroup'
import { useRemoveStudentFromGroup } from '@/hooks/teacher/groups/useRemoveStudentFromGroup'
import { useTeacherGroups } from '@/hooks/teacher/groups/useTeacherGroups'
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
import { GroupModal } from '@/components/GroupModal'

export const Route = createFileRoute(
  '/_authenticated/teacher-dashboard/groups'
)({
  component: GroupsPage,
})

function GroupsPage() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStudentId, setSelectedStudentId] = useState<string>('')
  const [newGroup, setNewGroup] = useState({
    name: '',
    course: 0,
    teacher: 0,
    start_time: '',
    end_time: '',
    week_days: '',
    status: 'active' as 'active' | 'inactive' | 'archived',
    start_date: '',
    end_date: '',
  })

  const teacherGroupsQuery = useTeacherGroups()
  const groups = useMemo(
    () => teacherGroupsQuery.data ?? [],
    [teacherGroupsQuery.data]
  )

  const addStudentMutation = useAddStudentToGroup(selectedGroup?.id ?? 0)
  const removeStudentMutation = useRemoveStudentFromGroup(
    selectedGroup?.id ?? 0
  )

  const studentsQuery = useStudents()

  // Filter students not in current group
  const availableStudents = useMemo(() => {
    const currentGroupStudentIds = new Set(
      selectedGroup?.students.map((s) => s.student) || []
    )
    const allStudents = studentsQuery.data ?? []
    return allStudents.filter((s) => !currentGroupStudentIds.has(s.id))
  }, [selectedGroup?.students, studentsQuery.data])

  const filteredGroups = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return q ? groups.filter((g) => g.name.toLowerCase().includes(q)) : groups
  }, [groups, searchQuery])

  // Group List View
  if (!selectedGroup) {
    return (
      <div>
        <div className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center md:mb-8'>
          <div>
            <h1 className='text-2xl font-bold text-gray-800 md:text-3xl'>
              Groups
            </h1>
            <p className='mt-1 text-sm text-gray-500 md:mt-2 md:text-base'>
              Manage your student groups and classes
            </p>
          </div>
          <RoseButton
            onClick={() => setIsModalOpen(true)}
            className='flex w-full items-center justify-center rounded-xl px-6 py-3 sm:w-auto'
            roseVariant='gradient'
          >
            <Plus size={18} />
            Create New Group
          </RoseButton>
        </div>

        {/* Search Bar */}
        <div className='mb-6'>
          <div className='relative w-full md:w-[520px]'>
            <Search
              className='absolute top-1/2 left-4 -translate-y-1/2 text-gray-400'
              size={20}
            />
            <Input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search groups...'
              className='pl-12'
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
              course: 0,
              teacher: 0,
              start_time: '',
              end_time: '',
              week_days: '',
              status: 'active',
              start_date: '',
              end_date: '',
            })
          }}
          newGroup={newGroup}
          setNewGroup={setNewGroup}
        />

        {teacherGroupsQuery.isLoading ? (
          <div className='flex h-32 items-center justify-center text-slate-500'>
            <Loader2 className='animate-spin' size={18} />
          </div>
        ) : teacherGroupsQuery.isError ? (
          <div className='rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700'>
            Failed to load groups
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {filteredGroups.map((group) => (
              <div
                key={group.id}
                className='rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'
              >
                <div className='mb-4 flex items-start justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500'>
                      <Users size={24} className='text-white' />
                    </div>
                    <div>
                      <h3 className='text-xl font-bold text-gray-900'>
                        {group.name}
                      </h3>
                      <p className='text-sm text-gray-500'>
                        Course #{group.course} · Start {group.start_date}
                      </p>
                    </div>
                  </div>
                  <button className='text-gray-400 hover:text-gray-600'>
                    <MoreVertical size={20} />
                  </button>
                </div>

                <div className='grid grid-cols-3 gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4'>
                  <div>
                    <p className='text-[11px] font-semibold text-slate-500 uppercase'>
                      Status
                    </p>
                    <p className='mt-1 text-sm font-bold text-slate-900'>
                      {group.status}
                    </p>
                  </div>
                  <div>
                    <p className='text-[11px] font-semibold text-slate-500 uppercase'>
                      Teacher
                    </p>
                    <p className='mt-1 text-sm font-bold text-slate-900'>
                      {group.teacher_name || `Teacher #${group.teacher}`}
                    </p>
                  </div>
                  <div>
                    <p className='text-[11px] font-semibold text-slate-500 uppercase'>
                      Students
                    </p>
                    <p className='mt-1 text-sm font-bold text-slate-900'>
                      {group.students.length}
                    </p>
                  </div>
                </div>

                <RoseButton
                  className='mt-4 w-full'
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

  return (
    <div className='mx-auto max-w-6xl space-y-6 p-4'>
      {/* Header */}
      <div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 md:text-3xl'>
            {selectedGroup.name}
          </h1>
          <p className='mt-1 text-sm text-gray-500 md:text-base'>
            Manage group students and roster
          </p>
        </div>
        <RoseButton
          roseVariant='outline'
          className='rounded-xl px-5 py-2.5'
          onClick={() => {
            setSelectedGroup(null)
            setSelectedStudentId('')
          }}
        >
          Back to Groups
        </RoseButton>
      </div>

      {/* Add Student Card */}
      <div className='rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'>
        <div className='mb-4 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center'>
          <div>
            <h2 className='text-lg font-bold text-gray-900'>Add Student</h2>
            <p className='text-sm text-gray-500'>
              Select a student to add to this group
            </p>
          </div>
          <div className='flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700'>
            <Users size={14} />
            <span>{selectedGroup.students.length} students</span>
          </div>
        </div>

        <form
          className='flex w-full gap-3 md:w-auto'
          onSubmit={(e) => {
            e.preventDefault()
            const sid = Number(selectedStudentId)
            if (!sid) return
            toast.promise(addStudentMutation.mutateAsync({ student_id: sid }), {
              loading: 'Adding student...',
              success: (res) => res.detail,
              error: 'Failed to add student',
            })
            setSelectedStudentId('')
          }}
        >
          <div className='w-full md:w-[320px]'>
            <Select
              value={selectedStudentId}
              onValueChange={setSelectedStudentId}
            >
              <SelectTrigger className='h-11 w-full'>
                <SelectValue placeholder='Select a student...' />
              </SelectTrigger>
              <SelectContent>
                {studentsQuery.isLoading ? (
                  <div className='flex items-center justify-center px-3 py-2 text-sm text-slate-500'>
                    <Loader2 size={16} className='animate-spin' />
                  </div>
                ) : studentsQuery.isError ? (
                  <div className='px-3 py-2 text-sm text-rose-600'>
                    Failed to load students
                  </div>
                ) : availableStudents.length === 0 ? (
                  <div className='px-3 py-2 text-sm text-slate-500'>
                    No available students
                  </div>
                ) : (
                  availableStudents.map((student) => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      <div className='flex items-center gap-2'>
                        <User size={16} className='text-slate-400' />
                        <span>
                          {student.first_name} {student.last_name}
                        </span>
                        <span className='text-xs text-slate-400'>
                          #{student.id}
                        </span>
                      </div>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <RoseButton
            type='submit'
            roseVariant='solid'
            disabled={addStudentMutation.isPending || !selectedStudentId}
            className='h-11 px-6'
          >
            {addStudentMutation.isPending ? (
              <Loader2 size={18} className='animate-spin' />
            ) : (
              <>
                <Plus size={18} className='mr-2' />
                Add
              </>
            )}
          </RoseButton>
        </form>
      </div>

      {/* Students List Card */}
      <div className='rounded-2xl bg-white shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'>
        <div className='border-b border-slate-100 px-6 py-4'>
          <h2 className='text-lg font-bold text-gray-900'>Students List</h2>
          <p className='text-sm text-gray-500'>
            All students currently enrolled in this group
          </p>
        </div>

        {selectedGroup.students.length === 0 ? (
          <div className='flex flex-col items-center justify-center px-6 py-16 text-center'>
            <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400'>
              <Users size={32} />
            </div>
            <h3 className='text-lg font-semibold text-gray-900'>
              No students yet
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Add students using the form above to get started
            </p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-slate-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase'>
                    Student ID
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase'>
                    Joined At
                  </th>
                  <th className='px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100'>
                {selectedGroup.students.map((s) => (
                  <tr
                    key={s.id}
                    className='transition-colors hover:bg-slate-50'
                  >
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700'>
                          #{s.student}
                        </div>
                        <span className='font-semibold text-slate-900'>
                          Student #{s.student}
                        </span>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-sm text-slate-600'>
                      {new Date(s.joined_at).toLocaleString()}
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <button
                        type='button'
                        onClick={() => {
                          toast.promise(
                            removeStudentMutation.mutateAsync(s.student),
                            {
                              loading: 'Removing student...',
                              success: (res) => res.detail,
                              error: 'Failed to remove student',
                            }
                          )
                        }}
                        disabled={removeStudentMutation.isPending}
                        className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50'
                      >
                        {removeStudentMutation.isPending ? (
                          <Loader2 size={16} className='animate-spin' />
                        ) : (
                          <>
                            <Trash2 size={16} />
                            Remove
                          </>
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
  )
}
