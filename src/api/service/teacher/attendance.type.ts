export type AttendanceStatus = 'present' | 'absent' | 'late'

export interface AttendanceItem {
  id: number
  student: number
  student_name: string
  group: number
  group_name: string
  date: string
  status: AttendanceStatus
  note: string
  marked_by: number
  marked_by_name: string
  created_at: string
}

export interface AttendanceCreateRequest {
  student: number
  group: number
  date: string
  status: AttendanceStatus
  note?: string
}

export interface AttendanceUpdateRequest extends AttendanceCreateRequest {}

export interface AttendanceStats {
  group_id: number
  group_name: string
  total: number
  present: number
  absent: number
  late: number
  present_pct: number
  absent_pct: number
  late_pct: number
}

export interface MyAttendanceItem {
  id: number
  group: number
  group_name: string
  date: string
  status: AttendanceStatus
  note: string
  created_at: string
}

export interface AttendanceListParams {
  ordering?: string
  search?: string
}
