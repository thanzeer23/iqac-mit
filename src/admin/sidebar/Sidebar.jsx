import React from "react";
import {
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
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
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
                  <NavLink
                    style={({ isActive, isPending, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "red" : "black",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                    to={"/admin/sections"}
                  >
                    Add Sections
                  </NavLink>
                </ListItem>
                <ListItem>
                  <NavLink
                    style={({ isActive, isPending, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "red" : "black",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                    to={"/admin/sections-edit"}
                  >
                    Edit Sections
                  </NavLink>
                </ListItem>
                <ListItem>
                  <NavLink
                    style={({ isActive, isPending, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "red" : "black",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                    to={"/admin/sections-protect"}
                  >
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
                  <NavLink
                    style={({ isActive, isPending, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "red" : "black",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                    to={"/admin/create-page"}
                  >
                    Add Data's to the page
                  </NavLink>
                </ListItem>
                <ListItem>
                  <NavLink
                    style={({ isActive, isPending, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "red" : "black",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                    to={"/admin/edit-page"}
                  >
                    Edit Data Page
                  </NavLink>
                </ListItem>
              </UnorderedList>
            </Center>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Sidebar;
