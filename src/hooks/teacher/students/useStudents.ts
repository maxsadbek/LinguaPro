import { useQuery } from '@tanstack/react-query'
import { getUsers } from '@/api/service/teacher/user.service'

export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const response = await getUsers()
      // Filter only students by role
      const students = response.results.filter(
        (user) => user.role === 'student'
      )
      return students
    },
  })
}
