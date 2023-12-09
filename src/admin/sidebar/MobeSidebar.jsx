import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  ListItem,
  Center,
  UnorderedList,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const MobeSidebar = ({ isOpen, onClose, btnRef, user }) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create your account</DrawerHeader>

        <DrawerBody>
          {" "}
          <Accordion defaultIndex={[0]} minWidth="30%" allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" marginLeft="3rem">
                    <Text fontWeight="bolder">Section Setting</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Center>
                  <UnorderedList>
                    <ListItem>
                      <NavLink to={"/admin/sections"}>Add Sections</NavLink>
                    </ListItem>
                    <ListItem>
                      <NavLink to={"/admin/sections/edit"}>
                        Edit Sections
                      </NavLink>
                    </ListItem>
                    <ListItem>
                      <NavLink to={"/admin/sections/protect"}>
                        Protect Section
                      </NavLink>
                    </ListItem>
                  </UnorderedList>
                </Center>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" marginLeft="3rem">
                    <Text fontWeight="bolder">Page Setting </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Center>
                  <UnorderedList>
                    <ListItem>
                      <NavLink to={"/admin/create-page"}>
                        Add Data's to the page
                      </NavLink>
                    </ListItem>
                    <ListItem>
                      <NavLink to={"/admin/edit-page"}>Edit Data Page</NavLink>
                    </ListItem>
                  </UnorderedList>
                </Center>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobeSidebar;
