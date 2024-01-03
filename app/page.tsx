"use client";
import React, { useState } from "react";
import Papa from "papaparse";
import Results from "./results/Results";
import { Transaction } from "./types";
import { translateCSVData } from "./translator";
import {
  Center,
  ChakraProvider,
  Container,
  Image,
  Box,
} from "@chakra-ui/react";

const CSVReader: React.FC = () => {
  const [parsedData, setParsedData] = useState<Transaction[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      Papa.parse(file, {
        complete: (result) => {
          const translated = translateCSVData(result.data);
          setParsedData(translated);
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Center h="50px">
        <input type="file" accept=".csv" onChange={handleFileChange} />
      </Center>
      <Box height={50} />
      {parsedData.length > 0 && <Results data={parsedData} />}
      <Box height={200} />
    </ChakraProvider>
  );
};

export default CSVReader;
