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
  driveType: string;
  bodyType: string;
  status?: boolean;
  price: number;
  available?: boolean;
  rent_days?: number;
  lastService?: string;
}

function formatObjectToGraphQLInput(data: Datum) {
  return Object.entries(data)
    .map(([key, value]) => {
      const formattedValue = typeof value === "string" ? `"${value}"` : value;
      return `${key}: ${formattedValue}`;
    })
    .join(", ");
}

export default async function SendCarDataGraphQL(data: Datum) {
  console.log("Data to send:", data);

  const formattedData = formatObjectToGraphQLInput(data);

  const query = `
    mutation {
      addNewCarInfo(carModelInput: {
        ${formattedData}
      }) {
        vin
      }
    }
  `;

  try {
    const response = await fetch("http://127.0.0.1:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({query}),
    });

    if (!response.ok) {
      throw new Error(`Fail, error: ${response.status}`);
    } else {
      const result = await response.json();
      console.log("Response data:", result);
      return result.data;
    }
  } catch (error) {
    console.log("Error sending data:", error);
    throw error;
  }
}
