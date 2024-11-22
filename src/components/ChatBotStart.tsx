import React from 'react'
import '../styles/ChatBotStart.css'

// Define a type for the props
interface ChatBotStartProps {
  onStartChat: () => void; // Function type for the onStartChat prop
}

const ChatBotStart:React.FC<ChatBotStartProps> = ({ onStartChat }) => {
  return (
    <div className='start-page'>
        <button className="start-page-btn" onClick={onStartChat}>Ask Buhler AI</button>
    </div>
  )
}

export default ChatBotStart