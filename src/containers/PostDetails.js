import {Flex, Text, Button} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import {useHistory, useParams} from "react-router-dom";
import cookie from "react-cookies";

const PostDetails = ({...props}) => {
    const {uuid, userId} = useParams();
    const [post, setPost] = React.useState([]);
    let history = useHistory();
    React.useEffect(() => {
        const getPostList = async () => {
            try {
                const list = await axios.get(
                    `${process.env.REACT_APP_API_HOST}/post/${uuid}`,
                    {
                        headers: {
                            "X-Session-Cookie": cookie.load(
                                process.env.REACT_APP_SESSION_COOKIE_NAME
                            ),
                        },
                    }
                );
                setPost(list.data.data[0]);
            } catch (err) {
                return null;
            }
        };
        getPostList();
    }, [uuid]);

    const deletepost = async () => {
        try {
            console.log('delete function working')
            const result = await axios.delete(
                `${process.env.REACT_APP_API_HOST}/post/${uuid}`,
                {
                    headers: {
                        "X-Session-Cookie": cookie.load(
                            process.env.REACT_APP_SESSION_COOKIE_NAME
                        ),
                    },
                }
            );
            if (result) {
                history.push("/");
            }

        } catch (err) {
            return null;
        }
    };

    return (
        <>
            <Flex
                margin={10}
                mt={0}
                direction="column"
                borderRadius={5}
                border="1px solid #13344C"
                position="relative"
            >
                <Flex direction="row">
                    <Text color="black" right={0} mr={5} position={"absolute"}>
                        Published At {new Date(post.createdAt).toDateString()}
                    </Text>
                    <Text color="black" ml={5} fontWeight="medium">
                        {post.title}
                    </Text>
                </Flex>
                <Text color="black" p={5}>
                    {post.post}
                </Text>

                {props.userId === Number(userId) && (
                    <Button
                        ml='40%'
                        mr='40%'
                        textAlign='center'
                        my={4}
                        p={2}
                        bg="#13344C"
                        color="white"
                        borderRadius={5}
                        border="1px solid #13344C"
                        width={100}
                        textDecoration="none"
                        onClick={deletepost}
                    >
                        Delete Post
                    </Button>)
                }

            </Flex>
        </>
    );
};

export default PostDetails;
