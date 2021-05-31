import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import ChatMessage from "./ChatMessage";

const ChatMessageHistory = ({ classes, messages }) => {
    return (
        <ul className={classes.ulStyles}>
            { messages.map((message, index) => (
                <li key={message.id} className={classes.liStyles}
                    style={{ backgroundColor: ( index % 2 === 1 ) ? '#ADD8E6' : '#87CEFA', }}>
                    <ChatMessage messageData={message} />
                </li>
            ))}
        </ul>
    )
}

const styles = {
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    liStyles: {
        padding: '1rem',
        borderBottom: '1px solid #ddd'
    },
    ulStyles: {
        listStyle: 'none',
        margin: 0,
        padding: 0
    }
};

export default withStyles(styles)(ChatMessageHistory);