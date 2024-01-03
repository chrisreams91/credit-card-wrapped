import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { BasicTooltip } from "@nivo/tooltip";
import {
  fuzzyMatchMostCommonTransactions,
  getCountsPerValue,
} from "../../util";
import { Transaction } from "../../types";
import { Center, Container, Box } from "@chakra-ui/react";
import SliderMarkExample from "./Slider";

interface PieProps {
  data: Transaction[];
}

interface PieData {
  id: string;
  label: string;
  value: string;
  color?: string;
  totalCost: number;
  count: number;
}

const Pie = ({ data }: PieProps) => {
  const countsPerDescription = getCountsPerValue(data, "description");
  const formattedData: PieData[] = [];
  for (const [key, value] of Object.entries(countsPerDescription)) {
    formattedData.push({
      id: key,
      label: key,
      value: value.toString(),
      count: value,
      totalCost: 100,
    });
  }

  const sortedByHighestCounts = formattedData.sort((a, b) => b.count - a.count);
  const mostFrequent = sortedByHighestCounts.slice(0, 5);

  return (
    <Container maxW="100%" height={"50vh"}>
      {/* <Box>
        <SliderMarkExample />
      </Box> */}
      <ResponsivePie
        data={mostFrequent}
        margin={{ top: 50, bottom: 50, right: 200, left: 200 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLabels={false}
        arcLinkLabel={(val) => {
          if (val.label.toString().length > 15) {
            return `${val.label.toString().slice(0, 15)}...`;
          }
          return `${val.label}`;
        }}
        arcLinkLabelsOffset={2}
        arcLinkLabelsTextOffset={3}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        tooltip={({ datum }) => {
          return (
            <BasicTooltip
              id={datum.id}
              value={datum.value}
              enableChip={true}
              color={datum.color}
            />
          );
        }}
      />
    </Container>
  );
};

export default Pie;
