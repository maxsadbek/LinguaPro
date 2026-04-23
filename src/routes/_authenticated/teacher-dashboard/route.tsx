import { createFileRoute, Outlet } from '@tanstack/react-router'
import { TeacherNavbar } from '@/components/teacher/TeacherNavbar'
import { TeacherSidebar } from '@/components/teacher/TeacherSidebar'

export const Route = createFileRoute('/_authenticated/teacher-dashboard')({
  component: TeacherDashboardLayout,
})

function TeacherDashboardLayout() {
  return (
    <div className='flex min-h-svh w-full bg-slate-50'>
      <TeacherSidebar />
      <div className='flex min-w-0 flex-1 flex-col'>
        <TeacherNavbar />
        <main className='min-w-0 flex-1 px-8 py-6'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
