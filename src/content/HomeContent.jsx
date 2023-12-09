import React from "react";
import { Container, Box, Center } from "@chakra-ui/react";
import TableData from "./TableData";

const HomeContent = ({ homePage }) => {
  return (
    <Container
      maxW="container.xl"
      color="#262626"
      marginTop="5rem"
      paddingBottom={"5rem"}
    >
      <Center>
        {homePage?.type === "table" && (
          <TableData tableData={homePage?.content} style={homePage?.style} />
        )}
        {homePage?.type === "quill" && (
          <Box dangerouslySetInnerHTML={{ __html: homePage?.content }}></Box>
        )}
      </Center>
    </Container>
  );
};

export default HomeContent;
