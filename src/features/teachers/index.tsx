import { useState } from 'react'

const mockTeachers = [
  {
    id: 1,
    name: 'Dildora Karimova',
    initials: 'DK',
    subject: 'IELTS Expert',
    badgeColor: { bg: '#fff0f1', text: '#a01020', border: '#e8273a', avatarBg: '#fff0f1', avatarFill: '#f5b8c0' },
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
    badgeColor: { bg: '#eef3ff', text: '#1e3a99', border: '#3a5bd9', avatarBg: '#eef3ff', avatarFill: '#a0b8f0' },
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
    badgeColor: { bg: '#edfaf3', text: '#0a6b3f', border: '#1aaa6c', avatarBg: '#edfaf3', avatarFill: '#80d4ae' },
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
    badgeColor: { bg: '#fff5eb', text: '#92500a', border: '#d97706', avatarBg: '#fff5eb', avatarFill: '#f0c070' },
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
    badgeColor: { bg: '#f3eeff', text: '#4e1a99', border: '#7c3aed', avatarBg: '#f3eeff', avatarFill: '#c0a8f0' },
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
    "O'tgan oy davomida ustozlarning o'rtacha reytingi 12% ga oshdi. IELTS natijalari bo'yicha eng yuqori ko'rsatkich — 8.5 ball.",
}

function StarIcon({ size = 10, fill = '#e8c84a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#e8273a" strokeWidth={2}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.91 14a16 16 0 006.09 6.09l.41-.41a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function DetailIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

function DeleteIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  )
}

function AvatarSilhouette({ fill }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" width={28} height={28}>
      <circle cx="20" cy="15" r="8" fill={fill} />
      <ellipse cx="20" cy="33" rx="12" ry="7" fill={fill} />
    </svg>
  )
}

function TeacherCard({ teacher, onEdit, onDelete, onDetail }) {
  const { name, subject, badgeColor, phone, groups, experience, rating } = teacher

  return (
    <div
      style={{
        background: '#fff',
        border: '0.5px solid #e5e7eb',
        borderRadius: 14,
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        position: 'relative',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
    >
      {/* Rating badge */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          fontSize: 11,
          fontWeight: 500,
          color: '#b07a00',
          background: '#fdf3d7',
          border: '0.5px solid #e8c84a',
          borderRadius: 20,
          padding: '2px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <StarIcon />
        {rating}
      </div>

      {/* Avatar + Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: `2px solid ${badgeColor.border}`,
            background: badgeColor.avatarBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <AvatarSilhouette fill={badgeColor.avatarFill} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1d2e', lineHeight: 1.3 }}>{name}</div>
          <span
            style={{
              display: 'inline-block',
              marginTop: 4,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              borderRadius: 6,
              padding: '2px 7px',
              background: badgeColor.bg,
              color: badgeColor.text,
            }}
          >
            {subject}
          </span>
        </div>
      </div>

      {/* Phone */}
      <div style={{ fontSize: 12, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 6 }}>
        <PhoneIcon />
        {phone}
      </div>

      {/* Divider */}
      <div style={{ borderTop: '0.5px solid #e5e7eb' }} />

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingRight: 10, borderRight: '0.5px solid #e5e7eb' }}>
          <span style={{ fontSize: 10, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Guruhlar</span>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#1a1d2e' }}>
            {groups} <span style={{ fontSize: 11, fontWeight: 400, color: '#9ca3af' }}>ta</span>
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingLeft: 10 }}>
          <span style={{ fontSize: 10, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tajriba</span>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#1a1d2e' }}>
            {experience} <span style={{ fontSize: 11, fontWeight: 400, color: '#9ca3af' }}>yil</span>
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '0.5px solid #e5e7eb' }} />

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 6 }}>
        <ActionButton onClick={() => onEdit(teacher)} color="blue" icon={<EditIcon />} label="Tahrirlash" />
        <ActionButton onClick={() => onDetail(teacher)} color="purple" icon={<DetailIcon />} label="Detail" />
        <ActionButton onClick={() => onDelete(teacher)} color="red" icon={<DeleteIcon />} label="O'chirish" />
      </div>
    </div>
  )
}

const hoverColors = {
  blue: { color: '#1d4ed8', border: '#93c5fd' },
  purple: { color: '#7c3aed', border: '#c4b5fd' },
  red: { color: '#dc2626', border: '#fca5a5' },
}

