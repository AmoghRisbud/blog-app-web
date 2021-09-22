import React from "react";
import {Box, Flex, Text} from "@chakra-ui/react";

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Flex m='auto' justifyContent='center'>
            {pageNumbers.map(number => (
                <Box textAlign='center' width={5} key={number}>
                    <Text onClick={() => paginate(number)}>
                        {number}
                    </Text>
                </Box>
            ))}
        </Flex>
    );
};
export default Pagination;