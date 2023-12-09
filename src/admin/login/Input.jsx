import React from "react";
import {
  Box,
  Input,
  FormControl,
  Button,
  Checkbox,
  InputGroup,
  InputRightElement,
  Heading,
} from "@chakra-ui/react";
const Input = () => {
  return (
    <Box
      backgroundColor={"transparent"}
      borderBottom={"1px solid rgba(0,0,0,.125)"}
      padding={"0.75rem 1.25rem"}
      borderTopLeftRadius={"0.25rem"}
      borderTopRightRadius={"0.25rem"}
    >
      <Heading
        as={"h3"}
        fontSize={"1.1rem"}
        fontWeight={"400"}
        textAlign={"center"}
      >
        Sign in to start your session
      </Heading>
      <form onSubmit={hanndleLogin}>
        <Box borderColor={"#6c757d"}>
          <FormControl
            w={"full"}
            paddingTop={"20px"}
            display={"grid"}
            gridRowGap={"1rem"}
          >
            <InputGroup display={"flex"} flexDirection={"column"}>
              <Input
                type="email"
                name="email"
                borderColor={"#6c757d"}
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
              <InputRightElement width="4.5rem">
                <MdOutlineMailOutline
                  fill="#777"
                  style={{ marginLeft: "20px" }}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl
            w={"full"}
            paddingTop={"20px"}
            display={"grid"}
            gridRowGap={"1rem"}
            marginBottom={"1rem"}
          >
            <InputGroup display={"flex"} flexDirection={"column"}>
              <Input
                type="password"
                name="password"
                borderColor={"#6c757d"}
                placeholder="password"
                value={password}
                onChange={updatePassword}
              />
              <InputRightElement width="4.5rem">
                <FaEye fill="#777" style={{ marginLeft: "20px" }} />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Box display={"flex"}>
            <Checkbox flex={"1"}>Remember Me</Checkbox>
            <Button
              color={"#fff"}
              bgColor={"#3f6791"}
              _hover={{ opacity: "0.8" }}
              _active={{ opacity: "0.8" }}
              borderColor={"#3f6791"}
              leftIcon={
                <CgLogIn
                  size={22}
                  fontSize={"sm"}
                  style={{ marginTop: "3px" }}
                />
              }
              rightIcon={"Sign In"}
              type="submit"
              borderRadius={"0"}
              textAlign={"center"}
            ></Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Input;
