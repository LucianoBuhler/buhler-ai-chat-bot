import React from 'react'
import '../styles/ChatBotStart.css'

const ChatBotStart = ({ onStartChat }) => {
  return (
    <div className='start-page'>
        <button className="start-page-btn" onClick={onStartChat}>Ask Buhler AI</button>
    </div>
  )
}

export default ChatBotStart