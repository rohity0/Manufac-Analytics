import { AggregatedData, CropData } from "../interface/i-cropdata";
import React, { useState, useEffect } from "react";
import { Table, Box, rem, Text } from "@mantine/core";

const AverageOfCrop: React.FC<{ data: CropData[] }> = ({ data }) => {
  const [aggregatedResults, setAggregatedResults] = useState<AggregatedData>(
    {}
  );

  const aggregateCropData = () => {
    const aggregatedData: AggregatedData = {};
    data.forEach((entry) => {
      const cropName = entry["Crop Name"];
      const yieldValue =
        typeof entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] ===
        "number"
          ? entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]
          : 0;
      const areaValue =
        typeof entry["Area Under Cultivation (UOM:Ha(Hectares))"] === "number"
          ? entry["Area Under Cultivation (UOM:Ha(Hectares))"]
          : 0;

      if (!aggregatedData[cropName]) {
        aggregatedData[cropName] = { totalYield: 0, totalArea: 0, count: 0 };
      }

      aggregatedData[cropName].totalYield += yieldValue;
      aggregatedData[cropName].totalArea += areaValue;
      aggregatedData[cropName].count += 1;
    });

    setAggregatedResults(aggregatedData);
  };

  useEffect(() => {
    aggregateCropData();
  }, [data]);
  return (
    <>
      <Box
        mb="25px"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 20px",
          margin: "25px",
        }}
      >
        <Table border={1} horizontalSpacing="xl" striped withRowBorders={false}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th align="center" style={{ padding: "0 20px" }}>
                Crop
              </Table.Th>
              <Table.Th align="center" style={{ padding: "0 20px" }}>
                Average Yield of the Crop between 1950-2020
              </Table.Th>
              <Table.Th align="center" style={{ padding: "0 20px" }}>
                Average Cultivation Area of the Crop between 1950-2020
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {Object.entries(aggregatedResults)?.map(
              ([crop, { totalYield, totalArea, count }]) => (
                <Table.Tr key={crop}>
                  <Table.Td align="center" style={{ padding: "0 20px" }}>
                    {crop}
                  </Table.Td>
                  <Table.Td align="center" style={{ padding: "0 20px" }}>
                    {(totalYield / count).toFixed(3)}
                  </Table.Td>
                  <Table.Td align="center" style={{ padding: "0 20px" }}>
                    {(totalArea / count).toFixed(3)}
                  </Table.Td>
                </Table.Tr>
              )
            )}
          </Table.Tbody>
        </Table>
      </Box>
    </>
  );
};

export default AverageOfCrop;
