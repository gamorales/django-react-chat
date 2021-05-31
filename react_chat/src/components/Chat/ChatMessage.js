import React from "react";
import format from "date-fns/format";

const ChatMessage = ({ messageData }) => {
   return(
      <p style={{marginBottom: 0}}>
         {messageData.message}<br/>
         <small>
             {format(
                  messageData.timeSend,
                  "MMM Do, YYYY H:mm:ss"
             )}
         </small>
      </p>
   )
}

export default ChatMessage

