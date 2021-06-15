import {Box, Button, Input, Text, Link} from "@chakra-ui/react";
import React, {useState} from "react";
import {useParams, Link as ReachLink} from 'react-router-dom';
import httpClient from "../utils/httpClient";

const DownloadFiles = (props) => {
    const {uuid} = useParams();
    const [accesstoken, setAccessToken] = useState();
    const [error, setError] = useState(null);

    const handleDownload = async () => {
        try {
            const result = await httpClient({
                method: 'GET',
                url: `${process.env.REACT_APP_API_HOST}/files/${uuid}?accesstoken=${accesstoken}`,
            });
            if (result) {
                window.open(`${process.env.REACT_APP_API_HOST}/files/${uuid}?accesstoken=${accesstoken}`, '_blank')
                return true
            }
            return false
        } catch (err) {
            console.log(err)
            setError("Unauthorized access. The access token provided might be incorrect, or, the file may have been deleted by the user. Contact the file owner for more information.")
            return false
        }
    }

    return (
        <Box maxWidth={{base: '85vw', md: '40vw', lg: '80vw'}} mx="auto" textColor="#367A91">
            <Text textColor="#13344C" fontWeight="bold" fontSize={20} my={2}>YourFileKeeper!</Text>
            <Text>To download file, please enter the access token below:</Text>
            <Input type="text" placeholder='Access Token' onChange={(event) => {
                setAccessToken(event.target.value)
                setError(null)
            }} maxW={24}/>
            <Button onClick={handleDownload}
                    m={2}
                    px="2"
                    bg="#13344C"
                    color="white"
                    border="1px solid #13344C"
                    _hover={{
                        color: '#13344C',
                        bg: 'white',
                    }}
            >
                Download
            </Button>
            <Text textColor="tomato">{error}</Text>

            {props.isLoggedIn ? (
                <Link as={ReachLink} to='/'>
                    Click here to go back to your files.
                </Link>
            ) : (
                <>
                    <Text>
                        <Link as={ReachLink} to='/signup'>
                            Click here to SignUp.
                        </Link>
                        {" "}
                        <Link as={ReachLink} to='/login'>
                            To Login, click here.
                        </Link>
                    </Text>
                </>
            )}
        </Box>)
}

export default DownloadFiles