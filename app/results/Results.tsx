import { Box, Center, Container } from "@chakra-ui/react";
import { Transaction } from "../types";
import Calendar from "./components/Calendar";
import Pie from "./components/Pie";
import TreeMap from "./components/TreeMap";

const Results = ({ data }: { data: Transaction[] }) => {
  return (
    <>
      <Calendar data={data} />
      <Pie data={data} />
      <TreeMap data={data} />
    </>
  );
};

export default Results;
