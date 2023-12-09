import React, { useRef } from "react";
import {
  Image,
  Box,
  Flex,
  Text,
  useMediaQuery,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { auth } from "../../firebase/config";
import { GiHamburgerMenu } from "react-icons/gi";

import MobeSidebar from "../sidebar/MobeSidebar";

const Header = ({ user }) => {
  const [isLessThan570] = useMediaQuery("(max-width: 570px)");
  const [isLessThan800] = useMediaQuery("(max-width: 800px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Call the signOut method from Firebase auth
      // Handle any additional logic after logout (e.g., redirect to login page)
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle any potential errors during logout
    }
  };
  return (
    <>
      <Box
        width="100%"
        backgroundColor="#edede9"
        justifyContent="center"
        alignItems="center"
      >
        <Center>
          <Box width="90%" padding="10px">
            <Flex
              justifyContent={"space-between"}
              alignItems="center"
              textAlign="left"
            >
              <Box>
                <Image
                  backgroundSize="cover"
                  src="https://www.mahagurutech.ac.in/ref/images/college_logo.png"
                  alt="Dan Abramov"
                  width={isLessThan800 ? 150 : 200}
                  height="auto"
                  className="logo_image"
                />
              </Box>
              {!isLessThan570 && (
                <Box>
                  <Text
                    as={"h2"}
                    fontSize={isLessThan800 ? "medium" : "larger"}
                    fontWeight={"bolder"}
                  >
                    Welcome to admin panel !
                  </Text>
                </Box>
              )}
              {isLessThan800 && (
                <>
                  <Button ref={btnRef} colorScheme="gray" onClick={onOpen}>
                    <GiHamburgerMenu />
                  </Button>
                  <MobeSidebar
                    isOpen={isOpen}
                    onClose={onClose}
                    btnRef={btnRef}
                    user={user}
                  />
                </>
              )}
              {!isLessThan800 && (
                <Menu>
                  <MenuButton
                    as={Button}
                    colorScheme="yellow"
                    borderRadius={"full"}
                  >
                    User
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title="Profile">
                      <MenuItem>{user.email}</MenuItem>
                      <MenuItem onClick={handleLogout} mt={"1rem"}>
                        <Text width={"full"} textAlign={"center"}>
                          Logout
                        </Text>
                      </MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              )}
            </Flex>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default Header;
