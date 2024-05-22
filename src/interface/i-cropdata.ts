export interface CropData {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number | string;
  "Area Under Cultivation (UOM:Ha(Hectares))": number | string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
  id: string;
}


export interface AggregatedData {
  [cropName: string]: {
    totalYield: number;
    totalArea: number;
    count: number;
  };
}