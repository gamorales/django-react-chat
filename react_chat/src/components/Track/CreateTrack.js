import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Error from "../Shared/Error";

import { GET_TRACKS_QUERY } from "../../pages/App"

const CreateTrack = ({ classes }) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState("")

  const handleImageChange = event => {
      event.preventDefault()
      const selectedFile = event.target.files[0]
      setFile(selectedFile)
  }

  const handleSubmit = async (event, createTrack) => {
      event.preventDefault();
      createTrack({
          variables: { title, description, url: `/tmp/images/${file.name}` }
      })
  }

  return (
      <>
        <Button onClick={() => setOpen(true)} variant="fab" className={classes.fab} color="secondary">
          { open ? <ClearIcon /> : <AddIcon /> }
        </Button>

        <Mutation
            mutation={CREATE_TRACK_MUTATION}
            onCompleted={ data => {
                console.log({data})
                setOpen(false)
                setTitle("")
                setDescription("")
                setFile("")
            }}
            refetchQueries={() => [{ query: GET_TRACKS_QUERY }]}>
            {(createTrack, { loading, error }) => {
                if (error) return <Error error={error} />
                return (
                      <Dialog open={open} className={classes.dialog}>
                            <form onSubmit={event => handleSubmit(event, createTrack)} className={classes.form}>
                                  <DialogTitle>Create Track</DialogTitle>
                                  <DialogContent>
                                    <DialogContentText>
                                      Add a Title, Description & Audio File
                                    </DialogContentText>
                                    <FormControl margin="normal" required fullWidth>
                                        <TextField
                                            label="Title"
                                            placeholder="Add Title"
                                            onChange={event => setTitle(event.target.value)}
                                            value={title}
                                            className={classes.textField} />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <TextField
                                            multiline
                                            rows="4"
                                            label="Description"
                                            placeholder="Add Description"
                                            onChange={event => setDescription(event.target.value)}
                                            value={description}
                                            className={classes.textField} />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <input
                                            id="image"
                                            required type="file"
                                            accept="image/jpeg,image/jpg,image/png"
                                            className={classes.input}
                                            onChange={handleImageChange} />
                                        <label htmlFor="image">
                                          <Button
                                              variant="outlined"
                                              color={file ? "secondary" : "inherit" }
                                              component="span"
                                              className={classes.button}>
                                            Image File
                                            <LibraryMusicIcon className={classes.icon} />
                                          </Button>
                                          {file && file.name}
                                        </label>
                                    </FormControl>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={() => setOpen(false)} className={classes.cancel}>Cancel</Button>
                                    <Button
                                        disabled={ !title.trim() || !description.trim() || !file }
                                        type="submit"
                                        className={classes.save}>Add Track</Button>
                                  </DialogActions>
                            </form>
                      </Dialog>
                )
          }}
        </Mutation>

      </>
  );
};

const CREATE_TRACK_MUTATION = gql`
    mutation ($title: String!, $description: String!, $url: String!){
        createTrack(
            description: $description,
            title: $title, 
            url: $url) {
            track {
                id
                title
                description
                url
                createdAt
                postedBy {
                    id
                    username
                }
            }
        }
    }
`

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  dialog: {
    margin: "0 auto",
    maxWidth: 550
  },
  textField: {
    margin: theme.spacing.unit
  },
  cancel: {
    color: "red"
  },
  save: {
    color: "green"
  },
  button: {
    margin: theme.spacing.unit * 2
  },
  icon: {
    marginLeft: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: "200"
  }
});

export default withStyles(styles)(CreateTrack);
