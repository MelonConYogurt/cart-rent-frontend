import {Datum} from "@/types/tsTypes";

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
