import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const TableData = ({ tableData, style }) => {
  const [headers, setHeaders] = useState([]);
  const [dataRows, setDataRows] = useState([]);

  console.log({ test: style });
  // Process table data to separate header and data rows
  useEffect(() => {
    if (tableData.length > 0) {
      const [headerRow, ...restRows] = tableData;
      const headersExtracted = headerRow
        .split("\t|\t")
        .map((cell) => cell.split(": ")[1].trim()); // Extract header names

      setHeaders(headersExtracted);
      setDataRows(restRows.map((row) => row.split("\t|\t")));
    }
  }, [tableData]);

  // Function to render the Chakra UI table headers
  const renderHeaders = () => {
    return (
      <Thead>
        <Tr>
          {headers.map((header, index) => (
            <Th key={`header-${index}`}>{header}</Th>
          ))}
        </Tr>
      </Thead>
    );
  };

  // Function to render the Chakra UI table data
  const renderDataRows = () => {
    return (
      <Tbody>
        {dataRows.map((row, rowIndex) => (
          <Tr key={`row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <Td key={`cell-${rowIndex}-${cellIndex}`}>
                {cell.split(": ")[1].trim()}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    );
  };
  return (
    <Table variant={style}>
      {renderHeaders()}
      {renderDataRows()}
    </Table>
  );
};

export default TableData;
