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
      <Card className='w-full max-w-lg gap-4 px-6 py-8 sm:px-8'>
        <CardHeader>
          <CardTitle className='text-xl tracking-tight'>
            Forgot Password
          </CardTitle>
          <CardDescription>
            Username va phone raqamingizni kiriting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
