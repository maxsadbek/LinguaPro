import { useQuery } from '@tanstack/react-query'
import { getStudentsList } from '@/api/service/teacher/group.service'

export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: () => getStudentsList(),
  })
}
