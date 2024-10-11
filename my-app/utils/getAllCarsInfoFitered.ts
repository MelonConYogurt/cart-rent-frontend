async function GetAllCarsInfoFiltered(
  filter: string,
  start?: number,
  finish?: number
) {
  try {
    let query = "";
    if (start !== undefined && finish !== undefined && filter) {
      if (!isNaN(start) && !isNaN(finish)) {
        query = `
          query {
            getAllCarsInfo(start: ${start}, finish: ${finish}, filters: {${filter}}) {
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
      } else {
        throw new Error("start y finish deben ser números válidos.");
      }
    } else if (filter) {
      query = `
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
    } else {
      query = `
      query {
        getAllCarsInfo{
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
    }
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
      throw new Error(`Falló la petición: ${response.status}`);
    } else {
      const {data} = await response.json();
      console.log("Datos obtenidos de la API: ", data);
      return data;
    }
  } catch (error) {
    console.log("Error: ", error);
    return [];
  }
}

export default GetAllCarsInfoFiltered;
