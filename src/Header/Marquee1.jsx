import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Marquee1 = ({ marquee }) => {
  return (
    <Box
      bgColor="yellowgreen"
      textAlign="center"
      justifyContent="center"
      padding="5px"
      alignItems="center"
    >
      <marquee className="bg-color-yellow">
        <Text fontWeight="bolder" fontSize="10px">
          {marquee}
        </Text>
      </marquee>
    </Box>
  );
};

export default Marquee1;
