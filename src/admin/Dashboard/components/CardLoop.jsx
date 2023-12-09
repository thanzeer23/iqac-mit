import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

import {
  Box,
  Tag,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CardLoop = ({ id, sections, link, deltePage }) => {
  const [dynamicLink, setDynamicLink] = useState("");
  function setDynamicRoute() {
    const url_name = link.replaceAll(" ", "-");
    const url = "/" + url_name;

    setDynamicLink(url);
  }
  useEffect(() => {
    setDynamicRoute();
  }, []);

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      key={id}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      minW={"200px"}
    >
      <Box
        p="4"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <Text fontSize="xl" fontWeight="semibold" mb="2" textAlign={"center"}>
          {dynamicLink}
        </Text>
        <Text color="gray.600" mb="4" textAlign={"center"}>
          This is route is
          {sections.protected ? " protected" : " not protected"}
        </Text>
        <Menu>
          <MenuButton
            p={"5px"}
            transition="all 0.2s"
            w={"fit-content"}
            textAlign={"center"}
            _expanded={{ bg: "blue.400" }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius="full"
            _hover={{ bgColor: "#e5e5e5" }}
          >
            <HiOutlineDotsVertical size={23} />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link to={"/admin/edit-page/" + id}>Edit</Link>
            </MenuItem>
            <MenuItem onClick={() => deltePage(id)}>delete </MenuItem>
          </MenuList>
          <Flex flexWrap="wrap" justifyContent={"flex-end"}>
            <Tag
              p={"10px"}
              borderRadius="full"
              variant="solid"
              colorScheme={sections.protected ? "green" : "red"}
            >
              {sections.protected ? "protected" : "not protected"}
            </Tag>
          </Flex>
        </Menu>
      </Box>
    </Box>
  );
};

export default CardLoop;
