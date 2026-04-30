export type GroupStatus = 'active'

export interface GroupStudent {
  id: number
  student: number
  joined_at: string
}

export interface Group {
  id: number
  name: string
  course: number
  teacher: number
  teacher_name?: string
  status: GroupStatus
  start_date: string
  students: GroupStudent[]
}

export interface AddStudentPayload {
  student_id: number
}

export interface MessageResponse {
  detail: string
}
