import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../sidebar/Sidebar";
import { Flex, useMediaQuery } from "@chakra-ui/react";

const AdminDashBoard = ({ user }) => {
  const [isLessThan800] = useMediaQuery("(max-width: 800px)");
  return (
    <>
      <Header user={user} />
      <Flex>
        {!isLessThan800 && <Sidebar />}

        <Outlet />
      </Flex>
    </>
  );
};

export default AdminDashBoard;
