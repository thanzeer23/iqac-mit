import React, { useEffect, useState } from "react";
import { Box, Switch, useToast, Text, Flex, Container } from "@chakra-ui/react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const RouteProtect = () => {
  const toast = useToast();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSections = async () => {
    try {
      const sectionsCollection = collection(db, "sections");
      const querySnapshot = await getDocs(sectionsCollection);

      const fetchedSections = [];
      querySnapshot.forEach((doc) => {
        fetchedSections.push({ id: doc.id, ...doc.data() });
      });

      setSections(fetchedSections);
    } catch (error) {
      console.error("Error fetching sections: ", error);
    } finally {
      setLoading(false);
    }
  };
  const toggleProtection = async (id) => {
    try {
      const updatedSections = sections.map((section) =>
        section.id === id
          ? { ...section, protected: !section.protected }
          : section
      );

      setSections(updatedSections);

      const sectionToUpdate = updatedSections.find(
        (section) => section.id === id
      );
      console.log(updatedSections);

      if (sectionToUpdate) {
        const sectionRef = doc(db, "sections", id.toString());
        await updateDoc(sectionRef, {
          protected: sectionToUpdate.protected,
          // Add other fields if needed
        });

        toast({
          title: "Section Updated",
          description: "Section updated successfully.",
          status: "success",
          duration: 9000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <Container
      maxW="container.xl"
      color="#262626"
      marginTop="5rem"
      marginBottom={"5rem"}
      marginInline={"1rem"}
      height={"100%"}
      border={"3px solid gray"}
      borderRadius={"10px"}
      p={"10px"}
    >
      <Flex
        gap={"1rem"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {sections.map((section) => (
          <Box
            key={section.id}
            maxW="300px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            minW={"200px"}
            minH={"200px"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            wordBreak={"break-all"}
            border={"5px  solid"}
            borderColor={section.protected ? "green" : "red"}
          >
            <Box p="4">
              <Text
                fontSize="xl"
                fontWeight="semibold"
                mb="2"
                textAlign={"center"}
              >
                {section.sections}
              </Text>
              <Text color="gray.600" mb="4" textAlign={"center"}>
                This route is
                {section.protected ? " protected" : " not protected"}
              </Text>
            </Box>
            <Switch
              isChecked={section.protected}
              onChange={() => toggleProtection(section.id)}
              size="md"
            />
          </Box>
        ))}
      </Flex>
    </Container>
  );
};

export default RouteProtect;
