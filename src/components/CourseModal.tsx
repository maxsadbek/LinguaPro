import type { Course } from '@/data/courses-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface CourseModalProps {
  isOpen: boolean
  onClose: () => void
  onAddCourse: (course: Omit<Course, 'id'>) => void
  newCourse: {
    title: string
    level: string
    duration: string
    groups: string
    price: string
    image: string
    color: string
    category: 'english' | 'russian' | 'other'
  }
  setNewCourse: React.Dispatch<
    React.SetStateAction<{
      title: string
      level: string
      duration: string
      groups: string
      price: string
      image: string
      color: string
      category: 'english' | 'russian' | 'other'
    }>
  >
}

export function CourseModal({
  isOpen,
  onClose,
  onAddCourse,
  newCourse,
  setNewCourse,
}: CourseModalProps) {
  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>
            Yangi Kurs Qo'shish
          </h2>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666',
            }}
          >
            ×
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onAddCourse(newCourse)
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              Kurs nomi *
            </label>
            <Input
              value={newCourse.title}
              onChange={(e) =>
                setNewCourse((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder='Masalan: IELTS Academic'
              required
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              Daraja *
            </label>
            <Input
              value={newCourse.level}
              onChange={(e) =>
                setNewCourse((prev) => ({ ...prev, level: e.target.value }))
              }
              placeholder='Masalan: B1 Intermediate'
              required
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              Davomiyligi *
            </label>
            <Input
              value={newCourse.duration}
              onChange={(e) =>
                setNewCourse((prev) => ({ ...prev, duration: e.target.value }))
              }
              placeholder='Masalan: 3 oy'
              required
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              Narxi *
            </label>
            <Input
              value={newCourse.price}
              onChange={(e) =>
                setNewCourse((prev) => ({ ...prev, price: e.target.value }))
              }
              placeholder='Masalan: 500,000 UZS / oy'
              required
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              Kategoriya *
            </label>
            <select
              value={newCourse.category}
              onChange={(e) =>
                setNewCourse((prev) => ({
                  ...prev,
                  category: e.target.value as 'english' | 'russian' | 'other',
                }))
              }
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
              }}
              required
            >
              <option value='english'>Ingliz tili</option>
              <option value='russian'>Rus tili</option>
              <option value='other'>Boshqa</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              style={{ flex: 1 }}
            >
              Bekor qilish
            </Button>
            <Button
              type='submit'
              style={{
                flex: 1,
                background: '#e11d48',
                color: '#fff',
                border: 'none',
              }}
            >
              Qo'shish
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
