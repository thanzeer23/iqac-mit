import React, { useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Image,
  Box,
  Button,
  useDisclosure,
  Flex,
  Text,
  useMediaQuery,
  Center,
} from "@chakra-ui/react";
import MobSideBar from "../sidebar/MobSideBar";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [isLargerThan900] = useMediaQuery("(min-width: 1000px)");
  const [isLessThan800] = useMediaQuery("(max-width: 800px)");

  return (
    <>
      <Box
        width="100%"
        backgroundColor="#edede9"
        justifyContent="center"
        alignItems="center"
      >
        <Center>
          <Box width="90%" padding="10px">
            <Flex
              justifyContent={"space-between"}
              alignItems="center"
              textAlign="left"
            >
              <Box>
                <Link to={"/"}>
                  <Image
                    backgroundSize="cover"
                    src="https://www.mahagurutech.ac.in/ref/images/college_logo.png"
                    alt="Dan Abramov"
                    width={isLessThan800 ? 200 : 300}
                    height="auto"
                    className="logo_image"
                  />
                </Link>
              </Box>
              {isLessThan800 && (
                <>
                  <Button ref={btnRef} colorScheme="gray" onClick={onOpen}>
                    <GiHamburgerMenu />
                  </Button>
                  <MobSideBar
                    isOpen={isOpen}
                    onClose={onClose}
                    btnRef={btnRef}
                    user={user}
                  />
                </>
              )}
              {!isLessThan800 && (
                <Box
                  fontSize={isLargerThan900 ? "small" : "smaller"}
                  fontWeight="bold"
                >
                  <Text>Autonomous Institute </Text>
                  <Text>NAAC Accreditation 'A' Grade </Text>
                  <Text>Acredited by NBA </Text>
                  <Text>Approved by AICTE, Affiliated to JNTUH</Text>
                </Box>
              )}
            </Flex>
          </Box>
        </Center>
      </Box>

      <Box
        bgColor="yellowgreen"
        textAlign="center"
        justifyContent="center"
        padding="5px"
        alignItems="center"
      >
        <marquee className="bg-color-yellow">
          <Text fontWeight="bolder" fontSize="10px">
            AMAZON (10) || EPAM (11) || AMADEUS (2) || JSW GROUP (2) || SEARS
            (31) || DBS Bank (13) || ACCOLITE DIGITAL (3) || VIRTUSA (126) ||
            LUMEN (4) || TCS (63) || TASL (3) || TATA TECHNOLOGIES (6) ||
            HEXAWARE TECHNOLOGIES (7) || LEGATO HEALTH (5) || DXC TECHNOLOGY
            (219) || TVARANA (4) || MPHASIS (4) || YAMAHA (20) || ACCENTURE
            (216) || ERNST & YOUNG (38) || COGNIZANT (131) || LTI (51) || TECH
            MAHINDRA (5) || DELTAX (1) || SMARTSOC SOLUTIONS (1) || BYTERIDGE
            (1) || TECHNOVERT (6) || QUEST GLOBAL (4) || VERZEO (5) || CES IT
            (5) ||
          </Text>
        </marquee>
      </Box>

      <Box
        bgColor="blueviolet"
        textAlign="center"
        justifyContent="center"
        padding="5px"
        alignItems="center"
      >
        <marquee className="bg-color-blue" behavior="scroll" direction="left">
          <Text fontWeight="bolder" fontSize="10px">
            It is a matter of great pride that the Institute of Aeronautical
            Engineering (IARE) is ranked one among the Top 200 best Engineering
            colleges as per NIRF (National Institutional Ranking Framework),
            Ministry of Education (MoE), Govt. of India since 2017.
          </Text>
        </marquee>
      </Box>
    </>
  );
};

export default Header;
