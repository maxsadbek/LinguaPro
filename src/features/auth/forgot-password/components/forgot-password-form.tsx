import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
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

const formSchema = z.object({
  username: z.string().min(1, 'Username ni kiriting'),
  phone: z
    .string()
    .regex(
      /^\+998 \d{2} \d{3} \d{2} \d{2}$/,
      'Telefon format: +998 90 123 45 67'
    ),
})

export function ForgotPasswordForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const focusInputStyle =
    'focus-visible:ring-[#C70C3D] focus-visible:ring-offset-0'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      phone: '+998 ',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    toast.promise(sleep(2000), {
      loading: 'Tekshirilmoqda...',
      success: () => {
        setIsLoading(false)
        form.reset({ username: '', phone: '+998 ' })
        navigate({
          to: '/verify-password',
          search: { username: data.username },
        })
        return 'Davom eting'
      },
      error: () => {
        setIsLoading(false)
        return "Xatolik yuz berdi. Qayta urinib ko'ring."
      },
    })
  }

  const formatPhone = (value: string) => {
    let numbers = value.replace(/\D/g, '')

    if (!numbers.startsWith('998')) {
      numbers = '998'
    }

    numbers = numbers.slice(0, 12)

    const part1 = numbers.slice(3, 5)
    const part2 = numbers.slice(5, 8)
    const part3 = numbers.slice(8, 10)
    const part4 = numbers.slice(10, 12)

    let result = '+998'

    if (part1) result += ` ${part1}`
    if (part2) result += ` ${part2}`
    if (part3) result += ` ${part3}`
    if (part4) result += ` ${part4}`

    return result
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
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  value={field.value}
                  className={focusInputStyle}
                  placeholder='+998 90 123 45 67'
                  onChange={(e) => field.onChange(formatPhone(e.target.value))}
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
            <ArrowRight className='mr-2 h-4 w-4' />
          )}
          Continue
        </Button>
      </form>
    </Form>
  )
}
