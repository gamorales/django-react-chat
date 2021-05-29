import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Query } from "react-apollo"
import { gql } from "apollo-boost"

import withRoot from "./withRoot";
import Header from "./components/Shared/Header"
import App from "./pages/App"
import Profile from "./pages/Profile"
import Loading from "./components/Shared/Loading";
import Error from "./components/Shared/Error";

const Root = () => (
    <Query query={ME_QUERY} fetchPolicy="cache-and-network">
	{({ data, loading, error }) => {
	    if (loading) return <Loading />
	    if (error) return <Error error={error} />

        const currentUser = data.me

	    return (
	        <Router>
                <>
                    <Header currentUser={currentUser} />
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route path="/profile/:id" component={Profile} />
                    </Switch>
                </>
            </Router>
        )
	}}
    </Query>
)

const ME_QUERY = gql`
    {
        me{
            id
            username
            email
            dateJoined
        }
    }
`

export default withRoot(Root);
