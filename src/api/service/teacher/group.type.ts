export type GroupStatus = 'active'

export interface GroupStudent {
  id: number
  student: number
  joined_at: string
}

export interface StudentListItem {
  id: number
  username: string
  phone?: string | null
  avatar?: string | null
  learning_goal?: string | null
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
  username: string
}

export interface MessageResponse {
  detail: string
}
