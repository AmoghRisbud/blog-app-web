import { Box, Text, Button, Link, Flex } from "@chakra-ui/react";
import { Link as ReachLink, withRouter } from "react-router-dom";
import MyPosts from "../containers/MyPosts";
import httpClient from "../utils/httpClient";

const NavBar = (props) => {
  const logout = async () => {
    try {
      let result = await httpClient({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_HOST}/session`,
      });
      if (result) {
        props.setIsLoggedIn(false);
        props.history.replace("/");
        return true;
      }
    } catch (err) {
      return false;
    }
  };

  return (
    <Flex
      width="100vw"
      position="fixed"
      top="0"
      background="white"
      py={2}
      zIndex="1"
    >
      {props.isLoggedIn ? (
        <>
          <Text
            ml={10}
            mr={2}
            my="auto"
            bg="white"
            color="#13344C"
            textDecoration="none"
            as={ReachLink}
            to="/"
          >
            Home
          </Text>
          <Text
          ml='auto'
            mr={2}
            my="auto"
            bg="white"
            color="#13344C"
            textDecoration="none"
            as={ReachLink}
            to="/MyPosts"
          >
            My Posts
          </Text>
          <Text
            ml={2}
            mr={2}
            my="auto"
            bg="white"
            color="#13344C"
            textDecoration="none"
            as={ReachLink}
            to="/createpost"
          >
            Create Post
          </Text>
          <Button
            ml={2}
            bg="white"
            mr={2}
            color="#13344C"
            border="1px solid #13344C"
            _hover={{
              color: "white",
              bg: "#13344C",
            }}
            onClick={logout}
          >
            Logout
          </Button>
        </>
      ) : (
        <Button
          ml="auto"
          mr={2}
          as={ReachLink}
          to="/login"
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
      )}
    </Flex>
  );
};

export default withRouter(NavBar);
