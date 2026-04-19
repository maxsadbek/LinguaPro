import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

export default function OqituvchilarPage() {
  return (
    <>
      <Header>
        <h1 className="text-lg font-semibold">O'qituvchilar</h1>
      </Header>
      <Main>
        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-4">O'qituvchilar ro'yxati</h2>
            <p className="text-muted-foreground">
              Bu bo'limga o'qituvchilarni boshqarish, o'chirish va boshqarish imkoniyatlari mavjud.
            </p>
          </div>
      </Main>
    </>
  )
}
