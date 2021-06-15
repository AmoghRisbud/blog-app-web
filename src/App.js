import React, {useState} from 'react';
import {Box, ChakraProvider, theme} from '@chakra-ui/react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./containers/Login";
import NavBar from "./components/NavBar";
import httpClient from "./utils/httpClient";
import SignUp from "./containers/SignUp";
import LandingPage from "./containers/LandingPage";
import DownloadFiles from "./containers/DownloadFiles";

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
    checkSession(setIsLoggedIn);

    return (
        <ChakraProvider theme={theme}>
            <Router>
                <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                <Box pt="6rem" width="100%" minH="100vh" pb="4rem">
                    <Switch>
                        <Route path="/login">
                            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                        </Route>
                        <Route path="/signUp">
                            <SignUp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                        </Route>
                        <Route path="/download-files/:uuid">
                            <DownloadFiles isLoggedIn={isLoggedIn} />
                        </Route>
                        <Route path="/">
                            <LandingPage isLoggedIn={isLoggedIn} />
                        </Route>
                    </Switch>
                </Box>
            </Router>
        </ChakraProvider>
    );
}

export default App;