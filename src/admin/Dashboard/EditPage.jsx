import React, { useEffect, useState } from "react";
import { Container, Flex, useToast } from "@chakra-ui/react";
import CardBodySection from "./components/CardBody";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const EditPage = () => {
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]);
  const [pageData, setPageData] = useState([]);
  const toast = useToast();
  const fethPages = async () => {
    try {
      const pagesColletion = collection(db, "pages");
      const querySnapshot = await getDocs(pagesColletion);

      const fethedPages = [];
      querySnapshot.forEach((doc) => {
        fethedPages.push({ id: doc.id, ...doc.data() });
      });

      setPageData(fethedPages);
    } catch (error) {
      console.error("Error fetching sections: ", error);
    } finally {
      setLoading(false);
    }
  };
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
  const deleteDocument = async (id) => {
    try {
      const documentRef = doc(db, "pages", id);
      await deleteDoc(documentRef);
      fethPages();
      toast({
        title: "Page delted",
        description: "page deleted successfully.",
        status: "success",
        duration: 9000,
        position: "top-right",
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  useEffect(() => {
    fethPages();
    fetchSections();
  }, []);

  return (
    <Container
      maxW="container.xl"
      color="#262626"
      width={"200vh"}
      marginTop="5rem"
      marginBottom={"5rem"}
      marginInline={"1rem"}
      height={"100%"}
      border={"3px solid gray"}
      borderRadius={"10px"}
      padding={"20px"}
    >
      <Flex
        gap={"1rem"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {pageData.map((data) => (
          <div key={data.id}>
            <CardBodySection
              id={data.id}
              section={data.section}
              link={data.link}
              deltePage={deleteDocument}
            />
          </div>
        ))}
      </Flex>
    </Container>
  );
};

export default EditPage;
