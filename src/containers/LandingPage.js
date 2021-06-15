import {Box, Button, Flex, Link, Text} from "@chakra-ui/react";
import {Link as ReachLink} from "react-router-dom";
import ManageFiles from "../components/ManageFiles";
import React from "react";

const LandingPage = (props) => {
    return (
        <Box maxWidth={{base: '85vw', md: '40vw', lg: '80vw'}} mx="auto" textColor="#367A91">
            <Text textColor="#13344C" fontWeight="bold" fontSize={20} my={2}>YourFileKeeper!</Text>
            {!props.isLoggedIn ? (
                <>
                    <Text my={2}>Sign up, upload and share!</Text>
                    <Flex>
                    <Link to="/login" as={ReachLink}>
                        <Button
                            px="2"
                            bg="#13344C"
                            color="white"
                            border="1px solid #13344C"
                            _hover={{
                                color: '#13344C',
                                bg: 'white',
                            }}
                        >
                            Login
                        </Button>
                    </Link>
                    <Link to="/signup" as={ReachLink} mx={4}>
                        <Button
                            px="2"
                            bg="white"
                            color="#13344C"
                            border="1px solid #13344C"
                            _hover={{
                                color: 'white',
                                bg: '#13344C',
                            }}
                        >
                            SignUp
                        </Button>
                    </Link>
                    </Flex>
                </>)
                :
                <ManageFiles/>
            }
        </Box>
    )
}

export default LandingPage