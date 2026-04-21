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

// Form validatsiyasi
const formSchema = z.object({
  email: z.string().email('Iltimos, yaroqli email manzilini kiriting.'),
  password: z
    .string()
    .min(1, 'Parolni kiritishingiz shart.')
    .min(7, 'Parol kamida 7 ta belgidan iborat bo\'lishi kerak.'),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

export function UserAuthForm({ className, redirectTo, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  // Fokus bo'lganda rang o'zgarishi uchun style klassi
  const focusInputStyle = "focus-visible:ring-[#C70C3D] focus-visible:ring-offset-0"

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Simulyatsiya (login jarayoni)
    toast.promise(sleep(2000), {
      loading: 'Tizimga kirilmoqda...',
      success: () => {
        setIsLoading(false)
        const mockUser = {
          accountNo: 'USR001',
          email: data.email,
          role: 'user' as const,
          exp: Date.now() + 24 * 60 * 60 * 1000,
        }

        auth.setUser(mockUser)
        auth.setAccessToken('mock-access-token')
        navigate({ to: redirectTo || '/', replace: true })
        return `Xush kelibsiz!`
      },
      error: () => {
        setIsLoading(false)
        return 'Login muvaffaqiyatsiz. Qayta urinib ko\'ring.'
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
        {/* EMAIL FIELD */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Elektron pochta</FormLabel>
              <FormControl>
                <Input 
                  placeholder='example@email.com' 
                  className={focusInputStyle} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PASSWORD FIELD */}
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
                  Parolni unutdingizmi?
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

        {/* SUBMIT BUTTON */}
        <Button 
          className='mt-2 w-full bg-[#C70C3D] hover:bg-[#C70C3D]/90 text-white transition-colors' 
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