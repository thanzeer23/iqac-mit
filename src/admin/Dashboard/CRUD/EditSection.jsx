import React, { useEffect, useState } from "react";
import SectionInput from "../components/SectionInput";
import { db } from "../../../firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useToast } from "@chakra-ui/react";

const EditSection = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
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

  useEffect(() => {
    fetchSections();
  }, []);
  const updateSection = async (id, value) => {
    try {
      if (id && value) {
        const sectionRef = doc(db, "sections", id.toString());
        await updateDoc(sectionRef, {
          sections: value,
          // Add other fields if needed
        });
        toast({
          title: "Section Updated",
          description: "section updated successfully.",
          status: "success",
          duration: 9000,
          position: "top-right",
          isClosable: true,
        });
      }
      console.log("Document updated with ID: ", id);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteDocument = async (id) => {
    try {
      const documentRef = doc(db, "sections", id);
      await deleteDoc(documentRef);
      fetchSections();
      toast({
        title: "Section delted",
        description: "section deleted successfully.",
        status: "success",
        duration: 9000,
        position: "top-right",
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
  return (
    <SectionInput
      type={"update"}
      sections={sections}
      setSections={setSections}
      handleClick={updateSection}
      handleDelete={deleteDocument}
    />
  );
};

export default EditSection;
