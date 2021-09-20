import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import React from "react";
import cookie from "react-cookies";
import PostDashboard from "../components/PostDashBoard";
import axios from "axios";

const LandingPage = (props) => {
  const [postList, setPostList] = React.useState([]);

  React.useEffect(() => {
    const getPostList = async () => {
      try {
        const list = await axios.get(
          `${process.env.REACT_APP_API_HOST}/post`,

          {
            headers: {
              "X-Session-Cookie": cookie.load(
                process.env.REACT_APP_SESSION_COOKIE_NAME
              ),
            },
          }
        );
        setPostList(list.data.data);
      } catch (err) {
        return null;
      }
    };
    getPostList();
  }, []);
  return (
    <>
      <Box width="80%" mx="auto" textColor="#367A91">
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
                    color: "#13344C",
                    bg: "white",
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
                    color: "white",
                    bg: "#13344C",
                  }}
                >
                  SignUp
                </Button>
              </Link>
            </Flex>
          </>
        ) : (
          <>
            {postList.map((singlePost) => {
              return (
                <PostDashboard
                  key={singlePost.id}
                  title={singlePost.title}
                  summary={singlePost.summary}
                  post={singlePost.post}
                  createdAt={singlePost.createdAt}
                  uuid={singlePost.uuid}
                />
              );
            })}
          </>
        )}
      </Box>
    </>
  );
};

export default LandingPage;
