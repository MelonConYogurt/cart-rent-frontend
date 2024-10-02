export interface Main {
  data: Data;
}

export interface Data {
  data: Datum[];
}

export interface Datum {
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
}
