import React, { useMemo, useState } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { Transaction } from "../../types";
import {
  filterPositivePayments,
  getCountsPerValue,
  getTransactionAmountsPerDay,
} from "../../util";
import _ from "lodash";
import { Button, Center, Container, Stack } from "@chakra-ui/react";
import { BasicTooltip } from "@nivo/tooltip";

interface CalendarProps {
  data: Transaction[];
}

interface CalendarData {
  value: number;
  actualValue: number;
  day: string;
}

const buildAmountData = (data: Transaction[]): CalendarData[] => {
  const filteredTransations = filterPositivePayments(data);
  const amountsPerDay = getTransactionAmountsPerDay(filteredTransations);

  const amountPerDayData = [];
  for (const [key, value] of Object.entries(amountsPerDay)) {
    const normalizedAmount = Number((value * -1).toFixed(0));

    const scaledAmount = Math.log(normalizedAmount);
    const roundedScaledAmount = Math.round(scaledAmount);

    amountPerDayData.push({
      value: roundedScaledAmount,
      actualValue: Number(value.toFixed(2)),
      day: key,
    });
  }
  return amountPerDayData;
};

const buildCountData = (data: Transaction[]): CalendarData[] => {
  const countPerDay = getCountsPerValue(data, "formattedDate");

  const countPerDayData = [];
  for (const [key, value] of Object.entries(countPerDay)) {
    countPerDayData.push({
      value,
      actualValue: value,
      day: key,
    });
  }
  return countPerDayData;
};

const Calendar = ({ data }: CalendarProps) => {
  const [displayType, setDisplayType] = useState<"AMOUNT" | "COUNT">("AMOUNT");
  const [displayData, setDisplayData] = useState<CalendarData[]>(
    buildAmountData(data)
  );
  const startDate = data[0].formattedDate;
  const endDate = data[data.length - 1].formattedDate;

  const amountPerDayData = useMemo(() => buildAmountData(data), [data]);
  const countPerDayData = useMemo(() => buildCountData(data), [data]);

  return (
    <Container maxW="100%" height={"50vh"}>
      <Center>
        <Stack spacing={4} direction="row" align="center">
          <Button
            colorScheme="blue"
            variant={displayType === "AMOUNT" ? "solid" : "outline"}
            onClick={() => {
              setDisplayType("AMOUNT");
              setDisplayData(amountPerDayData);
            }}
          >
            Amount
          </Button>
          <Button
            colorScheme="blue"
            variant={displayType === "COUNT" ? "solid" : "outline"}
            onClick={() => {
              setDisplayType("COUNT");
              setDisplayData(countPerDayData);
            }}
          >
            Count
          </Button>
        </Stack>
      </Center>
      <ResponsiveCalendar
        data={displayData}
        from={startDate}
        to={endDate}
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 30, bottom: 30, right: 40, left: 40 }}
        yearSpacing={30}
        monthSpacing={10}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        tooltip={(x: any) => {
          return (
            <BasicTooltip
              id={x.day}
              value={x.data.actualValue}
              enableChip={true}
              color={x.color}
            />
          );
        }}
      />
    </Container>
  );
};

export default Calendar;
