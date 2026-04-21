import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '../auth-layout'
import { ForgotPasswordForm } from './components/forgot-password-form'

export function ForgotPassword() {
  return (
    <AuthLayout>
      <Card className='max-w-md gap-4 sm:min-w-sm py-8'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>
            Parolni tiklash!
          </CardTitle>
          <CardDescription>
            Ro‘yxatdan o‘tgan ma’lumotingizni kiriting <br />
            va biz sizga parolni tiklash uchun havola yuboramiz.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </AuthLayout>
  )
}