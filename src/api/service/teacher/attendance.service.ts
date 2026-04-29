import { apiClient } from '@/api/client'
import { ATTENDANCE } from '@/constants/apiEndPoints'
import type {
  AttendanceCreateRequest,
  AttendanceItem,
  AttendanceListParams,
  AttendanceStats,
  AttendanceUpdateRequest,
  MyAttendanceItem,
} from './attendance.type'

export const getAttendanceList = (
  params?: AttendanceListParams
): Promise<AttendanceItem[]> => {
  return apiClient.get<AttendanceItem[]>(ATTENDANCE.LIST, { params })
}

export const createAttendance = (
  data: AttendanceCreateRequest
): Promise<AttendanceItem> => {
  return apiClient.post<AttendanceItem>(ATTENDANCE.LIST, data)
}

export const getMyAttendance = (
  params?: AttendanceListParams
): Promise<MyAttendanceItem[]> => {
  return apiClient.get<MyAttendanceItem[]>(ATTENDANCE.MY, { params })
}

export const getAttendanceStats = (groupId: number): Promise<AttendanceStats> => {
  return apiClient.get<AttendanceStats>(ATTENDANCE.STATS(groupId))
}

export const updateAttendance = (
  id: number,
  data: AttendanceUpdateRequest
): Promise<AttendanceItem> => {
  return apiClient.put<AttendanceItem>(ATTENDANCE.UPDATE(id), data)
}
