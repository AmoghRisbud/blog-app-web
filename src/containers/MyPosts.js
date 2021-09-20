import { Box, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
import PostDashboard from "../components/PostDashBoard";

const MyPosts = ({ label, ...props }) => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getPostList = async () => {
      try {
        const list = await axios.get(
          `${process.env.REACT_APP_API_HOST}/mypost`,

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
  console.log(postList);
  return (
    <Box width="80%" mx="auto">
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
    </Box>
  );
};

export default MyPosts;