function ActionButton({ onClick, color, icon, label }) {
  const [hovered, setHovered] = useState(false)
  const c = hoverColors[color]
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        border: hovered ? `0.5px solid ${c.border}` : '0.5px solid #d1d5db',
        background: hovered ? '#f9fafb' : '#fff',
        borderRadius: 8,
        padding: '6px 0',
        fontSize: 11,
        fontWeight: 500,
        cursor: 'pointer',
        color: hovered ? c.color : '#6b7280',
        transition: 'all 0.13s',
        fontFamily: 'inherit',
      }}
    >
      {icon}
      {label}
    </button>
  )
}

function AddCard({ onAdd }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onAdd}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#fff5f5' : '#fff',
        border: `1.5px dashed ${hovered ? '#e8273a' : '#d1d5db'}`,
        borderRadius: 14,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        minHeight: 200,
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1d2e' }}>Yangi ustoz qo'shish</div>
      <div style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center', maxWidth: 120, lineHeight: 1.5 }}>
        Barcha ma'lumotlarni kiritish uchun bosing
      </div>
    </div>
  )
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState(mockTeachers)

  const handleEdit = (teacher) => {
    // TODO: open edit modal / navigate to edit page
    console.log('Edit:', teacher)
  }

  const handleDelete = (teacher) => {
    // TODO: call DELETE /api/teachers/:id
    setTeachers((prev) => prev.filter((t) => t.id !== teacher.id))
  }

  const handleDetail = (teacher) => {
    // TODO: navigate to /teachers/:id
    console.log('Detail:', teacher)
  }

  const handleAdd = () => {
    // TODO: open add modal / navigate to add page
    console.log('Add new teacher')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fb', fontFamily: 'inherit' }}>
      {/* Breadcrumb */}
      <div style={{ padding: '18px 28px 0', fontSize: 11, color: '#9ca3af', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        Asosiy /{' '}
        <span style={{ color: '#e8273a', fontWeight: 700 }}>Ustozlar</span>
      </div>

      {/* Header */}
      <div style={{ padding: '10px 28px 20px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a1d2e' }}>Ustozlar Jamoasi</h1>
        <p style={{ fontSize: 13, color: '#6b7280', marginTop: 3 }}>
          LinguaPro o'quv markazining malakali o'qituvchilari boshqaruvi
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
          gap: 16,
          padding: '0 28px',
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
        <AddCard onAdd={handleAdd} />
      </div>

      {/* KPI Section */}
      <div
        style={{
          margin: '24px 28px 28px',
          background: 'linear-gradient(120deg, #e8273a 0%, #b01e2e 100%)',
          borderRadius: 16,
          padding: '24px 28px',
          display: 'flex',
          gap: 32,
          alignItems: 'center',
          color: '#fff',
          flexWrap: 'wrap',
        }}
      >
        {/* Left */}
        <div style={{ flex: 1, minWidth: 240 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Ustozlar Reytingi &amp; KPI</h2>
          <p style={{ fontSize: 12.5, opacity: 0.85, lineHeight: 1.6, maxWidth: 340 }}>{kpiData.description}</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button
              style={{
                border: 'none',
                borderRadius: 22,
                padding: '8px 18px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                background: '#fff',
                color: '#e8273a',
                fontFamily: 'inherit',
              }}
            >
              Hisobotni ko'rish
            </button>
            <button
              style={{
                border: '1.5px solid rgba(255,255,255,0.6)',
                borderRadius: 22,
                padding: '8px 18px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                background: 'transparent',
                color: '#fff',
                fontFamily: 'inherit',
              }}
            >
              Bonus tizimi
            </button>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 190 }}>
          <KpiStat
            label="Jami ustozlar"
            value={`${kpiData.totalTeachers} ta`}
            percent={Math.round((kpiData.totalTeachers / kpiData.totalTeachersMax) * 100)}
          />
          <KpiStat
            label="Faol guruhlar"
            value={`${kpiData.activeGroups} ta`}
            percent={Math.round((kpiData.activeGroups / kpiData.activeGroupsMax) * 100)}
          />
        </div>
      </div>
    </div>
  )
}

function KpiStat({ label, value, percent }) {
  return (
    <div>
      <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700 }}>{value}</div>
      <div style={{ height: 5, borderRadius: 4, background: 'rgba(255,255,255,0.22)', marginTop: 5 }}>
        <div style={{ width: `${percent}%`, height: '100%', borderRadius: 4, background: '#fff' }} />
      </div>
    </div>
  )
}
