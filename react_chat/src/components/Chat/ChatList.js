import React from "react";
import { Link } from "react-router-dom"

import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


const ChatList = ({ classes, rooms }) => (

    <List>
      { rooms.map(room => (
          <ExpansionPanel key={room.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <ListItem className={classes.root}>
                <ListItemText
                    primaryTypographyProps={{
                      variant: "subheading",
                      color: "primary"
                    }}
                    primary={room.name} secondary={room.description}>
                </ListItemText>
                <div>Description</div>
              </ListItem>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              <Typography variant="body1">
                {room.description}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
      ))}
    </List>
);

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap"
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
};

export default withStyles(styles)(ChatList);
