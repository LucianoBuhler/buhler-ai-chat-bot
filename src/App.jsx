import React, { useState } from 'react'
import ChatBotStart from './Components/ChatBotStart'
import ChatBotApp from './Components/ChatBotApp'

const App = () => {
  const [isChatting, setIsChatting] = useState(false)


  const handleStartChat = () => {
    setIsChatting(true)

    if (chats.length === 0) {
      createNewChat()
    }
  }

  const handleGoBack = () => {
    setIsChatting(false)
  }

  return (
    <div className="container">
      {isChatting ? (
        <ChatBotApp onGoBack={handleGoBack} />
      ) : (
        <ChatBotStart onStartChat={handleStartChat} />
      )}
    </div>
  )
}

export default App 