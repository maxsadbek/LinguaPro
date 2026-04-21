import {  useSearch } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'

export function SignIn() {
  const { redirect } = useSearch({ from: '/(auth)/sign-in' })

  return (
    <AuthLayout>
      {/* max-w-md o'rniga max-w-lg yoki max-w-xl qo'ying */}
      <Card className='w-full max-w-lg gap-4 px-6 sm:px-8 py-8'>
        <CardHeader>
          <CardTitle className='text-xl tracking-tight'>Tizimga kirish</CardTitle>
          <CardDescription>
            Hisobingizga kirish uchun elektron pochta va parolingizni kiriting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuthForm redirectTo={redirect} />
        </CardContent>
      </Card>
    </AuthLayout>
  )
}