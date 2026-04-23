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

const formSchema = z.object({
  username: z.string().min(1, 'Username ni kiritishingiz shart.'),
  password: z
    .string()
    .min(1, 'Parolni kiritishingiz shart.')
    .min(7, "Parol kamida 7 ta belgidan iborat bo'lishi kerak."),
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

    if (data.username === 'teacher' && data.password === '1111111') {
      role = 'teacher'
      accountNo = 'TCH001'
    } else if (data.username.toLowerCase().includes('admin')) {
      role = 'admin'
      accountNo = 'ADM001'
    }

    toast.promise(sleep(2000), {
      loading: 'Tizimga kirilmoqda...',
      success: () => {
        setIsLoading(false)
        const mockUser = {
          accountNo,
          email: data.username,
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
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder='Username kiriting'
                  className={focusInputStyle}
                  {...field}
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
                <FormLabel>Password</FormLabel>
                <Link
                  to='/forgot-password'
                  className='text-sm font-medium text-[#C70C3D] hover:underline'
                >
                  Forgot password?
                </Link>
              </div>
              <FormControl>
                <PasswordInput
                  placeholder='********'
                  className={focusInputStyle}
                  {...field}
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
