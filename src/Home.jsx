import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import SideBar from "./sidebar/SideBar";
import Content from "./content/Content";
import { useLocation } from "react-router-dom";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";
import Loading from "./loading/Loading";
import HomeContent from "./content/HomeContent";
import { useLoading } from "./context/context";

const Home = ({ user }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const [isLessThan800] = useMediaQuery("(max-width: 800px)");
  const location = useLocation();
  const [homePage, setHomePage] = useState([]);

  const [path, setPath] = useState(location.pathname);

  const getHomePage = async () => {
    try {
      startLoading();
      const sectionsCollection = collection(db, "pages");
      const querySnapshot = await getDocs(sectionsCollection);

      const fetchedSections = [];
      querySnapshot.forEach((doc) => {
        fetchedSections.push({ id: doc.id, ...doc.data() });
      });
      const homePageData = fetchedSections.find(
        (data) => data.link.toUpperCase() === "home".toUpperCase()
      );
      setHomePage(homePageData);
    } catch (error) {
      console.error("Error fetching sections: ", error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    getHomePage();
  }, [path]);
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <>
      <Header user={user} />
      {isLoading && <Loading />}
      <Flex>
        {!isLessThan800 && <SideBar user={user} />}

        <>
          {!isLoading && path === "/" && <HomeContent homePage={homePage} />}
          {!isLoading && path !== "/home" && path !== "/" && (
            <Content user={user} />
          )}
        </>
      </Flex>
    </>
  );
};

export default Home;
