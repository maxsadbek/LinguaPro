import { apiClient } from '@/api/client'
import type { Group, MessageResponse } from '@/api/service/teacher/group.type'
import { GROUP } from '@/constants/apiEndPoints'

export type AdminGroupCreatePayload = {
  name: string
  course: number
  teacher: number
  start_date: string
  status?: 'active'
}

export type AdminGroupUpdatePayload = Partial<AdminGroupCreatePayload>

export const getAdminGroups = (): Promise<Group[]> => {
  return apiClient.get<Group[]>(GROUP.LIST_ADMIN)
}

export const createAdminGroup = (
  data: AdminGroupCreatePayload
): Promise<Group> => {
  // eslint-disable-next-line no-console
  console.log('Creating admin group with data:', data)
  // eslint-disable-next-line no-console
  console.log('Creating admin group with endpoint:', GROUP.CREATE_ADMIN)
  return apiClient
    .post<Group>(GROUP.CREATE_ADMIN, data)
    .then((result) => {
      // eslint-disable-next-line no-console
      console.log('Admin group created successfully:', result)
      return result
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Failed to create admin group:', error)
      throw error
    })
}

export const updateAdminGroup = (
  groupId: number,
  data: AdminGroupUpdatePayload
): Promise<Group> => {
  return apiClient.put<Group>(GROUP.UPDATE_DELETE_ADMIN(groupId), data)
}

export const deleteAdminGroup = (groupId: number): Promise<MessageResponse> => {
  return apiClient.delete<MessageResponse>(GROUP.UPDATE_DELETE_ADMIN(groupId))
}
