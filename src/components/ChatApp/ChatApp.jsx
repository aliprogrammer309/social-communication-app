import React from 'react'
import Sidebar from '../ChatApp/Sidebar'
import Chat from '../ChatApp/Chat'
import "../../style.scss";
const ChatApp = () => {
  return (
    <div className='home'>
      <div className="chat-container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default ChatApp