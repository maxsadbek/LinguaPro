import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Check, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { cn, sleep } from '@/lib/utils'
import { AuthLayout } from '../auth-layout'

const formSchema = z
  .object({
    username: z.string().min(1, 'Username ni kiriting'),
    new_password: z
      .string()
      .min(1, 'Yangi parolni kiriting')
      .min(7, "Parol kamida 7 ta belgidan iborat bo'lishi kerak."),
    confirm_password: z.string().min(1, 'Parolni tasdiqlang'),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Parollar bir xil emas',
    path: ['confirm_password'],
  })

export function VerifyPassword() {
  const navigate = useNavigate()
  const search = useSearch({ from: '/(auth)/verify-password' })
  const [isLoading, setIsLoading] = useState(false)
  const focusInputStyle =
    'focus-visible:ring-[#C70C3D] focus-visible:ring-offset-0'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: search.username ?? '',
      new_password: '',
      confirm_password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    toast.promise(sleep(2000), {
      loading: 'Parol yangilanmoqda...',
      success: () => {
        setIsLoading(false)
        form.reset({
          username: data.username,
          new_password: '',
          confirm_password: '',
        })
        navigate({ to: '/sign-in' })
        return 'Parol muvaffaqiyatli yangilandi'
      },
      error: () => {
        setIsLoading(false)
        return "Xatolik yuz berdi. Qayta urinib ko'ring."
      },
    })
  }

  return (
    <AuthLayout>
      <Card className='w-full max-w-lg gap-4 px-6 py-8 sm:px-8'>
        <CardHeader>
          <CardTitle className='text-xl tracking-tight'>
            Verify Password
          </CardTitle>
          <CardDescription>
            Username, new password va confirm password kiriting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn('grid gap-4')}
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
                name='new_password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder='Yangi parol kiriting'
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
                name='confirm_password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder='Parolni qayta kiriting'
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
                  <Check className='mr-2 h-4 w-4' />
                )}
                Verify Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
