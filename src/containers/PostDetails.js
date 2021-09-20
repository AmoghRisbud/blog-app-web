import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import cookie from "react-cookies";

const PostDetails = ({ ...props }) => {
  const { uuid } = useParams();
  const [post, setPost] = React.useState([]);

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
        console.log(post);
      } catch (err) {
        return null;
      }
    };
    getPostList();
  }, []);
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
          <Text color="black" right={0} mr={5} position="absolute">
            Published At {new Date(post.createdAt).toDateString()}
          </Text>
          <Text color="black" ml={5} fontWeight="medium">
            {post.title}
          </Text>
        </Flex>
        <Text color="black" p={5}>
          {post.post}
        </Text>
      </Flex>
    </>
  );
};

export default PostDetails;
