import React, {useState} from 'react';
import {Box, ChakraProvider, theme} from '@chakra-ui/react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./containers/Login";
import NavBar from "./components/NavBar";
import httpClient from "./utils/httpClient";
import SignUp from "./containers/SignUp";
import LandingPage from "./containers/LandingPage";
import CreatePost from './containers/CreatePost';
import MyPosts from './containers/MyPosts';
import PostDetails from './containers/PostDetails';

const checkSession = async setIsLoggedIn => {
    try {
        let result = await httpClient({
            method: 'GET',
            url: `${process.env.REACT_APP_API_HOST}/session`,
        });
        if (result) {
            return setIsLoggedIn(true);
        }
        return setIsLoggedIn(false);
    } catch (err) {
        return setIsLoggedIn(false);
    }
};

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setuserId] = useState(null);
    checkSession(setIsLoggedIn);

    return (
        <ChakraProvider theme={theme}>
            <Router>
                <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                <Box pt="6rem" width="100%" minH="100vh" pb="4rem">
                    <Switch>

                        <Route path="/login">
                            <Login setuserId={setuserId} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                        </Route>

                        <Route path="/PostDetails/:uuid/:userId">
                            <PostDetails
                                userId={userId}
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        </Route>

                        <Route path="/createpost">
                            <CreatePost
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        </Route>

                        <Route path="/signUp">
                            <SignUp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                        </Route>

                        <Route path="/MyPosts">
                            <MyPosts
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        </Route>

                        <Route path="/">
                            <LandingPage isLoggedIn={isLoggedIn}/>
                        </Route>

                    </Switch>
                </Box>
            </Router>
        </ChakraProvider>
    );
}

export default App;