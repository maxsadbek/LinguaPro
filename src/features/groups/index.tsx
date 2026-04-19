import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

export default function GroupsPage() {
  return (
    <>
      <Header>
        <h1 className="text-lg font-semibold">Guruhlar</h1>
      </Header>
      <Main>
        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-4">Guruhlar ro'yxati</h2>
            <p className="text-muted-foreground">
              Bu bo'limga guruhlarni boshqarish, o'quvchilarni guruhga bo'lishish va guruhlarni boshqarish imkoniyatlari mavjud.
            </p>
          </div>
      </Main>
    </>
  )
}
