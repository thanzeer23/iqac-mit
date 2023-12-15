import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Timestamp, addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import SectionInput from "../components/SectionInput";

const CreateSection = () => {
  const [sections, setSections] = useState("");
  const toast = useToast();
  const saveSection = async () => {
    const timestamp = Timestamp.fromDate(new Date());
    console.log(timestamp);
    if (sections) {
      try {
        const docRef = await addDoc(collection(db, "sections"), {
          sections,
          createdAt: timestamp,
        }).then(() => {
          setSections("");
          toast({
            title: "Section created.",
            description: "section created successfully",
            status: "success",
            duration: 5000,
            position: "top-right",
            isClosable: true,
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SectionInput
      type={"Create"}
      sections={sections}
      setSections={setSections}
      handleClick={saveSection}
    />
  );
};

export default CreateSection;
