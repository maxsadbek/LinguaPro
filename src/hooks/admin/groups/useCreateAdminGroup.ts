import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  createAdminGroup,
  type AdminGroupCreatePayload,
} from '@/api/service/admin/group.service'

export const useCreateAdminGroup = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AdminGroupCreatePayload) => createAdminGroup(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin', 'groups', 'list'] })
    },
  })
}
