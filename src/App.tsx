import React, { useEffect, useState } from 'react'
import ChatBotStart from './components/ChatBotStart'
import ChatBotApp from './components/ChatBotApp'
import { v4 as uuidv4 } from 'uuid';

// Define type for a single chat message
interface ChatMessage {
  type: 'prompt';
  text: string;
  timestamp: string; // Alternatively, Date type could be used with additional parsing
}

// Define type for a chat
interface Chat {
  id: string;
  displayId: string;
  messages: ChatMessage[];
}


const App:React.FC = () => {
  const [isChatting, setIsChatting] = useState<boolean>(false)
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChat, setActiveChat] = useState<string>(null)

  useEffect(() => {
    const storedChats:Chat[] = JSON.parse(localStorage.getItem('chats')) || []
    setChats(storedChats)

    if (storedChats.length > 0) {
      setActiveChat(storedChats[0].id)
    }
  }, [])

  const handleStartChat = () => {
    setIsChatting(true)

    if (chats.length === 0) {
      createNewChat()
    }
  }

  const handleGoBack = () => {
    setIsChatting(false)
  }

  const createNewChat = (initialMessage:string = '') => {
    const newChat = {
      id: uuidv4(),
      displayId: `Chat ${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString()}`,
      messages: initialMessage
        ? [{ type: 'prompt', text: initialMessage, timestamp: new Date().toLocaleTimeString() }]
        : [],
    }

    const updatedChats = [newChat, ...chats]
    setChats(updatedChats)
    localStorage.setItem('chats', JSON.stringify(updatedChats))
    localStorage.setItem(newChat.id, JSON.stringify(newChat.messages))
    setActiveChat(newChat.id)
  }

  return (
    <div className="container">
      {isChatting ? (
        <ChatBotApp
          onGoBack={handleGoBack}
          chats={chats}
          setChats={setChats} 
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          onNewChat={createNewChat}
        />
      ) : (
        <ChatBotStart onStartChat={handleStartChat} />
      )}
    </div>
  )
}

export default App 