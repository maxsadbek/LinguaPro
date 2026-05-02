import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import type {
  Assignment,
  AssignmentListParams,
  CreateAssignmentPayload,
  UpdateAssignmentPayload,
} from '@/api/service/assignment.type'
import { ASSIGNMENTS } from '@/constants/assignmentEndPoints'

export const useAssignments = (params?: AssignmentListParams) => {
  return useQuery({
    queryKey: ['assignments', params],
    queryFn: async () => {
      try {
        const result = await apiClient.get<Assignment[]>(ASSIGNMENTS, {
          params,
        })
        // eslint-disable-next-line no-console
        console.log('Assignments API Response:', result)
        return result
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Assignments API Error:', error)
        throw error
      }
    },
    staleTime: 30_000,
    retry: (failureCount, error: { response?: { status: number } }) => {
      // Don't retry on 404 errors
      if (error?.response?.status === 404) {
        console.error('404 Error detected, stopping retry')
        return false
      }
      return failureCount < 3
    },
  })
}

export const useAssignmentById = (id: number) => {
  return useQuery({
    queryKey: ['assignment', id],
    queryFn: () => apiClient.get<Assignment>(`${ASSIGNMENTS}${id}/`),
    enabled: !!id,
  })
}

export const useCreateAssignment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateAssignmentPayload) =>
      apiClient.post<Assignment>(ASSIGNMENTS, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] })
    },
  })
}

export const useUpdateAssignment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number
      payload: UpdateAssignmentPayload
    }) => apiClient.put<Assignment>(`${ASSIGNMENTS}${id}/`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] })
    },
  })
}

export const useDeleteAssignment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => apiClient.delete(`${ASSIGNMENTS}${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] })
    },
  })
}
