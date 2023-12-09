import React, { useState } from "react";
import {
  ChakraProvider,
  extendTheme,
  Input,
  Box,
  Flex,
  Button,
} from "@chakra-ui/react";

const TableInput = ({ tableData, updatePage }) => {
  const theme = extendTheme({
    styles: {
      global: {
        "*::-webkit-scrollbar": {
          height: "5px",
        },
        "*::-webkit-scrollbar-thumb": {
          background: "gray",
        },
      },
    },
  });

  const [allRowValues, setAllRowValues] = useState([]);

  React.useEffect(() => {
    if (tableData && tableData.length > 0) {
      const parsedValues = tableData.map((row) => {
        const values = row
          .split("\t|\t")
          .map((cell) => cell.split(": ")[1].trim());
        return values;
      });
      setAllRowValues(parsedValues);
    }
  }, [tableData]);

  const handleInputChange = (rowIndex, columnIndex, newValue) => {
    const updatedData = [...allRowValues];
    updatedData[rowIndex][columnIndex] = newValue;
    setAllRowValues(updatedData);
  };
  function handleSubmit() {
    const tableData = allRowValues.map((row, rowIndex) => {
      const rowData = row.map((cell, colIndex) => {
        return `Row ${rowIndex + 1}, Column ${colIndex + 1}: ${cell}`;
      });
      return rowData.join("\t|\t");
    });
    updatePage(tableData);
  }

  return (
    <ChakraProvider theme={theme}>
      <Box overflowX="auto" padding="10px">
        {allRowValues.map((row, rowIndex) => (
          <Flex key={`row-${rowIndex}`} alignItems="center" mt={2}>
            {row.map((cell, columnIndex) => (
              <Input
                key={`cell-${rowIndex}-${columnIndex}`}
                value={cell}
                onChange={(e) =>
                  handleInputChange(rowIndex, columnIndex, e.target.value)
                }
                variant="flushed"
                flexGrow={1}
                mr={2}
              />
            ))}
          </Flex>
        ))}
        <Flex justifyContent="center" mt={4}>
          <Button onClick={handleSubmit}>Submit</Button>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default TableInput;
