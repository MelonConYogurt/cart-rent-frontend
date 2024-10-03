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
              brand: "${data.brand}",
              model: "${data.model}",
              year: ${data.year},
              vin: "${data.vin}",
              color: "${data.color}",
              mileage: ${data.mileage},
              numberOfDoors: ${data.numberOfDoors},
              horsePower: ${data.horsePower},
              torque: ${data.torque},
              mediaUrl: "${data.mediaUrl}",
              fuelType: "${data.fuelType}",
              transmissionType: "${data.transmissionType}",
              driveType: "${data.driveType}",
              bodyType: "${data.bodyType}",
              price: ${data.price}
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
