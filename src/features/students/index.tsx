import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

export default function StudentsPage() {
  return (
    <>
      <Header>
        <h1 className="text-lg font-semibold">O'quvchilar</h1>
      </Header>
      <Main>
        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-4">O'quvchilar ro'yxati</h2>
            <p className="text-muted-foreground">
              Bu bo'limga o'quvchilar ro'yxatini ko'rish, qo'shish, o'chirish va boshqarish imkoniyatlari mavjud.
            </p>
          </div>
      </Main>
    </>
  )
}
