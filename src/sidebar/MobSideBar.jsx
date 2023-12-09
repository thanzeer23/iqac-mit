import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  DrawerHeader,
  Text,
  UnorderedList,
  ListItem,
  Box,
  Button,
  Center,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";

const MobSideBar = ({ isOpen, onClose, btnRef, user }) => {
  const [sections, setSections] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [loading, setLoading] = useState(true);
  function setDynamicRoute(name) {
    const url_name = name.replaceAll(" ", "-");
    const url = "/details/" + url_name;
    if (name !== "Home") {
      return url;
    } else {
      return "/";
    }
  }

  const fetchSections = async () => {
    try {
      const sectionDocRef = collection(db, "sections"); // Assuming 'sections' is your collection name
      const docSnapshot = await getDocs(sectionDocRef);

      const fetchedSections = [];
      docSnapshot.forEach((doc) => {
        fetchedSections.push({ id: doc.id, ...doc.data() });
      });
      setSections(fetchedSections);
    } catch (error) {
      console.error("Error fetching sections: ", error);
    } finally {
      setLoading(false);
    }
  };

  const getPgeDetails = async () => {
    try {
      const sectionsCollection = collection(db, "pages");
      const querySnapshot = await getDocs(sectionsCollection);
      const fetchedSections = [];
      querySnapshot.forEach((doc) => {
        fetchedSections.push({ id: doc.id, ...doc.data() });
      });

      setPageData(fetchedSections);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sections: ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPgeDetails();
    fetchSections();
  }, []);
  const sectionIds = sections.map((section) => section.id);

  const sectionIdsInPageData = sectionIds.filter((id) =>
    pageData.some((data) => data.section === id)
  );
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
        <DrawerHeader>Links</DrawerHeader>

        <DrawerBody>
          <>
            <Accordion defaultIndex={[0]} allowMultiple>
              {sectionIdsInPageData.map((id) => {
                const section = sections.find((section) => section.id === id);
                const sectionPageData = pageData.filter(
                  (data) => data.section === id
                );

                return (
                  <AccordionItem key={id}>
                    <h2>
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          marginLeft="3rem"
                        >
                          <Text fontWeight="bolder">{section.sections}</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Center>
                        {section?.protected && !user ? (
                          <Box w={"100%"}>
                            <Button w={"full"} colorScheme="blue">
                              <Link to={"/admin/login"}> Login to view</Link>
                            </Button>
                          </Box>
                        ) : (
                          <UnorderedList>
                            {sectionPageData.map((data) => (
                              <ListItem
                                _hover={{ cursor: "pointer", color: "blue" }}
                                key={data.id}
                              >
                                <Link
                                  to={setDynamicRoute(data.id)}
                                  state={{
                                    type: data.type,
                                    content: data.content,
                                    protected: section.protected,
                                    style: data.tableStyle,
                                  }}
                                >
                                  {data.link}
                                </Link>
                              </ListItem>
                            ))}
                          </UnorderedList>
                        )}
                      </Center>
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobSideBar;
