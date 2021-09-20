import { Box, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import PostDetails from "../containers/PostDetails";
const PostDashboard = ({ ...props }) => {
  const uuid = props.uuid;

  return (
    <>
      <Link to={`/PostDetails/${uuid}`}>
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
