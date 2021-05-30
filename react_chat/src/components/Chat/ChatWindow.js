import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import 'bootstrap/dist/css/bootstrap.min.css';

import ChatMessageHistory from "./ChatMessageHistory";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import Paper from "@material-ui/core/Paper";

const ChatWindow = ({ classes }) => {
    const MESSAGES = [
        { id:1, message: 'Hi Josh', user: 'Guillermo' },
        { id:2, message: 'How are you?', user: 'Admin' },
        { id:3, message: 'Hi Josh', user: 'Guillermo' },
        { id:4, message: 'How are you?', user: 'Admin' },
        { id:5, message: 'Hi Josh', user: 'Guillermo' },
        { id:6, message: 'How are you?', user: 'Admin' },
        { id:7, message: 'Hi Josh', user: 'Guillermo' },
        { id:8, message: 'How are you?', user: 'Admin' },
        { id:9, message: 'Hi Josh', user: 'Guillermo' },
        { id:10, message: 'How are you?', user: 'Admin' },
        { id:11, message: 'Hi Josh', user: 'Guillermo' },
        { id:12, message: 'How are you?', user: 'Admin' },
        { id:13, message: 'Hi Josh', user: 'Guillermo' },
        { id:14, message: 'How are you?', user: 'Admin' },
        { id:15, message: 'Hi Josh', user: 'Guillermo' },
        { id:16, message: 'How are you?', user: 'Admin' },
        { id:17, message: 'How are you?', user: 'Admin' },
        { id:18, message: 'How are you?', user: 'Admin' },
        { id:19, message: 'How are you?', user: 'Admin' },
        { id:20, message: 'How are you?', user: 'Admin' },

    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextMessages = this.state.messages.concat([{ message: this.state.inputText, timestamp: 'Thursday' }]);
        const nextInputText = '';
        //this.setState({ messages: nextMessages, inputText: nextInputText });
    }

    return (
         <div className="container-fluid h-100">
             <div className="row justify-content-center h-100">
                 <div className={`col-md-11 ${classes.marginCard}`}>
                     <div className={classes.card} >
                         <div className={`card-body ${classes.messages}`}>
                             <ChatMessageHistory messages={MESSAGES} />
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
