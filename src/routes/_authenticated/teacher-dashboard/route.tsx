import { useState } from 'react'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { TeacherNavbar } from '@/components/teacher/TeacherNavbar'
import { TeacherSidebar } from '@/components/teacher/TeacherSidebar'

export const Route = createFileRoute('/_authenticated/teacher-dashboard')({
  component: TeacherDashboardLayout,
})

function TeacherDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='flex min-h-svh w-full bg-slate-50'>
      <TeacherSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className='flex min-w-0 flex-1 flex-col'>
        <TeacherNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className='min-w-0 flex-1 px-4 py-4 md:px-8 md:py-6 md:pb-6'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
