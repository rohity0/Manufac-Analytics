import axios from "axios";
import { CropData } from "../interface/i-cropdata";

export const getData = async (): Promise<CropData[]> => {
  let url = `http://localhost:9000/data`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
