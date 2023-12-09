import { useState } from "react";
import {
  Box,
  HStack,
  VStack,
  extendTheme,
  Button,
  Input,
  Flex,
} from "@chakra-ui/react";

const TableInput = ({ createPage }) => {
  const theme = extendTheme({
    styles: {
      global: {
        // Customize horizontal scrollbar width
        "*::-webkit-scrollbar": {
          height: "5px", // Adjust this value to change the scrollbar height
        },
        "*::-webkit-scrollbar-thumb": {
          background: "gray",
        },
      },
    },
  });
  const [rows, setRows] = useState(1);
  const [columns, setColumns] = useState(1);
  const [allRowValues, setAllRowValues] = useState([]);

  const handleInputChange = (rowIndex, colIndex, value) => {
    setAllRowValues((prevValues) => {
      const updatedValues = [...prevValues];
      if (!updatedValues[rowIndex]) {
        updatedValues[rowIndex] = [];
      }
      updatedValues[rowIndex][colIndex] = value;
      return updatedValues;
    });
  };

  const handleAddRow = () => {
    setRows(rows + 1);
  };

  const handleAddColumn = () => {
    setColumns(columns + 1);
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < rows; i++) {
      const rowInputs = [];
      for (let j = 0; j < columns; j++) {
        rowInputs.push(
          <Input
            key={`input-${i}-${j}`}
            placeholder={`Row ${i + 1}, Column ${j + 1}`}
            minW={"200px"}
            onChange={(e) => handleInputChange(i, j, e.target.value)}
          />
        );
      }
      inputs.push(
        <HStack key={`row-${i}`} spacing={4}>
          {rowInputs}
        </HStack>
      );
    }
    return inputs;
  };

  const firstRowValues = allRowValues.length > 0 ? allRowValues[0] || [] : [];
  const otherRowValues = allRowValues.slice(1);
  function test() {
    const tableData = allRowValues.map((row, rowIndex) => {
      const rowData = row.map((cell, colIndex) => {
        return `Row ${rowIndex + 1}, Column ${colIndex + 1}: ${cell}`;
      });
      return rowData.join("\t|\t"); // Separate columns with a tab and pipe symbol
    });
    createPage(tableData);
  }
  return (
    <Box overflowX={"auto"}>
      <Flex justifyContent="center" mb={4}>
        <Button onClick={handleAddRow} mr={2}>
          Add Row
        </Button>
        <Button onClick={handleAddColumn}>Add Column</Button>
      </Flex>
      <VStack spacing={4} align="flex-start">
        {renderInputs()}
      </VStack>
      <Button onClick={test}>Submit</Button>
    </Box>
  );
};

export default TableInput;
