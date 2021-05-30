import React from "react";
import { Link } from "react-router-dom"
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost"

import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import TextsmsIcon from '@material-ui/icons/Textsms';

const EnterChat = ({ classes, roomName, roomId, usersCount }) => {
  return (
      <Link to={`/chat/${roomName}/${roomId}/room`}>
        <IconButton
            onClick={event => {event.stopPropagation()}}
            className={classes.iconButton}
        >
            { usersCount }
            <TextsmsIcon className={classes.icon} />
        </IconButton>
      </Link>

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
