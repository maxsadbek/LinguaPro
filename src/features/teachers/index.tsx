import { useState } from 'react'
import { useToast } from '@/components/ui/toast'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { TeacherModal } from './TeacherModal'

// --- Interfaces ---
interface Teacher {
  id: number
  name: string
  initials: string
  subject: string
  badgeColor: {
    bg: string
    text: string
    border: string
    avatarBg: string
    avatarFill: string
  }
  phone: string
  groups: number
  experience: number
  rating: number
}

// --- Mock Data ---
const mockTeachers: Teacher[] = [
  {
    id: 1,
    name: 'Dildora Karimova',
    initials: 'DK',
    subject: 'IELTS Expert',
    badgeColor: {
      bg: '#fff1f2',
      text: '#e11d48',
      border: '#fda4af',
      avatarBg: '#fff1f2',
      avatarFill: '#fb7185',
    },
    phone: '+998 90 123-45-67',
    groups: 8,
    experience: 6,
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Sardor Alimov',
    initials: 'SA',
    subject: 'Grammar Specialist',
    badgeColor: {
      bg: '#fff1f2',
      text: '#e11d48',
      border: '#fda4af',
      avatarBg: '#fff1f2',
      avatarFill: '#fb7185',
    },
    phone: '+998 89 345-22-11',
    groups: 5,
    experience: 3,
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Malika Rixsiyeva',
    initials: 'MR',
    subject: 'English for Kids',
    badgeColor: {
      bg: '#fff1f2',
      text: '#e11d48',
      border: '#fda4af',
      avatarBg: '#fff1f2',
      avatarFill: '#fb7185',
    },
    phone: '+998 97 777-00-11',
    groups: 12,
    experience: 10,
    rating: 5.0,
  },
  {
    id: 4,
    name: "Jahongir To'rayev",
    initials: 'JT',
    subject: 'Business English',
    badgeColor: {
      bg: '#fff1f2',
      text: '#e11d48',
      border: '#fda4af',
      avatarBg: '#fff1f2',
      avatarFill: '#fb7185',
    },
    phone: '+998 93 445-56-67',
    groups: 4,
    experience: 5,
    rating: 4.8,
  },
  {
    id: 5,
    name: 'Elena Petrova',
    initials: 'EP',
    subject: 'Russian Expert',
    badgeColor: {
      bg: '#fff1f2',
      text: '#e11d48',
      border: '#fda4af',
      avatarBg: '#fff1f2',
      avatarFill: '#fb7185',
    },
    phone: '+998 80 900-11-22',
    groups: 6,
    experience: 4,
    rating: 4.6,
  },
]

const kpiData = {
  totalTeachers: 24,
  activeGroups: 86,
  totalTeachersMax: 40,
  activeGroupsMax: 100,
  description:
    "Last month, teachers' average rating increased by 12%. Highest IELTS score achieved - 8.5 points.",
}

// --- Icons ---
const PhoneIcon = () => (
  <svg
    width={13}
    height={13}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path d='M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.91 14a16 16 0 006.09 6.09l.41-.41a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z' />
  </svg>
)

const EditIcon = () => (
  <svg
    width={13}
    height={13}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
  </svg>
)

const DetailIcon = () => (
  <svg
    width={13}
    height={13}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
  >
    <circle cx='12' cy='12' r='10' />
    <line x1='12' y1='8' x2='12' y2='12' />
    <line x1='12' y1='16' x2='12.01' y2='16' />
  </svg>
)

const DeleteIcon = () => (
  <svg
    width={13}
    height={13}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
  >
    <polyline points='3 6 5 6 21 6' />
    <path d='M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2' />
  </svg>
)

const AvatarSilhouette = ({ fill }: { fill: string }) => (
  <svg viewBox='0 0 40 40' fill='none' width={28} height={28}>
    <circle cx='20' cy='15' r='8' fill={fill} />
    <ellipse cx='20' cy='33' rx='12' ry='7' fill={fill} />
  </svg>
)

