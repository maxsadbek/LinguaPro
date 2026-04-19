import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

export default function TeachersPage() {
  return (
    <>
      <Header>
        <h1 className='text-lg font-semibold'>Ustozlar</h1>
      </Header>
      <Main>
        <div className='rounded-lg border p-4'>
          <h2 className='mb-4 text-lg font-semibold'>Ustozlar ro'yxati</h2>
          <p className='text-muted-foreground'>
            Bu bo'limga ustozlar ro'yxatini ko'rish, qo'shish, o'chirish va
            boshqarish imkoniyatlari mavjud.
          </p>
        </div>
      </Main>
    </>
  )
}
