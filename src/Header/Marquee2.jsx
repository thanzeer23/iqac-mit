import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Marquee2 = ({ marquee }) => {
  return (
    <Box
      bgColor="blueviolet"
      textAlign="center"
      justifyContent="center"
      padding="5px"
      alignItems="center"
    >
      <marquee className="bg-color-blue" behavior="scroll" direction="left">
        <Text fontWeight="bolder" fontSize="10px">
          {marquee}
        </Text>
      </marquee>
    </Box>
  );
};

export default Marquee2;
