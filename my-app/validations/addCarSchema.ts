import {z} from "zod";

// Car Schema for Validation
export const carSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),

  // Year preprocessing: converts string to number
  year: z.preprocess(
    (val) => parseInt(val as string, 10),
    z
      .number()
      .int()
      .min(1886, "Year must be at least 1886")
      .max(new Date().getFullYear(), "Year cannot exceed the current year")
  ),

  vin: z.string().length(17, "VIN must be exactly 17 characters"),
  color: z.string().min(1, "Color is required"),

  // Mileage preprocessing: converts string to number
  mileage: z.preprocess(
    (val) => parseInt(val as string, 10),
    z.number().int().positive("Mileage must be a positive number")
  ),

  fuel_type: z.enum(["electric", "diesel", "gas", "gasoline", "hybrid"]),
  transmission_type: z.enum(["automatic", "manual", "cvt"]),

  // Doors preprocessing: converts string to number
  number_of_doors: z.preprocess(
    (val) => parseInt(val as string, 10),
    z
      .number()
      .int()
      .min(2, "Must have at least 2 doors")
      .max(5, "No more than 5 doors allowed")
  ),

  drive_type: z.enum(["awd", "fwd", "rwd"]),
  body_type: z.enum(["sedan", "suv", "hatchback", "coupe", "truck"]),

  // Horsepower preprocessing: converts string to number
  horse_power: z.preprocess(
    (val) => parseInt(val as string, 10),
    z
      .number()
      .int()
      .positive("Horsepower must be a positive number")
      .min(50, "Must have at least 50 horsepower")
  ),

  // Torque preprocessing: converts string to number
  torque: z.preprocess(
    (val) => parseInt(val as string, 10),
    z.number().int().positive("Torque must be a positive number")
  ),
});
