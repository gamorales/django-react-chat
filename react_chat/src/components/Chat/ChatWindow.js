import React from "react";
import { Query } from "react-apollo"
import { gql } from "apollo-boost"

import withStyles from "@material-ui/core/styles/withStyles";
import 'bootstrap/dist/css/bootstrap.min.css';

import ChatMessageHistory from "./ChatMessageHistory";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import Paper from "@material-ui/core/Paper";
import Loading from "../Shared/Loading";
import Error from "../Shared/Error";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

const ChatWindow = ({ classes }) => {
    const roomName = window.location.pathname.split("/")[2];
    const roomId = window.location.pathname.split("/")[3];

    const chatSocket = new WebSocket(
        'ws://'
        + window.location.host.replace("3000", "8000")
        + `/ws/chats/${roomName}/${roomId}/`
    );

    //console.log(chatSocket)

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextMessages = this.state.messages.concat([{ message: this.state.inputText, timestamp: 'Thursday' }]);
        const nextInputText = '';
        //this.setState({ messages: nextMessages, inputText: nextInputText });
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
                     <div className={classes.card} >
                         <div className={`card-body ${classes.messages}`}>
                             <Query query={GET_MESSAGES_QUERY} variables={{room: roomId}}>
                                 {({ data, loading, error}) => {
                                     if (loading) return <Loading />
                                     if (error) return <Error error={error} />

                                     // Validate if there's a search to update the Chat list
                                     const messages = data.messages
                                     return <ChatMessageHistory messages={messages} />
                                 }}
                             </Query>
                         </div>

                         <div className={`card-footer ${classes.card}`}>
                             <form onSubmit={event => handleSubmit(event)}>
                                <Paper className={classes.root} elevation={1}>
                                    <TextField
                                        fullWidth placeholder="Enter message..."
                                        InputProps={{disableUnderline: true}}
                                    />
                                    <IconButton type="submit">
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
            room {
              id
              name
            }
            user {
              id
              username
            }
            message
            command
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