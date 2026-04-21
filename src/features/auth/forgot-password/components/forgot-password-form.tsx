import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { sleep, cn } from '@/lib/utils'
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
  name: z
    .string()
    .min(2, 'Ismingizni kiriting')
    .regex(/^[A-Za-z\s]+$/, 'Ismda raqam bo‘lmasligi kerak'),

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '+998 ',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    toast.promise(sleep(2000), {
      loading: 'Sending data...',
      success: () => {
        setIsLoading(false)
        form.reset({ name: '', phone: '+998 ' })
        return `Name: ${data.name}, Phone: ${data.phone}`
      },
      error: 'Error',
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
    if (part2) result += ` -${part2}`
    if (part3) result += `-${part3}`
    if (part4) result += `-${part4}`

    return result
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ismingizni kiriting</FormLabel>
              <FormControl>
                <Input
                  placeholder='F.I.SH'
                  {...field}
                  onChange={(e) => {
                    const onlyLetters = e.target.value.replace(/[^A-Za-z\s]/g, '')
                    field.onChange(onlyLetters)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ================= PHONE ================= */}
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefon raqamingizni kiriting</FormLabel>
              <FormControl>
                <Input
                  value={field.value}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value)
                    field.onChange(formatted)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className='mt-2 flex items-center gap-2 bg-[#df2053] hover:bg-[#970e32]' disabled={isLoading}>
          Continue
          {isLoading ? (
            <Loader2 className='animate-spin' />
          ) : (
            <ArrowRight />
          )}
        </Button>
      </form>
    </Form>
  )
}