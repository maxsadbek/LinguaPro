import type { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { loginService } from '@/api/service/auth/auth.service'
import type { LoginRequest, LoginResponse } from '@/api/service/auth/auth.type'
import useUserStore, { type UserInfo } from '@/stores/userStore'

type UseLoginOptions = {
  redirectTo?: string
}

export const useLogin = ({ redirectTo }: UseLoginOptions = {}) => {
  const navigate = useNavigate()

  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: loginService,
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.tokens.access)
      localStorage.setItem('refresh_token', data.tokens.refresh)
      localStorage.setItem('user', JSON.stringify(data.user))

      sessionStorage.setItem('linguapro_user', JSON.stringify(data.user))
      sessionStorage.setItem('linguapro_access_token', data.tokens.access)

      useUserStore.getState().actions.setUserToken({
        accessToken: data.tokens.access,
        refreshToken: data.tokens.refresh,
      })
      useUserStore
        .getState()
        .actions.setUserInfo(data.user as unknown as UserInfo)

      const to =
        redirectTo ||
        (data.user.role === 'teacher' ? '/teacher-dashboard' : '/admin-dashboard')
      navigate({ to, replace: true })
    },
  })
}
