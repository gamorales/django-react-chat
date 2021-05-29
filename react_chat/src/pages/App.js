import React, { useState } from "react";
import { Query } from "react-apollo"
import { gql } from "apollo-boost"

import withStyles from "@material-ui/core/styles/withStyles";

import ChatList from "../components/Chat/ChatList";
import SearchChats from "../components/Chat/SearchChats"
import Loading from "../components/Shared/Loading";
import Error from "../components/Shared/Error";

const App = ({ classes }) => {
  const [searchResults, setSearchResults] = useState([])

  return (
      <div className={classes.container}>
        <SearchChats setSearchResults={setSearchResults} />
        <Query query={GET_ROOMS_QUERY}>
            {({ data, loading, error}) => {
                if (loading) return <Loading />
                if (error) return <Error error={error} />

                // Validate if there's a search to update the Chat list
                const rooms = searchResults.length > 0 ? searchResults : data.rooms
                return <ChatList rooms={rooms} />
            }}
        </Query>
      </div>
  );
};

export const GET_ROOMS_QUERY = gql`
    query getRoomsQuery {
        rooms {
            id
            name
            description
            createdAt
        }
    }
`

const styles = theme => ({
  container: {
    margin: "0 auto",
    maxWidth: 960,
    padding: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(App);
