import React, { useEffect, useState } from "react";
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
import "react-quill/dist/quill.snow.css";
import TableInput from "./Table/TableInput";
import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";

const Create = () => {
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
  useEffect(() => {
    const fetchSections = async () => {
      try {
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

  const createPage = async (testData) => {
    if ((section, link, type, tableData, tableStyle, testData)) {
      try {
        const docRef = await addDoc(collection(db, "pages"), {
          section,
          link,
          type,
          content: testData,
          tableStyle,
          createdAt: Timestamp.fromDate(new Date()),
        })
          .then(() => {
            toast({
              title: "Page created.",
              description: "page created successfully",
              status: "success",
              duration: 5000,
              position: "top-right",
              isClosable: true,
            });
            setSection("");
            setLink("");
            setType("table");
            setTableData("");
            setTableStyle("");
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

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
            index={type === "table" ? 0 : 1}
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

        <Box height={"300px"} w={"full"} overflowX="auto">
          {type === "table" && <TableInput createPage={createPage} />}
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
          <Button onClick={() => createPage(value)} width={"50%"}>
            submit
          </Button>
        )}
      </Flex>
    </Container>
  );
};

export default Create;
