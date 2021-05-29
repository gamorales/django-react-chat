import React from "react";
import { Link } from "react-router-dom"

import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from "@material-ui/core/Typography";

import Signout from "../Auth/Signout";

const Header = ({ classes, currentUser }) => {
  return (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Link to="/" className={classes.grow}>
            <QuestionAnswerIcon className={classes.logo} color="secondary" />
            <Typography variant="headline" color="secondary" noWrap>
              Chat Rooms
            </Typography>
          </Link>

          {currentUser && (
              <Link to={`/profile/${currentUser.id}`} className={classes.grow}>
                <AccountCircleIcon className={classes.faceIcon} />
                <Typography variant="headline" className={classes.username} noWrap>
                  {currentUser.username}
                </Typography>
              </Link>
          )}

          <Signout />
        </Toolbar>
      </AppBar>
  );
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 0,
    padding: 0
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    textDecoration: "none"
  },
  logo: {
    marginRight: theme.spacing.unit,
    fontSize: 45
  },
  faceIcon: {
    marginRight: theme.spacing.unit,
    fontSize: 30,
    color: "white"
  },
  username: {
    color: "white",
    fontSize: 30
  }
});

export default withStyles(styles)(Header);
