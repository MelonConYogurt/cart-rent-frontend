export interface Main {
  data: Data;
}

export interface Data {
  getAllCarsInfo: Datum[];
}

export interface Datum {
  id: number;
  brand: string;
  model: string;
  year: number;
  vin: string;
  color: string;
  mileage: number;
  numberOfDoors: number;
  horsePower: number;
  torque: number;
  mediaUrl: string;
  fuelType: string;
  transmissionType: string;
  driveType: string;
  bodyType: string;
  status?: boolean;
  price: number;
  available?: boolean;
  rent_days?: number;
  lastService?: string;
}

export interface Filters {
  priceMin: number | null;
  priceMax: number | null;
  brand: string | null;
  carId: number | null;
}
