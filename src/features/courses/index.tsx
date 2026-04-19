import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

export default function CoursesPage() {
  return (
    <>
      <Header>
        <h1 className="text-lg font-semibold">Kurslar</h1>
      </Header>
      <Main>
        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-4">Kurslar ro'yxati</h2>
            <p className="text-muted-foreground">
              Bu bo'limga kurslarni yaratish, tahrirlash va o'chirish imkoniyatlari mavjud.
            </p>
          </div>
      </Main>
    </>
  )
}
