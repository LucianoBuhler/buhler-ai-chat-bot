import React, { useState, useEffect, useRef } from 'react'
import { getChatGPTResponse } from '../services/chatAPI';
import '../styles/ChatBotApp.css'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

// Define types for ChatMessage and Chat
interface ChatMessage {
  type: 'prompt' | 'response';
  text: string;
  timestamp: string;
}

interface Chat {
  id: string;
  displayId: string;
  messages: ChatMessage[];
}

// Define types for component props
interface ChatBotAppProps {
  onGoBack: () => void;
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  activeChat: string | null;
  setActiveChat: React.Dispatch<React.SetStateAction<string | null>>;
  onNewChat: (initialMessage?: string) => void;
}

const ChatBotApp:React.FC<ChatBotAppProps> = ({ onGoBack, chats, setChats, activeChat, setActiveChat, onNewChat }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)
  const [showChatList, setShowChatList] = useState<boolean>(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)
  
  useEffect(() => {
    const activeChatObj:ChatMessage = chats.find((chat) => chat.id === activeChat)
    setMessages(activeChatObj ? activeChatObj.messages : [])
  }, [activeChat, chats])
  
    useEffect(() => {
      if(activeChat) {
        const storedMessages:ChatMessage[] = JSON.parse(localStorage.getItem(activeChat)) || []
        setMessages(storedMessages)
      }
    }, [activeChat])

  const handleEmojiSelect = (emoji: any) => {
    setInputValue((prevInput) => prevInput + emoji.native)
  }

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const sendMessage = async () => {
    if (inputValue.trim() === '') return

    const newMessage:ChatMessage = {
      type: 'prompt',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    }

    if (!activeChat) {
      onNewChat(inputValue)
      setInputValue('')
    } else {
      const updatedMessages = [...messages, newMessage]
      setMessages(updatedMessages)
      localStorage.setItem(activeChat, JSON.stringify(updatedMessages))
      setInputValue('')

      const updatedChats = chats.map((chat) => {
        if (chat.id === activeChat) {
          return { ...chat, messages: updatedMessages }
        }
        return chat
      })
      setChats(updatedChats)
      localStorage.setItem('chats', JSON.stringify(updatedChats))
      setIsTyping(true)

      try {
        const chatResponse = await getChatGPTResponse(inputValue);
        const newResponse:ChatMessage = {
          type: 'response',
          text: chatResponse,
          timestamp: new Date().toLocaleTimeString(),
        }
  
        const updatedMessagesWithResponse = [...updatedMessages, newResponse]
        setMessages(updatedMessagesWithResponse)
        localStorage.setItem(activeChat, JSON.stringify(updatedMessagesWithResponse))

        setIsTyping(false)

        const updatedChatsWithResponse = chats.map((chat) => {
          if (chat.id === activeChat) {
            return { ...chat, messages: updatedMessagesWithResponse }
          }
          return chat
        })
        setChats(updatedChatsWithResponse)
        localStorage.setItem('chats', JSON.stringify(updatedChatsWithResponse))
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleSelectChat = (id:string) => {
    setActiveChat(id)
  }

  const handleDeleteChat = (id:string) => {
    const updatedChats = chats.filter((chat) => chat.id !== id)
    setChats(updatedChats)
    localStorage.setItem('chats', JSON.stringify(updatedChats))
    localStorage.removeItem(id)

    if (id === activeChat) {
      const newActiveChat = updatedChats.length > 0 ? updatedChats[0].id : null
      setActiveChat(newActiveChat)
    }
  }

  // scrool the messages to the end once change between chats
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="chat-app">
      <div className={`chat-list ${showChatList ? 'show': ''}`}>
        <div className="chat-list-header">
          <h2>Chat List</h2>
          <i className="bx bx-edit-alt new-chat"  onClick={() => onNewChat()}></i>
          <i className="bx bx-x-circle close" onClick={() => setShowChatList(false)}></i>
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
            <i className="bx bx-menu" onClick={() => setShowChatList(true)}></i>
            <i className="bx bx-arrow-back arrow" onClick={onGoBack}></i>
        </div>
        <div className="chat">
          {messages.map((msg, index) => (
            <div key={index} className={msg.type === 'prompt' ? 'prompt' : 'response'}>
              {msg.text} <span>{msg.timestamp}</span>
            </div>
          ))}
          {isTyping && <div className="typing">Typing...</div>}
          <div ref={chatEndRef}></div>
        </div>
        <form className="msg-form" onSubmit={(e) => e.preventDefault()}>
          <i className="fa-solid fa-face-smile emoji" onClick={() => setShowEmojiPicker((prev) => !prev)}></i>
          {showEmojiPicker && (
            <div className='picker'>
              <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            </div>
          )}
          <input
            type="text"
            className='msg-input'
            placeholder='Type a message...'
            value={inputValue}
            onChange={handleInputChange} 
            onKeyDown={handleKeyDown}
            onFocus={() => setShowEmojiPicker(false)}
          />
          <i className="fa-solid fa-paper-plane" onClick={sendMessage}></i>
        </form>
      </div>
    </div>
  )
}

export default ChatBotApp
