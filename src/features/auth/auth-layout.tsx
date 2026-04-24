type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='flex min-h-svh items-center justify-center bg-muted/40 px-4 py-8'>
      <div className='w-full max-w-[480px] space-y-6'>
        <div className='flex items-center justify-center'>
          <h1 className='text-3xl font-bold text-[#C70C3D]'>LinguaPro</h1>
        </div>
        {children}
      </div>
    </div>
  )
}
