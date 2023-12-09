import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import SectionInput from "../components/SectionInput";

const CreateSection = () => {
  const [sections, setSections] = useState("");
  const toast = useToast();
  const saveSection = async () => {
    if (sections) {
      try {
        const docRef = await addDoc(collection(db, "sections"), {
          sections,
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
  const deleteDocument = async (id) => {
    try {
      const documentRef = doc(db, "sections", id);
      await deleteDoc(documentRef);
      toast({
        title: "Section Deleted.",
        description: "section deleted successfully",
        status: "success",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting document:", error);
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
