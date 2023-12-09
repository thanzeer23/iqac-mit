import React, { useEffect, useState } from "react";
import CardLoop from "./CardLoop";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

const CardBodySection = ({ id, section, link, deltePage }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSections = async () => {
    try {
      const sectionDocRef = doc(db, "sections", section); // Assuming 'sections' is your collection name
      const docSnapshot = await getDoc(sectionDocRef);

      if (docSnapshot.exists()) {
        setSections(docSnapshot.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching sections: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);
  return (
    <CardLoop id={id} sections={sections} link={link} deltePage={deltePage} />
  );
};

export default CardBodySection;
