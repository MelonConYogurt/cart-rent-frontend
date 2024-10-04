import {Datum} from "@/types/tsTypes";

async function SendCarDataGraphQL(data: Datum) {
  console.log("Data to send:", data);
  try {
    const response = await fetch("http://127.0.0.1:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer `,
      },
      body: JSON.stringify({
        query: `
          mutation {
            addNewCarInfo(carModelInput: {
            ${data}
            }) {
              vin
            }
          }
        `,
      }),
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

export default SendCarDataGraphQL;
