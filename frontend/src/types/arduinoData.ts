export interface PlantData {
  moisture: number;
  pump_status: boolean;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[]; // You can replace `any[]` with a more specific type if needed
  $collectionId: string;
  $databaseId: string;
}

export type PlantDataArray = {
  total: number;
  documents: PlantData[];
};
