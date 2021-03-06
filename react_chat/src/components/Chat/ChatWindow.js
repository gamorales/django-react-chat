import React, {useEffect, useRef, useState} from "react";

import { Query } from "react-apollo"
import { gql } from "apollo-boost"

import withStyles from "@material-ui/core/styles/withStyles";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReconnectingWebSocket from "reconnecting-websocket";

import ChatMessageHistory from "./ChatMessageHistory";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import Paper from "@material-ui/core/Paper";
import Loading from "../Shared/Loading";
import Error from "../Shared/Error";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import format from "date-fns/format";

const ChatWindow = ({ classes }) => {
    const roomName = window.location.pathname.split("/")[2];
    const roomId = window.location.pathname.split("/")[3];
    const inputEl = useRef()

    const chatSocket = new ReconnectingWebSocket(
        'ws://'
        + window.location.host.replace("3000", "8000")
        + `/ws/chats/${roomName}/${roomId}/`
    )

    useEffect(() => {
        chatSocket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log(data)

            const timeSend = format(data.time, "MMM Do, YYYY H:mm:ss")
            addNode(data.message, data.user, timeSend)
        }
        chatSocket.onclose = (event) => {
            console.error(`Chat socked closed unexpectedly. ${event}`)
        }
    }, [])

    const [message, setMessage] = useState("")

    /**
     * Automatic scroll to the bottom of the chat list
     */
    const scrollCard = () => {
        document.querySelector('#maincard').scrollTo({
            top:  document.querySelector('#maincard').scrollHeight,
            behavior: "smooth"
        })
    };

    /**
     * Adds a new node to the main chat list
     *
     * @param message
     * @param user
     * @param timeSend
     */
    const addNode = (message, user, timeSend) => {
        const ul = document.querySelector("#chat-list")
        const li = document.createElement("li")
        const p = document.createElement("p")
        const br = document.createElement("br")
        const small = document.createElement("small")
        small.appendChild(document.createTextNode(timeSend))
        p.setAttribute("style", "margin-bottom: 0px;")
        p.appendChild(document.createTextNode(message))
        p.appendChild(br)
        p.appendChild(small)
        li.setAttribute("class", "ChatMessageHistory-liStyles-162")
        li.setAttribute("style", "background-color: #ADD8E6;")
        li.appendChild(p)
        ul.appendChild(li)
        scrollCard()
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(message)
        chatSocket.send(JSON.stringify({
            'message': message,
            'user': document.querySelector('#user').innerHTML
        }));

        setMessage("")
        inputEl.current.focus()
    }

    return (
         <div className="container-fluid h-100">
             <Card>
                 <Typography variant="headline" className={classes.roomName} noWrap>
                     {roomName}
                 </Typography>
             </Card>
             <div className="row justify-content-center h-100">
                 <div className={`col-md-11 ${classes.marginCard}`}>
                     <div className={classes.card}>
                         <div className={`card-body ${classes.messages}`} id="maincard">
                             <Query query={GET_MESSAGES_QUERY} variables={{room: roomId}}>
                                 {({ data, loading, error}) => {
                                     if (loading) return <Loading />
                                     if (error) return <Error error={error} />

                                     const messages = data.messages
                                     return <ChatMessageHistory messages={messages} />
                                 }}
                             </Query>
                         </div>

                         <div className={`card-footer ${classes.card}`}>
                             <form onSubmit={event => handleSubmit(event)}>
                                <Paper className={classes.root} elevation={1}>
                                    <TextField
										id="text-message"
                                        fullWidth placeholder="Enter message..."
                                        InputProps={{disableUnderline: true}}
                                        onChange={event => setMessage(event.target.value)}
                                        value={message} inputRef={inputEl}
                                    />
                                    <IconButton
                                        disabled={ !message.trim() }
                                        type="submit">
                                      <SendIcon />
                                    </IconButton>
                                </Paper>
                             </form>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
    )
}

export const GET_MESSAGES_QUERY = gql`
    query($room: Int) {
        messages(room: $room) {
            id
            message
            command
            timeSend
            room {
              id
              name
            }
            user {
              id
              username
            }
        }
    }
`

const styles = theme => ({
    root: {
        padding: "2px 4px",
        margin: theme.spacing.unit,
        display: "flex",
        alignItems: "center"
    },
    marginCard: {
        marginTop: "17px",
        marginBottom: "20px"
    },
    messages: {
        overflowY: "auto",
        height: "700px"
    },
    roomName: {
        color: "black",
        fontSize: 30,
        margin: "auto",
        textAlign: "center"
    },
    card: {
        borderRadius: "15px",
        backgroundColor: "#eee"
    },
    formStyles: {
        display: 'flex',
    },
    inputStyles: {
        flex: '1 auto'
    },
    btnStyles: {
         backgroundColor: '#00d8ff',
         border: 'none',
         color: '#336699',
         textTransform: 'uppercase',
         letterSpacing: '0.05em',
         fontWeight: 'bold',
         fontSize: '0.8em'
    },
    windowStyles: {
        maxWidth: '40em',
        margin: '1rem auto'
    },
    details: {
        alignItems: "center"
    },
    link: {
        color: "#424242",
        textDecoration: "none",
        "&:hover": {
            color: "black"
        }
    }
})

export default withStyles(styles)(ChatWindow);
