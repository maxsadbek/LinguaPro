import { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Bell, BookOpen, MessageSquare, CheckCheck, Trash2, GraduationCap } from 'lucide-react'

export const Route = createFileRoute(
  '/_authenticated/teacher-dashboard/notifications'
)({
  component: NotificationsPage,
})

type Notification = {
  id: number
  title: string
  body: string
  time: string
  icon: 'bell' | 'message' | 'book' | 'linguapro'
  read: boolean
  category: string
  catKey: 'topshiriq' | 'chat' | 'linguapro'
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: 'Uyga vazifa muddati tugamoqda',
    body: 'IELTS Intensive: Writing Task 1 topshirish muddati bugun 21:00 da tugaydi.',
    time: '10 daqiqa oldin',
    icon: 'book',
    read: false,
    category: 'Topshiriq',
    catKey: 'topshiriq',
  },
  {
    id: 2,
    title: 'Yangi xabar',
    body: "Akramov dars qoldirilishi bo'yicha sizga xabar yubordi.",
    time: '1 soat oldin',
    icon: 'message',
    read: false,
    category: 'Chat',
    catKey: 'chat',
  },
  {
    id: 3,
    title: "Yo'qlama eslatmasi",
    body: "Bugungi dars uchun davomatni belgilash esingizdan chiqmasin.",
    time: '3 soat oldin',
    icon: 'linguapro',
    read: false,
    category: 'LinguaPro',
    catKey: 'linguapro',
  },
]

const iconConfig = {
  bell:      { icon: Bell,          color: 'text-violet-600', bg: 'bg-violet-50',  dot: 'bg-violet-500',  badge: 'bg-violet-50 text-violet-800'  },
  book:      { icon: BookOpen,      color: 'text-violet-600', bg: 'bg-violet-50',  dot: 'bg-violet-500',  badge: 'bg-violet-50 text-violet-800'  },
  message:   { icon: MessageSquare, color: 'text-teal-600',   bg: 'bg-teal-50',    dot: 'bg-teal-500',    badge: 'bg-teal-50 text-teal-800'      },
  linguapro: { icon: GraduationCap, color: 'text-rose-600',   bg: 'bg-rose-50',    dot: 'bg-rose-500',    badge: 'bg-rose-50 text-rose-800'      },
}

const accentBorder: Record<Notification['catKey'], string> = {
  topshiriq: 'border-l-violet-500',
  chat:      'border-l-teal-500',
  linguapro: 'border-l-rose-500',
}

function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications])

  const toggleRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Bildirishnomalar
          </h1>
          <p className="mt-1 text-slate-500 font-medium">
            {unreadCount > 0
              ? `Sizda ${unreadCount} ta o'qilmagan yangilik bor`
              : "Hamma xabarlar ko'zdan kechirildi"}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95"
          >
            <CheckCheck size={16} />
            Barchasini o'qilgan deb belgilash
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {notifications.length > 0 ? (
          notifications.map((n) => {
            const config = iconConfig[n.icon]
            const Icon = config.icon

            return (
              <div
                key={n.id}
                onClick={() => !n.read && toggleRead(n.id)}
                className={`group relative flex items-start gap-4 p-5 rounded-2xl border border-l-4 transition-all duration-200 cursor-pointer ${
                  n.read
                    ? 'bg-slate-50 border-slate-100 border-l-slate-200'
                    : `bg-white border-slate-100 ${accentBorder[n.catKey]} shadow-sm hover:shadow-md`
                }`}
              >
                {/* Icon */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                      n.read ? 'bg-slate-100 text-slate-400' : `${config.bg} ${config.color}`
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  {!n.read && (
                    <span
                      className={`absolute -top-1 -right-1 h-3 w-3 ${config.dot} border-2 border-white rounded-full`}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                        n.read ? 'bg-slate-200 text-slate-500' : config.badge
                      }`}
                    >
                      {n.category}
                    </span>
                    <span className="text-xs text-slate-400">{n.time}</span>
                  </div>

                  <h3
                    className={`text-sm leading-snug ${
                      n.read ? 'font-medium text-slate-500' : 'font-bold text-slate-900'
                    }`}
                  >
                    {n.title}
                  </h3>

                  <p
                    className={`mt-1 text-sm leading-relaxed ${
                      n.read ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {n.body}
                  </p>
                </div>

                {/* Delete */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteNotification(n.id)
                  }}
                  className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="O'chirish"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )
          })
        ) : (
          <div className="py-20 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 text-slate-300 mb-4">
              <Bell size={32} />
            </div>
            <h3 className="text-base font-bold text-slate-900">Hozircha xabarlar yo'q</h3>
            <p className="text-sm text-slate-400 mt-1">
              Yangi bildirishnomalar paydo bo'lganda shu yerda ko'rasiz.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}