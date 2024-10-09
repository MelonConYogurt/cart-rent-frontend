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

    const response = await fetch(
      "http://127.0.0.1:8000/graphql", // Cambiado a POST, sin parámetros en URL
      {
        method: "POST", // Cambiado de GET a POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query, // El query ahora va en el cuerpo de la petición
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Fail: ${response.status}`);
    } else {
      const {data} = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default GetAllCarsInfoFiltered;
