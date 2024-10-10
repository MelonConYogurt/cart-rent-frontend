async function GetAllCarsInfoFiltered(filter: string) {
  try {
    const query = `
      query {
        getAllCarsInfo(filters: {${filter}}) {
          id
          brand
          model
          year
          vin
          color
          mileage
          numberOfDoors
          horsePower
          torque
          mediaUrl
          fuelType
          transmissionType
          driveType
          bodyType
          status
          available
          price
          rentDays
          lastService
        }
      }
    `;

    const response = await fetch("http://127.0.0.1:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    });

    if (!response.ok) {
      throw new Error(`Fail: ${response.status}`);
    } else {
      console.log(query);
      const {data} = await response.json();
      console.log("Data optenida de la api: ", data);
      return data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default GetAllCarsInfoFiltered;
