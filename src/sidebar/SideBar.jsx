import React, { useEffect, useState } from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  ListItem,
  Button,
  Wrap,
  Center,
  Flex,
  UnorderedList,
  Text,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const SideBar = ({ user }) => {
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
      const sectionQuery = query(sectionDocRef, orderBy("createdAt", "asc")); // Assuming 'sections' is your collection name
      const docSnapshot = await getDocs(sectionQuery);

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
      const pageQuery = query(sectionsCollection, orderBy("createdAt", "asc"));
      const querySnapshot = await getDocs(pageQuery);
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
    <>
      <Accordion defaultIndex={[0]} minWidth="20%" allowMultiple>
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
                    flexWrap={"wrap"}
                    wordBreak={"break-all"}
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
                    <UnorderedList maxW={"100%"} w={"full"}>
                      {sectionPageData.map((data) => (
                        <ListItem
                          _hover={{ cursor: "pointer", color: "blue" }}
                          key={data.id}
                          flexWrap={"wrap"}
                          ml={"1rem"}
                          wordBreak={"break-all"}
                        >
                          <NavLink
                            style={({
                              isActive,
                              isPending,
                              isTransitioning,
                            }) => {
                              return {
                                fontWeight: isActive ? "bold" : "",
                                color: isActive ? "red" : "black",
                                viewTransitionName: isTransitioning
                                  ? "slide"
                                  : "",
                              };
                            }}
                            to={
                              data.link.toUpperCase() === "Home".toUpperCase()
                                ? "/"
                                : setDynamicRoute(data.id)
                            }
                            state={{
                              type: data.type,
                              content: data.content,
                              protected: section.protected,
                              style: data.tableStyle,
                            }}
                          >
                            {data.link}
                          </NavLink>
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
  );
};

export default SideBar;
