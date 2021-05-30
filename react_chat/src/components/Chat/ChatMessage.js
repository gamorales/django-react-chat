import React from "react";

const ChatMessage = ({ message, user }) => {
   return(
      <p style={{marginBottom: 0}}>
         {message}<br/>
         <small>{user}</small>
      </p>
   )
}

export default ChatMessage

