import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { createFileRoute } from '@tanstack/react-router'
import { Search, Send, Paperclip, MoreVertical } from 'lucide-react'
import { conversations } from '@/features/chats/data/convo.json'

export const Route = createFileRoute(
  '/_authenticated/teacher-dashboard/messages'
)({
  component: MessagesPage,
})

function MessagesPage() {
  const [search, setSearch] = useState('')
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return conversations
    return conversations.filter((c) => c.fullName.toLowerCase().includes(q))
  }, [search])

  const [selectedId, setSelectedId] = useState<string>(() => {
    return filtered[0]?.id ?? conversations[0]?.id ?? ''
  })

  const selected = useMemo(() => {
    return conversations.find((c) => c.id === selectedId) ?? conversations[0]
  }, [selectedId])

  const selectedMessages = useMemo(() => {
    const msgs = [...(selected?.messages ?? [])]
    msgs.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
    return msgs
  }, [selected])

  const getInitials = (name: string) =>
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join('')

  return (
    <div>
      <div className='mb-6 md:mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Messages</h1>
        <p className='mt-1 md:mt-2 text-sm md:text-base text-gray-500'>
          Communicate with students and colleagues
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Conversations List */}
        <div className='col-span-1 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)] h-[400px] lg:h-[600px] flex flex-col'>
          <div className='relative mb-4'>
            <Search
              className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400'
              size={18}
            />
            <input
              type='text'
              placeholder='Search messages...'
              className='w-full rounded-lg bg-gray-100 py-2 pr-4 pl-10 text-sm focus:ring-2 focus:ring-[#b80035]/20 focus:outline-none'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className='space-y-2 overflow-y-auto flex-1 pr-2'>
            {filtered.map((conv) => {
              const last = conv.messages?.[0]
              const lastTime = last?.timestamp
                ? format(new Date(last.timestamp), 'MMM d')
                : ''
              const isActive = conv.id === selectedId

              return (
                <button
                  key={conv.id}
                  type='button'
                  onClick={() => setSelectedId(conv.id)}
                  className={`w-full rounded-xl p-3 text-left transition-colors ${
                    isActive ? 'bg-[#fff0f3]' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className='flex items-start gap-3'>
                    <div className='flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-sm font-semibold text-gray-800'>
                      {conv.profile ? (
                        <img
                          src={conv.profile}
                          alt={conv.fullName}
                          className='h-full w-full object-cover'
                        />
                      ) : (
                        getInitials(conv.fullName)
                      )}
                    </div>
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-center justify-between'>
                        <span className='font-semibold text-gray-800'>
                          {conv.fullName}
                        </span>
                        <span className='text-xs text-gray-500'>
                          {lastTime}
                        </span>
                      </div>
                      <p className='mt-1 truncate text-sm text-gray-600'>
                        {last?.message ?? ''}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Chat Window */}
        <div className='col-span-1 lg:col-span-2 rounded-2xl bg-white p-4 md:p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)] flex flex-col h-[500px] lg:h-[600px]'>
          <div className='mb-6 flex items-center justify-between border-b border-gray-200 pb-4'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-sm font-semibold text-gray-800'>
                {selected?.profile ? (
                  <img
                    src={selected.profile}
                    alt={selected.fullName}
                    className='h-full w-full object-cover'
                  />
                ) : (
                  getInitials(selected?.fullName ?? '')
                )}
              </div>
              <div>
                <h3 className='font-semibold text-gray-800'>
                  {selected?.fullName ?? ''}
                </h3>
                <p className='text-xs text-gray-500'>{selected?.title ?? ''}</p>
              </div>
            </div>
            <button className='text-gray-400 hover:text-gray-600'>
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className='mb-4 flex-1 space-y-4 overflow-y-auto pr-2'>
            {selectedMessages.map((m, idx) => {
              const isMe = m.sender === 'You'
              return (
                <div
                  key={`${m.sender}-${m.timestamp}-${idx}`}
                  className={isMe ? 'flex justify-end' : 'flex justify-start'}
                >
                  <div
                    className={
                      isMe
                        ? 'max-w-md rounded-2xl rounded-tr-none bg-[#b80035] px-4 py-3'
                        : 'max-w-md rounded-2xl rounded-tl-none bg-gray-100 px-4 py-3'
                    }
                  >
                    <p
                      className={
                        isMe ? 'text-sm text-white' : 'text-sm text-gray-800'
                      }
                    >
                      {m.message}
                    </p>
                    <p
                      className={
                        isMe
                          ? 'mt-1 text-xs text-white/80'
                          : 'mt-1 text-xs text-gray-500'
                      }
                    >
                      {format(new Date(m.timestamp), 'h:mm a')}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Input */}
          <div className='flex items-center gap-2 rounded-xl border border-gray-200 p-2'>
            <button className='rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600'>
              <Paperclip size={20} />
            </button>
            <input
              type='text'
              placeholder='Type a message...'
              className='flex-1 bg-transparent py-2 text-sm focus:outline-none'
            />
            <button className='primary-gradient flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg'>
              <Send size={16} />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
