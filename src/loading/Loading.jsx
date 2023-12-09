import React from "react";
import Lottie from "lottie-react";
import loading from "./loading.json";
import { Center, Box } from "@chakra-ui/react";
const Loading = () => {
  return (
    <Center width={"full"} height={"100vh"}>
      <Box width={"5%"}>
        <Lottie animationData={loading} loop={true} />
      </Box>
    </Center>
  );
};

export default Loading;
