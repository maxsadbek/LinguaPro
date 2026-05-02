import { useEffect, useState } from 'react'
import { HomeworkChatArea } from '@/components/student/homework/HomeworkChatArea'
import { homeworkService } from '@/services/homework.service'
import { Homework, HomeworkMessage } from '@/types/student'

export default function HomeworkPage() {
  const [homeworkList, setHomeworkList] = useState<Homework[]>([])
  const [messages, setMessages] = useState<HomeworkMessage[]>([])

  useEffect(() => {
    // Initial fetch
    homeworkService.getHomeworkList().then(setHomeworkList)
  }, [])

  const handleSendMessage = (text: string) => {
    // Optimistic UI update and API call
    const newMessage: HomeworkMessage = {
      id: Date.now().toString(),
      homeworkId: '1',
      senderId: 'me',
      senderName: 'Student',
      senderAvatar: '',
      senderRole: 'student',
      content: text,
      timestamp: new Date().toLocaleTimeString(),
      isRead: false,
      type: 'text'
    }
    setMessages([...messages, newMessage])
    // API call would go here
  }

  return (
    <div className='p-0 m-0 h-screen'>
      <HomeworkChatArea 
        homeworkList={homeworkList} 
        messages={messages} 
        onSendMessage={handleSendMessage} 
      />
    </div>
  )
}
