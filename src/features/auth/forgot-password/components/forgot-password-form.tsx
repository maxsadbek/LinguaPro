import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
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
  username: z.string().min(1, 'Foydalanuvchi nomini kiriting'),
  phone: z
    .string()
    .regex(/^\+998 \d{2}-\d{3}-\d{2}-\d{2}$/, 'Telefon format: +998 90-123-45-67'),
})

const PHONE_PREFIX = '+998 '

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 9)
  const part1 = digits.slice(0, 2)
  const part2 = digits.slice(2, 5)
  const part3 = digits.slice(5, 7)
  const part4 = digits.slice(7, 9)

  let result = PHONE_PREFIX

  if (part1) result += part1
  if (part2) result += `-${part2}`
  if (part3) result += `-${part3}`
  if (part4) result += `-${part4}`

  return result
}

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
      phone: PHONE_PREFIX,
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    navigate({
      to: '/verify-page',
      search: { username: data.username },
    })
    setIsLoading(false)
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
              <FormLabel>Telefon raqami</FormLabel>
              <FormControl>
                <Input
                  value={field.value}
                  inputMode='numeric'
                  className={focusInputStyle}
                  placeholder='+998 90-123-45-67'
                  onChange={(e) => field.onChange(formatPhone(e.target.value))}
                  onFocus={() => {
                    if (!field.value) field.onChange(PHONE_PREFIX)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='mt-2 w-full bg-[#C70C3D] text-white transition-colors hover:bg-[#C70C3D]/90'
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <ArrowRight className='mr-2 h-4 w-4' />
          )}
          Davom etish
        </Button>
      </form>
    </Form>
  )
}
