import React, {useRef, useState} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Box, Button, Text} from '@chakra-ui/react';
import moment from "moment";

const FileUpload = props => {
    const [file, setFile] = useState('');
    const [error, setError] = useState('');
    const el = useRef();
    const handleChange = e => {
        const file = e.target.files[0];
        if (file.size > 2048000) {
            setError('File too large. Please select file smaller than 2 MB');
        } else if (!/.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.name)) {
            setError('Supported formats are gif, jpeg, jpg and png');
        } else {
            setFile(file);
            setError('');
        }
    };

    const uploadFile = async () => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const result = await axios.post(
                `${process.env.REACT_APP_API_HOST}/file`,
                formData,
                {headers: {'X-Session-Cookie': cookie.load(process.env.REACT_APP_SESSION_COOKIE_NAME)}}
            );
            let newFileList = props.fileList
            newFileList.push({
                id: result.data.id,
                filename: result.data.name,
                accesstoken: result.data.accessToken,
                createdAt: moment(),
                uuid: result.data.uuid
            });
            props.setFileList(newFileList)
            props.setIsFileUploadModalOpen(false);
        } catch (err) {
            props.setIsFileUploadModalOpen(false);
        }
    };
    return (
        <Box py="4" px="4">
            <input
                style={{maxWidth: '75vw'}}
                type="file"
                ref={el}
                onChange={handleChange}
            />
            <Text py="2">{error}</Text>
            <Button
                mt="4"
                onClick={uploadFile}
                py="2"
                background="#13344C"
                borderRadius="full"
                type="submit"
                color="white"
                border="1px solid #00223E"
                _hover={{
                    color: '#00223E',
                    bg: 'white',
                }}
                mr={3}
                disabled={error}
            >
                Upload File
            </Button>
            <Button
                mr="2"
                mt="5"
                py="2"
                background="white"
                borderRadius="full"
                type="submit"
                color="#13344C"
                border="1px solid #00223E"
                _hover={{
                    color: 'white',
                    bg: '#00223E',
                }}
                onClick={() => {
                    props.setIsFileUploadModalOpen(false);
                    setError('');
                }}
            >
                Cancel
            </Button>
        </Box>
    );
};

export default FileUpload;