import { ResponsiveTreeMap } from "@nivo/treemap";
import React from "react";
import { Transaction } from "../../types";
import _ from "lodash";
import { Container } from "@chakra-ui/react";

interface TreeMapProps {
  data: Transaction[];
}

interface PieData {
  name: string;
  loc: number;
}

const TreeMap = ({ data }: TreeMapProps) => {
  const formattedData: { name: string; children: PieData[] } = {
    name: "root",
    children: [],
  };

  const groupings = _.groupBy(data, "category");
  _.forEach(groupings, (value, key) => {
    if (key && key !== "undefined") {
      const total = value.reduce((acc, curr) => {
        return acc + Number(curr.amount);
      }, 0);

      Number(total * -1);

      formattedData.children.push({
        name: key,
        loc: Number(Number(total * -1).toFixed(2)),
      });
    }
  });

  // sorting by string causes interesting blocking
  formattedData.children = _.sortBy(formattedData.children, "loc");

  return (
    <Container maxW="100%" height={"50vh"}>
      <ResponsiveTreeMap
        data={formattedData}
        identity="name"
        value="loc"
        valueFormat=".02s"
        margin={{ top: 1, right: 10, bottom: 10, left: 10 }}
        enableParentLabel={false}
        labelSkipSize={0}
        label={(value) => {
          const longestDirectionValue = Math.max(value.width, value.height);
          const pixelsPerChar = 6;
          if (value.id.length * pixelsPerChar > longestDirectionValue) {
            const charsToRemove = 4;
            const endIndex =
              longestDirectionValue / pixelsPerChar - charsToRemove;
            return `${value.id.slice(0, endIndex)}...`;
          } else {
            return `${value.id}`;
          }
        }}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.2]],
        }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
      />
    </Container>
  );
};

export default TreeMap;
