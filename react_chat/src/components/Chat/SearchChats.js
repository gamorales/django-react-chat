import React, { useState, useRef } from "react";
import { ApolloConsumer } from "react-apollo";
import { gql } from "apollo-boost"

import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import ClearIcon from "@material-ui/icons/Clear";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";


const SearchChats = ({ classes, setSearchResults }) => {
  const [search, setSearch] = useState("")
  const inputEl = useRef()

  // Clean the search, clean the input field and let the focus in it.
  const clearSearchInput = () => {
    setSearchResults([])
    setSearch("")
    inputEl.current.focus()
  }

  const handleSubmit = async (event, client) => {
    event.preventDefault()

    const resp = await client.query({
      query: SEARCH_ROOMS_QUERY,
      variables: { search }
    })

    // Update the results to show in the chat list.
    setSearchResults(resp.data.rooms)
  }

  return (
      <ApolloConsumer>
          {client => (
            <form onSubmit={event => handleSubmit(event, client)}>
              <Paper className={classes.root} elevation={1}>
                <IconButton onClick={clearSearchInput}>
                  <ClearIcon />
                </IconButton>
                <TextField
                    fullWidth placeholder="Search rooms..."
                    InputProps={{
                      disableUnderline: true
                    }}
                    onChange={event => setSearch(event.target.value)}
                    value={search} inputRef={inputEl}
                />
                <IconButton type="submit">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </form>
          )}
      </ApolloConsumer>
  )
};

const SEARCH_ROOMS_QUERY = gql `
  query($search: String) {
        rooms(search: $search) {
            id
            name
            description
            createdAt
        }
  }
`

const styles = theme => ({
  root: {
    padding: "2px 4px",
    margin: theme.spacing.unit,
    display: "flex",
    alignItems: "center"
  }
});

export default withStyles(styles)(SearchChats);
