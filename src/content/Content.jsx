import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Box, Button } from "@chakra-ui/react";
import TableData from "./TableData";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import NotFound from "../404/NotFound";

const Content = ({ user }) => {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [pageId, setPageId] = useState("");
  const [found, setFound] = useState(false);

  const fetchDatas = async () => {
    setLoading(true);
    if (id) {
      try {
        const docRef = doc(db, "pages", id.toString());
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setPageId(docSnapshot.id);
          setPageData(data);
          setFound(true);
          setLoading(false);
        } else {
          console.log("No such document!");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };
  const fetchSections = async () => {
    setLoading(true);
    try {
      const sectionsCollection = collection(db, "sections");
      const querySnapshot = await getDocs(sectionsCollection);

      const fetchedSections = [];
      querySnapshot.forEach((doc) => {
        fetchedSections.push({ id: doc.id, ...doc.data() });
      });

      setSectionList(fetchedSections);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sections: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatas();
    fetchSections();
  }, [id]);
  console.log(found);

  const test = useMemo(
    () => sectionList.find((e) => e.id === pageData.section),
    [sectionList, pageData.section]
  );

  if (found) {
    return test?.protected && !user ? (
      <Container
        maxW="container.xl"
        color="#262626"
        marginTop="5rem"
        w={"full"}
        height={"50vh"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Button width={"30%"} colorScheme="teal">
          <Link to={"/admin/login"}>Login to view</Link>
        </Button>
      </Container>
    ) : (
      <>
        {pageData?.type === "table" && (
          <Container
            maxW="container.xl"
            color="#262626"
            marginTop="5rem"
            paddingBottom={"5rem"}
          >
            <TableData
              tableData={pageData?.content}
              style={pageData?.tableStyle}
            />
          </Container>
        )}

        {pageData?.type === "quill" && (
          <Container
            maxW="container.xl"
            color="#333"
            marginTop="2rem"
            paddingBottom={"5rem"}
          >
            <Box dangerouslySetInnerHTML={{ __html: pageData?.content }}></Box>
          </Container>
        )}
      </>
    );
  } else {
    return !loading && <NotFound />;
  }
};

export default Content;
