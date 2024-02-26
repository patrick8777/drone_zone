import React from "react"
import Chat from "./chat"

const ChatApp = () => {
  return (
    <div>
      <Chat
        sender='Obi-Wan Kenobi'
        time='12:45'
        message='You were the Chosen One!'
        status='Delivered'
      />
      <Chat
        sender='Anakin'
        time='12:46'
        message='I hate you!'
        status='Seen at 12:46'
      />
    </div>
  )
}

export default ChatApp
