import React, { useState, useEffect } from 'react'
import './ChatBotApp.css'

const ChatBotApp = ({ onGoBack, chats, setChats, activeChat, setActiveChat, onNewChat }) => {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState(chats[0]?.messages || [])

  useEffect(() => {
    const activeChatObj = chats.find((chat) => chat.id === activeChat)
    setMessages(activeChatObj ? activeChatObj.messages : [])
  }, [activeChat, chats])

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const sendMessage = () => {
    if (inputValue.trim() === '') return

    const newMessage = {
      type: 'prompt',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    }
    
    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    setInputValue('')

    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChatå) {
        return { ...chat, messages: updatedMessages }
      }
      return chat
    })
    setChats(updatedChats)
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleSelectChat = (id) => {
    setActiveChat(id)
  }

  const handleDeleteChat = (id) => {
    const updatedChats = chats.filter((chat) => chat.id !== id)
    setChats(updatedChats)
    // localStorage.setItem('chats', JSON.stringify(updatedChats))
    // localStorage.removeItem(id)

    if (id === activeChat) {
      const newActiveChat = updatedChats.length > 0 ? updatedChats[0].id : null
      setActiveChat(newActiveChat)
    }
  }

  return (
    <div className="chat-app">
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Chat List</h2>
          <i className="bx bx-edit-alt new-chat" onClick={onNewChat}></i>
        </div>
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-list-item ${chat.id === activeChat ? 'active' : ''}`}
            onClick={() => handleSelectChat(chat.id)}
          >
            <h4>{chat.displayId}</h4>
            <i
              className="bx bx-x-circle"
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteChat(chat.id)
              }}
            ></i>
          </div>
        ))}
      </div>
      <div className="chat-window">
        <div className="chat-title">
            <h3>Chat with AI</h3>
            <i className="bx bx-arrow-back arrow" onClick={onGoBack}></i>
        </div>
        <div className="chat">
          {messages.map((msg, index) => (
            <div key={index} className={msg.type === 'prompt' ? 'prompt' : 'response'}>
              {msg.text} <span>{msg.timestamp}</span>
            </div>
          ))}

          {/* <div className="response">
            Hello! I'm just a computer program, so, I don't have feelings, but I'm here and ready to assist you. How can I help you today? <span>12:12:13</span>
          </div> */}
          <div className="typing">Typing...</div>
        </div>
        <form className="msg-form" onSubmit={(e) => e.preventDefault()}>
          <i className="fa-solid fa-face-smile emoji"></i>
          <input
            type="text"
            className='msg-input'
            placeholder='Type a message...'
            value={inputValue}
            onChange={handleInputChange} 
            onKeyDown={handleKeyDown}
          />
          <i className="fa-solid fa-paper-plane" onClick={sendMessage}></i>
        </form>
      </div>
    </div>
  )
}

export default ChatBotApp