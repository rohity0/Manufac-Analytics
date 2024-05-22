import { useSetState } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { getData } from "../apis/data_set";
import { CropData } from "../interface/i-cropdata";
import { CropProduction } from "./CropProduction";
import AverageOfCrop from "./CropAverage";

export const MaxAndMinCrop = () => {
  const [data, setData] = useState<CropData[]>([]);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, [data]);

  return (
    <>
      <AverageOfCrop data={data} />
      <CropProduction data={data} />
    </>
  );
};
