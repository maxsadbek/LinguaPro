import { createFileRoute } from '@tanstack/react-router'
import { FileText, Sparkles } from 'lucide-react'
import { useStudentHomework } from '@/hooks/student/useStudentPortal'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/_authenticated/student/homework')({
  component: StudentHomeworkPage,
})

function StudentHomeworkPage() {
  const { data: assignments = [] } = useStudentHomework()

  return (
    <div className='mx-auto max-w-6xl space-y-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='text-sm uppercase tracking-[0.2em] text-slate-500'>Homework</p>
          <h1 className='text-3xl font-semibold text-slate-900'>Task inbox</h1>
        </div>
        <Button>
          <FileText className='mr-2 h-4 w-4' />
          New submission
        </Button>
      </div>

      <div className='grid gap-4'>
        {assignments.map((item) => (
          <Card key={item.id} className='border-slate-200'>
            <CardHeader>
              <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
                <div>
                  <CardTitle>{item.title}</CardTitle>
                  <p className='text-sm text-slate-500'>{item.course}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <Badge
                    variant={
                      item.status === 'Submitted'
                        ? 'secondary'
                        : item.status === 'Late'
                        ? 'destructive'
                        : 'outline'
                    }
                  >
                    {item.status}
                  </Badge>
                  <span className='text-sm text-slate-500'>Due {item.dueDate}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex items-center gap-4'>
                <div className='w-full overflow-hidden rounded-full bg-slate-200'>
                  <div
                    className='h-2 rounded-full bg-rose-500'
                    style={{ width: `${item.completion}%` }}
                  />
                </div>
                <span className='text-sm font-semibold text-slate-900'>
                  {item.completion}%
                </span>
              </div>
              <div className='flex items-center gap-3 text-sm text-slate-500'>
                <Sparkles />
                <p>Suggested review: pronunciation and sentence flow.</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
