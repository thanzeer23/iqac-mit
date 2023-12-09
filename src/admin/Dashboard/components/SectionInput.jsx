import React from "react";
import {
  Box,
  Center,
  FormControl,
  FormLabel,
  InputRightElement,
  Button,
  Input,
  Container,
  InputGroup,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const SectionInput = ({
  type,
  sections,
  setSections,
  handleClick,
  handleDelete,
}) => {
  const handleInputChange = (id, value) => {
    setSections((prevSection) =>
      prevSection.map((data) =>
        data.id === id
          ? {
              ...data,
              sections: value,
            }
          : data
      )
    );
  };
  const handleCreateInputChange = (e) => {
    setSections(e.target.value);
  };

  return (
    <Container
      maxW="container.xl"
      maxH={"100%"}
      h={"full"}
      color="#262626"
      marginTop="5rem"
      marginBottom={"5rem"}
      marginInline={"1rem"}
      border={"3px solid gray"}
      borderRadius={"10px"}
      display={"flex"}
      justifyContent={"center"}
    >
      <Center w={"full"} mt={"2rem"}>
        <Box width={"80%"}>
          <FormLabel>{type} Section name</FormLabel>
          <FormControl isRequired>
            <InputGroup
              size="md"
              display={"flex"}
              flexDirection={"column"}
              mb={"1rem"}
            >
              {type === "update" &&
                sections.map((data) => (
                  <InputGroup key={data.id} mb={"1rem"}>
                    <Input
                      pr="4.5rem"
                      type={"text"}
                      placeholder="sections"
                      value={data.sections}
                      onChange={(e) =>
                        handleInputChange(data.id, e.target.value)
                      }
                    />
                    <InputRightElement
                      width={"30%"}
                      id={data.id}
                      display={"flex"}
                      flexDirection={"row"}
                      key={data.id}
                      justifyContent={"flex-end"}
                      gap={"1rem"}
                      marginRight={"1rem"}
                      marginLeft={"1rem"}
                    >
                      <Button
                        h="1.75rem"
                        size="sm"
                        colorScheme="green"
                        onClick={() => handleClick(data.id, data.sections)}
                      >
                        <IoMdAdd size={15} />
                      </Button>
                      <Button
                        h="1.75rem"
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleDelete(data.id)}
                      >
                        <MdDelete size={15} />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                ))}
              {type === "Create" && (
                <>
                  <Input
                    pr="4.5rem"
                    type={"text"}
                    placeholder="section name"
                    value={sections}
                    onChange={handleCreateInputChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {type}
                    </Button>
                  </InputRightElement>
                </>
              )}
            </InputGroup>
          </FormControl>
        </Box>
      </Center>
    </Container>
  );
};

export default SectionInput;
