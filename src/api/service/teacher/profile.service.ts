import { apiClient } from '@/api/client'
import { AUTH } from '@/constants/apiEndPoints'
import type { ProfileResponse, UpdateProfileRequest } from './profile.type'

export const getProfile = (): Promise<ProfileResponse> => {
  return apiClient.get<ProfileResponse>(AUTH.PROFILE_GET)
}

export const updateProfile = (
  data: UpdateProfileRequest
): Promise<ProfileResponse> => {
  return apiClient.patch<ProfileResponse>(AUTH.PROFILE_UPDATE, data)
}
