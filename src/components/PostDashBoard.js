import {Flex, Text} from "@chakra-ui/react";
import React from "react";
import {Link} from "react-router-dom";

const PostDashboard = ({...props}) => {
    return (
        <>
            <Link to={`/PostDetails/${props.uuid}/${props.userId}`}>
                <Flex
                    margin={10}
                    mt={0}
                    h={80}
                    direction="column"
                    borderRadius={5}
                    border="1px solid #13344C"
                    position="relative"
                >
                    <Flex direction="row">
                        <Text color="black" right={0} mr={5} position="absolute">
                            Published At {new Date(props.createdAt).toDateString()}
                        </Text>
                        <Text color="black" ml={5} fontWeight="medium">
                            {props.title}
                        </Text>
                    </Flex>
                    <Text color="black" p={5} noOfLines={6}>
                        {props.summary}
                    </Text>
                </Flex>
            </Link>
        </>
    );
};

export default PostDashboard;
