import {Box} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import axios from "axios";
import cookie from "react-cookies";
import PostDashboard from "../components/PostDashBoard";
import Pagination from "../components/Pagination";

const MyPosts = () => {
    const [postList, setPostList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

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

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <Box width="80%" mx="auto">
            {currentPosts.map((singlePost) => {
                return (
                    <PostDashboard
                        key={singlePost.id}
                        title={singlePost.title}
                        summary={singlePost.summary}
                        post={singlePost.post}
                        createdAt={singlePost.createdAt}
                        uuid={singlePost.uuid}
                        userId={singlePost.userId}
                    />
                );
            })}
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={postList.length}
                paginate={paginate}
            />
        </Box>
    );
};

export default MyPosts;
