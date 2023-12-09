import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  useToast,
  Tabs,
  TabList,
  Select,
  Tab,
  Input,
  FormControl,
  FormLabel,
  Container,
  Flex,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import TableEdit from "./CRUD/Table/TableEdit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

const EditPageId = () => {
  const tableStyleList = ["simple", "striped", "unstyled"];
  const toast = useToast();
  const [type, setType] = useState("table");
  const [section, setSection] = useState("");
  const [tableData, setTableData] = useState([]);
  const [tableStyle, setTableStyle] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [sectionList, setSectionList] = useState([]);
  const [value, setValue] = useState("");
  const [allDatas, setAllDatas] = useState([]);

  const { id } = useParams();

  const fetchDatas = async () => {
    setLoading(true);
    const docRef = doc(db, "pages", id.toString());

    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setAllDatas(data);
        setSection(data.section);
        setLink(data.link);
        setType(data.type);
        if (data.type === "quill") {
          setValue(data.content);
        } else {
          setValue("");
        }
        setTableStyle(data.tableStyle);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, [id]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        setLoading(true);
        const sectionsCollection = collection(db, "sections");
        const querySnapshot = await getDocs(sectionsCollection);

        const fetchedSections = [];
        querySnapshot.forEach((doc) => {
          fetchedSections.push({ id: doc.id, ...doc.data() });
        });

        setSectionList(fetchedSections);
      } catch (error) {
        console.error("Error fetching sections: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  const updatePage = async (testData) => {
    if ((section, link, type, tableData, tableStyle, testData, id)) {
      try {
        const docRef = doc(db, "pages", id.toString());
        await updateDoc(docRef, {
          section,
          link,
          type,
          content: testData,
          tableStyle,
        });

        toast({
          title: "Page updated.",
          description: "page updated successfully",
          status: "success",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });
        console.log("Document successfully updated!");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  return loading ? (
    <h1>Loading</h1>
  ) : (
    <Container
      maxW="container.xl"
      color="#262626"
      marginTop="5rem"
      marginBottom={"5rem"}
      marginInline={"1rem"}
      height={"100%"}
      border={"3px solid gray"}
      borderRadius={"10px"}
    >
      <Flex
        padding={"20px"}
        flexDirection={"column"}
        rowGap={"2rem"}
        alignItems={"center"}
      >
        <FormControl isRequired>
          <FormLabel>Section name</FormLabel>
          <Select
            placeholder="Select section"
            isRequired={true}
            value={section}
            onChange={(e) => setSection(e.target.value)}
          >
            {sectionList?.map((sections) => (
              <option key={sections.id} value={sections.id}>
                {sections.sections}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel display={"flex"}>Link name</FormLabel>
          <Input
            isRequired={true}
            placeholder="link name"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </FormControl>

        <FormControl
          isRequired
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Tabs
            variant="soft-rounded"
            colorScheme="green"
            defaultIndex={type === "table" ? 0 : 1}
          >
            <FormLabel>Type</FormLabel>
            <TabList>
              <Tab onClick={() => setType("table")}>Table</Tab>
              <Tab onClick={() => setType("quill")}>Content</Tab>
            </TabList>
          </Tabs>

          {type === "table" && (
            <Box
              w={"50%"}
              display={"flex"}
              flexDirection={"column"}
              textAlign={"left"}
              justifyContent={"center"}
            >
              <FormLabel>Type</FormLabel>
              <Select
                placeholder="Select style"
                w={"100%"}
                value={tableStyle}
                onChange={(e) => setTableStyle(e.target.value)}
              >
                {tableStyleList.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </Select>
            </Box>
          )}
        </FormControl>

        <Box height={"400px"} w={"800px"} overflowX="auto">
          {type === "table" && (
            <TableEdit
              tableData={
                allDatas.type === "table" ? allDatas.content : [{ column1: "" }]
              }
              updatePage={updatePage}
            />
          )}
          {type === "quill" && (
            <ReactQuill
              theme="snow"
              value={value}
              style={{ height: "90%", width: "100%" }}
              modules={modules}
              formats={formats}
              onChange={setValue}
            />
          )}
        </Box>
        {type === "quill" && (
          <Button onClick={() => updatePage(value)} width={"50%"}>
            submit
          </Button>
        )}
      </Flex>
    </Container>
  );
};

export default EditPageId;