// --- Helper Components ---
const ActionButton = ({
  onClick,
  color,
  icon,
}: {
  onClick: () => void
  color: 'blue' | 'purple' | 'red'
  icon: React.ReactNode
}) => {
  const [hovered, setHovered] = useState(false)
  const colors = {
    blue: { text: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
    purple: { text: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
    red: { text: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
  }
  const c = colors[color]

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        borderRadius: 10,
        border: `1px solid ${hovered ? c.border : 'var(--border-primary, #e5e7eb)'}`,
        background: hovered ? c.bg : 'transparent',
        color: hovered ? c.text : '#64748b',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      {icon}
    </button>
  )
}

function TeacherCard({
  teacher,
  onEdit,
  onDelete,
  onDetail,
}: {
  teacher: Teacher
  onEdit: (teacher: Teacher) => void
  onDelete: (teacher: Teacher) => void
  onDetail: (teacher: Teacher) => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      style={{
        background: 'var(--bg-primary, #fff)',
        border: `1px solid ${hovered ? '#e5e7eb' : 'var(--border-primary, #f1f5f9)'}`,
        borderRadius: 20,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: hovered
          ? '0 12px 24px -8px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.02)'
          : '0 2px 4px 0 rgba(0,0,0,0.02)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            background: teacher.badgeColor.avatarBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${teacher.badgeColor.border}40`,
            overflow: 'hidden',
          }}
        >
          {teacher.avatar ? (
            <img
              src={teacher.avatar}
              alt={teacher.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <AvatarSilhouette fill={teacher.badgeColor.avatarFill} />
          )}
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: '#1e293b',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {teacher.name}
          </div>
          <div
            style={{
              marginTop: 4,
              fontSize: 10,
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 6,
              display: 'inline-block',
              background: teacher.badgeColor.bg,
              color: teacher.badgeColor.text,
            }}
          >
            {teacher.subject}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: '#64748b',
          fontSize: 13,
        }}
      >
        <PhoneIcon />
        <span>{teacher.phone}</span>
      </div>

      <div style={{ height: '1px', background: '#f1f5f9' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600 }}>
            GURUHLAR
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>
            {teacher.groups}{' '}
            <small style={{ fontWeight: 400, fontSize: 12 }}>ta</small>
          </div>
        </div>
        <div style={{ paddingLeft: 12, borderLeft: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600 }}>
            TAJRIBA
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>
            {teacher.experience}{' '}
            <small style={{ fontWeight: 400, fontSize: 12 }}>yil</small>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <ActionButton
          onClick={() => onEdit(teacher)}
          color='blue'
          icon={<EditIcon />}
        />
        <ActionButton
          onClick={() => onDetail(teacher)}
          color='purple'
          icon={<DetailIcon />}
        />
        <ActionButton
          onClick={() => onDelete(teacher)}
          color='red'
          icon={<DeleteIcon />}
        />
      </div>
    </div>
  )
}

// --- Main Page ---
export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const savedTeachers = localStorage.getItem('teachers')
    return savedTeachers ? JSON.parse(savedTeachers) : mockTeachers
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [modalAction, setModalAction] = useState<'edit' | 'delete' | 'detail'>(
    'detail'
  )
  const { addToast, ToastContainer } = useToast()

  const handleDelete = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setModalAction('delete')
    setModalOpen(true)
  }

  const handleEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setModalAction('edit')
    setModalOpen(true)
  }

  const handleDetail = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setModalAction('detail')
    setModalOpen(true)
  }

  const handleAdd = () => {
    setSelectedTeacher(null)
    setModalAction('edit')
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setSelectedTeacher(null)
    setModalAction('detail')
  }

  const handleModalConfirm = (updatedTeacher: Teacher) => {
    let newTeachers: Teacher[]

    if (modalAction === 'delete') {
      // Delete functionality
      newTeachers = teachers.filter((t) => t.id !== updatedTeacher.id)
      setTeachers(newTeachers)
      addToast(
        `"${updatedTeacher.name}" teacher was successfully deleted`,
        'success'
      )
      // TODO: Backend API call to delete teacher
      // await api.deleteTeacher(updatedTeacher.id)
    } else if (modalAction === 'edit') {
      if (selectedTeacher) {
        // Edit existing teacher
        newTeachers = teachers.map((t) =>
          t.id === updatedTeacher.id ? updatedTeacher : t
        )
        setTeachers(newTeachers)
        addToast(
          `"${updatedTeacher.name}" teacher information was successfully updated`,
          'success'
        )
        // TODO: Backend API call to update teacher
        // await api.updateTeacher(updatedTeacher.id, updatedTeacher)
      } else {
        // Add new teacher
        const newTeacher = {
          ...updatedTeacher,
          id: Math.max(...teachers.map((t) => t.id)) + 1,
        }
        newTeachers = [...teachers, newTeacher]
        setTeachers(newTeachers)
        addToast(
          `"${updatedTeacher.name}" teacher was successfully added`,
          'success'
        )
      }
    } else {
      newTeachers = teachers
    }

    // Save to localStorage
    localStorage.setItem('teachers', JSON.stringify(newTeachers))
    handleModalClose()
  }

  return (
    <>
      <Header>
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div
          style={{
            padding: '24px 32px 0',
            fontSize: 11,
            color: '#94a3b8',
            fontWeight: 600,
            letterSpacing: '0.05em',
          }}
        >
          MAIN / <span style={{ color: '#e11d48' }}>TEACHERS</span>
        </div>

        <div style={{ padding: '12px 32px 24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: '#0f172a',
                  letterSpacing: '-0.02em',
                }}
              >
                Teacher Team
              </h1>
              <p style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>
                LinguaPro qualified teachers management panel
              </p>
            </div>
            <button
              onClick={handleAdd}
              style={{
                background: '#e11d48',
                color: '#fff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: 12,
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 12px rgba(225, 29, 72, 0.15)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#be123c'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#e11d48'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <svg
                width={16}
                height={16}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2.5}
              >
                <line x1='12' y1='5' x2='12' y2='19' />
                <line x1='5' y1='12' x2='19' y2='12' />
              </svg>
              New Teacher
            </button>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 20,
            padding: '0 32px',
          }}
        >
          {teachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDetail={handleDetail}
            />
          ))}
        </div>

        {/* KPI Section */}
        <div
          style={{
            margin: '40px 32px',
            background: 'linear-gradient(135deg, #e11d48 0%, #9f1239 100%)',
            borderRadius: 24,
            padding: '32px',
            display: 'flex',
            gap: 40,
            alignItems: 'center',
            color: '#fff',
            flexWrap: 'wrap',
            boxShadow: '0 20px 25px -5px rgba(225, 29, 72, 0.15)',
          }}
        >
          <div style={{ flex: 1, minWidth: 300 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
              Teachers Rating & KPI
            </h2>
            <p
              style={{
                fontSize: 14,
                opacity: 0.9,
                lineHeight: 1.6,
                maxWidth: 450,
              }}
            >
              {kpiData.description}
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button
                style={{
                  background: '#fff',
                  color: '#e11d48',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Hisobotni ko'rish
              </button>
              <button
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  padding: '10px 20px',
                  borderRadius: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Bonus tizimi
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              minWidth: 200,
            }}
          >
            <KpiStat
              label='Total teachers'
              value={`${kpiData.totalTeachers} ta`}
              percent={60}
            />
            <KpiStat
              label='Active groups'
              value={`${kpiData.activeGroups} ta`}
              percent={86}
            />
          </div>
        </div>
      </Main>

      {/* Modal */}
      <TeacherModal
        key={modalAction}
        teacher={selectedTeacher}
        isOpen={modalOpen}
        onClose={handleModalClose}
        action={modalAction}
        onConfirm={handleModalConfirm}
      />

      {/* Toast */}
      <ToastContainer />
    </>
  )
}

function KpiStat({
  label,
  value,
  percent,
}: {
  label: string
  value: string
  percent: number
}) {
  return (
    <div style={{ width: '100%' }}>
      <div
        style={{ fontSize: 12, opacity: 0.8, marginBottom: 6, fontWeight: 500 }}
      >
        {label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
        {value}
      </div>
      <div
        style={{
          height: 6,
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 10,
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            background: '#fff',
            borderRadius: 10,
          }}
        />
      </div>
    </div>
  )
}
