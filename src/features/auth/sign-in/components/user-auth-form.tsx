import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { Loader2, LogIn } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { cn, sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import {
  PASSWORD_REGEX,
  USERNAME_REGEX,
  sanitizePassword,
  sanitizeUsername,
} from '../../validators'

const formSchema = z.object({
  username: z
    .string()
    .min(1, 'Foydalanuvchi nomini kiritishingiz shart.')
    .regex(
      USERNAME_REGEX,
      "Foydalanuvchi nomi 3 tadan 20 tagacha lotin harfi, raqam yoki pastki chiziqdan iborat bo'lsin"
    ),
  password: z
    .string()
    .min(1, 'Parolni kiritishingiz shart.')
    .regex(
      PASSWORD_REGEX,
      "Parol 7 tadan 32 tagacha bo'lsin va bo'sh joy qatnashmasin"
    ),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

export function UserAuthForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const focusInputStyle =
    'focus-visible:ring-[#C70C3D] focus-visible:ring-offset-0'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    let role: 'teacher' | 'admin' | 'user' = 'user'
    let accountNo = 'USR001'

    const normalizedUsername = data.username.trim().toLowerCase()
    const isTeacherLogin =
      normalizedUsername === 'teacher01' && data.password === '1111111'

    if (isTeacherLogin) {
      role = 'teacher'
      accountNo = 'TCH001'
    } else if (normalizedUsername.includes('admin')) {
      role = 'admin'
      accountNo = 'ADM001'
    }

    toast.promise(sleep(2000), {
      loading: 'Tizimga kirilmoqda...',
      success: () => {
        setIsLoading(false)
        const mockUser = {
          accountNo,
          email: normalizedUsername,
          role,
          exp: Date.now() + 24 * 60 * 60 * 1000,
        }

        sessionStorage.setItem('linguapro_user', JSON.stringify(mockUser))
        auth.setUser(mockUser)
        auth.setAccessToken('mock-access-token')

        let redirectPath = '/admin-dashboard'
        if (role === 'teacher') {
          redirectPath = '/teacher-dashboard'
        }

        const isRoleAllowedRedirect = (() => {
          if (!redirectTo) return false
          if (role === 'teacher')
            return redirectTo.startsWith('/teacher-dashboard')
          if (role === 'admin')
            return !redirectTo.startsWith('/teacher-dashboard')
          return false
        })()

        navigate({
          to: isRoleAllowedRedirect ? redirectTo : redirectPath,
          replace: true,
        })
        return 'Xush kelibsiz!'
      },
      error: () => {
        setIsLoading(false)
        return "Login muvaffaqiyatsiz. Qayta urinib ko'ring."
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-4', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foydalanuvchi nomi</FormLabel>
              <FormControl>
                <Input
                  placeholder='Foydalanuvchi nomini kiriting'
                  className={focusInputStyle}
                  maxLength={20}
                  {...field}
                  onChange={(e) => field.onChange(sanitizeUsername(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center justify-between'>
                <FormLabel>Parol</FormLabel>
                <Link
                  to='/forgot-password'
                  className='text-sm font-medium text-[#C70C3D] hover:underline'
                >
                  Parolni tiklash
                </Link>
              </div>
              <FormControl>
                <PasswordInput
                  placeholder='Parolni kiriting'
                  className={focusInputStyle}
                  maxLength={32}
                  {...field}
                  onChange={(e) => field.onChange(sanitizePassword(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className='mt-2 w-full bg-[#C70C3D] text-white transition-colors hover:bg-[#C70C3D]/90'
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <LogIn className='mr-2 h-4 w-4' />
          )}
          Tizimga kirish
        </Button>
      </form>
    </Form>
  )
}
