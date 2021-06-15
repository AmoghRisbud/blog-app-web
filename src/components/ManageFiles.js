import {
    Box,
    Button, Flex, Image, Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Table, Tbody, Td, Text, Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import {DownloadIcon} from '@chakra-ui/icons'
import FileUpload from "./FileUpload";
import React, {useEffect, useState} from "react";
import httpClient from "../utils/httpClient";
import deleteIcon from '../assets/delete.svg'
import moment from "moment";

const ManageFiles = () => {

    const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        const getFileList = async () => {
            try {
                const list = await httpClient({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_HOST}/file`,
                });
                setFileList(list.data.data)
            } catch (err) {
                return null;
            }
        };
        getFileList();
    }, []);

    const handleDelete = async (uuid) => {
        try {
            const deleteFile = await httpClient({
                method: 'DELETE',
                url: `${process.env.REACT_APP_API_HOST}/file/${uuid}`,
            });
            if(deleteFile&&deleteFile.data.data){
                setFileList(fileList.filter(item => item.uuid !== uuid))
            }
            return null
        } catch (err) {
            return null;
        }
    }

    const fileUploadModal = () => {
        return (
            <Modal isOpen={isFileUploadModalOpen}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalBody color="#13344C">
                        <FileUpload
                            setIsFileUploadModalOpen={setIsFileUploadModalOpen}
                            fileList={fileList}
                            setFileList={setFileList}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        )
    }

    return (
        <Box
            maxWidth={{base: '85vw', md: '60vw', lg: '50vw'}}
            mx="auto"
        >
            <Flex>
                <Text textColor="#13344C" fontWeight="bold" fontSize={20} my={2}>Manage Files</Text>
                <Button onClick={() => setIsFileUploadModalOpen(true)}
                        ml='auto'
                        px="2"
                        bg="#13344C"
                        color="white"
                        border="1px solid #13344C"
                        _hover={{
                            color: '#13344C',
                            bg: 'white',
                        }}>
                    Upload file
                </Button>
            </Flex>


            {fileUploadModal()}

            <Box maxW={'100%'} overflowX={'auto'}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>File name</Th>
                            <Th>Access Token</Th>
                            <Th>Uploaded On</Th>
                            <Th>Sharable Link</Th>
                            <Th colSpan={2}>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {fileList && fileList.map((item, index) => {
                            return (
                                <Tr key={index}>
                                    <Td>{item.filename.split("-uuid-")[0]}</Td>
                                    <Td>{item.accesstoken}</Td>
                                    <Td>
                                        <div>{moment(item.createdAt).format('DD-MM-YYYY')}</div>
                                        <div>{moment(item.createdAt).format('hh:mm A')}</div>
                                    </Td>
                                    <Td>{`${process.env.REACT_APP_HOST}/download-files/${item.uuid}`}</Td>
                                    <Td>
                                        <Flex>
                                            <Link onClick={() => handleDelete(item.uuid)} mr={2}>
                                                <Image w="8" h="8" src={deleteIcon}/>
                                            </Link>
                                            <Link
                                                href={`${process.env.REACT_APP_API_HOST}/files/${item.uuid}?accesstoken=${item.accesstoken}`}
                                                isExternal>
                                                <DownloadIcon w={6} h={6}/>
                                            </Link>
                                        </Flex>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </Box>

        </Box>)
}
export default ManageFiles;