import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import type { AxiosError } from 'axios'
import { loginService } from '@/api/service/auth/auth.service'
import type { LoginRequest, LoginResponse } from '@/api/service/auth/auth.type'

export const useLogin = () => {
  const navigate = useNavigate()

  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: loginService,
    onSuccess: ({ tokens, user }) => {
      localStorage.setItem('access_token', tokens.access)
      localStorage.setItem('refresh_token', tokens.refresh)
      sessionStorage.setItem('linguapro_user', JSON.stringify(user))
      
      if (user.role === 'admin') {
        navigate({ to: '/admin-dashboard', replace: true })
      } else {
        navigate({ to: '/teacher-dashboard', replace: true })
      }
    },
  })
}