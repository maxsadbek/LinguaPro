import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/api/service/teacher/profile.service'
import type { UserData } from '@/api/service/teacher/profile.type'

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    select: (data) => (Array.isArray(data) ? data[0] : data) as UserData,
  })
}
