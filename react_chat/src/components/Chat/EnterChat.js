import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost"

import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';

const EnterChat = ({ classes, roomId, usersCount }) => {
  return (
      <IconButton onClick={event => {
        event.stopPropagation()
        }} className={classes.iconButton}>
          { usersCount }
          <SendIcon className={classes.icon} />
      </IconButton>
  );
};

const styles = theme => ({
  iconButton: {
    color: "dodgerblue"
  },
  icon: {
    marginLeft: theme.spacing.unit / 2
  }
});

export default withStyles(styles)(EnterChat);
