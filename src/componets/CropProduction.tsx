import { Table, Box, rem, Text } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { CropData } from "../interface/i-cropdata";

export const CropProduction: React.FC<{ data: CropData[] }> = ({ data }) => {
  const [results, setResults] = useState<{
    [year: string]: { maxCrop: string; minCrop: string };
  }>({});

  const findMaxMinCrop = () => {
    const uniqueYears = Array.from(
      new Set(
        data.map((entry) => entry.Year.split(",").slice(-1).join("").trim())
      )
    );

    const yearResults: {
      [year: string]: { maxCrop: string; minCrop: string };
    } = {};

    uniqueYears.forEach((year) => {
      // Filter data for the current year
      const yearData = data.filter(
        (entry) => entry.Year?.split(",").slice(-1).join("").trim() === year
      );

      // Initialize variables to track maximum and minimum production
      let maxProduction = -Infinity;
      let minProduction = Infinity;
      let maxCrop = "";
      let minCrop = "";

      // Iterate over data for the current year
      yearData?.forEach((entry) => {
        // Extract crop production
        const production =
          typeof entry["Crop Production (UOM:t(Tonnes))"] === "number"
            ? entry["Crop Production (UOM:t(Tonnes))"]
            : 0;

        // If current production is greater than current max, update maxCrop and maxProduction
        if (production > maxProduction) {
          maxProduction = production;
          maxCrop = entry["Crop Name"];
        }

        // If current production is less than current min, update minCrop and minProduction
        if (production < minProduction) {
          minProduction = production;
          minCrop = entry["Crop Name"];
        }
      });

      // Update yearResults with the result for the current year
      yearResults[year] = { maxCrop, minCrop };
    });
    // Update state with the results for all years
    setResults(yearResults);
  };

  useEffect(() => {
    findMaxMinCrop();
  }, [data]);

  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 20px",
          marginTop: "25px",
        }}
      >
        <Table border={1} horizontalSpacing="xl" striped withRowBorders={false}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th p={rem(13)}>Year</Table.Th>
              <Table.Th>Crop with Maximum Production in that Year</Table.Th>
              <Table.Th>Crop with Minimum Production in that Year</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {Object.entries(results)?.map(([year, { maxCrop, minCrop }]) => (
              <Table.Tr key={year}>
                <Table.Td align="center">{year}</Table.Td>
                <Table.Td align="center">{maxCrop}</Table.Td>
                <Table.Td align="center">{minCrop}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Box>
    </>
  );
};

export default CropProduction;
