import { useQuery } from '@tanstack/react-query'

import { getAttendanceStats } from '@/api/service/teacher/attendance.service'

export const useAttendanceStats = (groupId: number) => {
  return useQuery({
    queryKey: ['attendance', 'stats', groupId],
    queryFn: () => getAttendanceStats(groupId),
    enabled: !!groupId,
  })
}
