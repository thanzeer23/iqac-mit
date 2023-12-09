import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Box w={"100%"} h={"100vh"}>
      <Flex
        alignItems={"center"}
        w={"full"}
        h={"full"}
        justifyContent={"center"}
        userSelect={"none"}
      >
        <Heading as="h1" size="4xl" noOfLines={1}>
          404
        </Heading>
        <Heading as="h6" size="xs">
          Not Found
        </Heading>
      </Flex>
    </Box>
  );
};

export default NotFound;
