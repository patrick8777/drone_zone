import React from "react"

const Chat = ({ sender, time, message, status }) => {
  return (
    <div
      className={`chat ${
        sender === "Obi-Wan Kenobi" ? "chat-start" : "chat-end"
      }`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img
            alt='Avatar'
            src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
          />
        </div>
      </div>
      <div className='chat-header'>
        {sender}
        <time className='text-xs opacity-50'>{time}</time>
      </div>
      <div className='chat-bubble'>{message}</div>
      <div className='chat-footer opacity-50'>{status}</div>
    </div>
  )
}

export default Chat
