async function GetAllCarsInfoFiltered(
  filter: string,
  limit?: number,
  offset?: number
) {
  // Función para construir la query
  const buildQuery = (filter: string, limit?: number, offset?: number) => {
    let query = `{ data`;

    if (filter || limit !== undefined || offset !== undefined) {
      query += `(filters: {${filter ? filter : ""}}`;

      // Si hay limit, lo añadimos
      if (limit !== undefined) {
        query += `, limit: ${limit}`;
      }

      // Si hay offset, lo añadimos
      if (offset !== undefined) {
        query += `, offset: ${offset}`;
      }

      query += `)`;
    }

    query += `{
      cars {
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
      totalRows
    }
  }`;

    return query;
  };

  try {
    console.log(
      "Parámetros recibidos -> Filter:",
      filter,
      " limit:",
      limit,
      " offset:",
      offset
    );

    // Validar los parámetros
    if (
      (limit !== undefined && typeof limit !== "number") ||
      (offset !== undefined && typeof offset !== "number")
    ) {
      throw new Error("limit y offset deben ser números válidos.");
    }

    // Construir la query con la función auxiliar
    const query = buildQuery(filter, limit, offset);

    const response = await fetch("http://127.0.0.1:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({query}),
    });

    if (!response.ok) {
      throw new Error(`Falló la petición: ${response.status}`);
    }

    const {data} = await response.json();
    // console.log("Esta fue la query que se mandó:", query);
    // console.log(
    //   "Datos obtenidos de la API:",
    //   data.data.cars,
    //   "Numero de registros recuperados: ",
    //   data.data.totalRows
    // );
    return data;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
}

export default GetAllCarsInfoFiltered;
