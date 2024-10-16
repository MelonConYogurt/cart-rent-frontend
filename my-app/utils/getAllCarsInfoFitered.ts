async function GetAllCarsInfoFiltered(
  filter: string,
  start?: number,
  finish?: number
) {
  // Función para construir la query de GraphQL
  const buildQuery = (filter: string, start?: number, finish?: number) => {
    const fields = `
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
    `;

    let query = `
      query {
        getAllCarsInfo`;

    // Añadir parámetros dinámicamente
    if (filter || (start !== undefined && finish !== undefined)) {
      query += `(`;
      if (filter) query += `filters: {${filter}}`;
      if (start !== undefined && finish !== undefined) {
        if (filter) query += `, `;
        query += `start: ${start}, finish: ${finish}`;
      }
      query += `)`;
    }

    query += ` {
      ${fields}
    }}`;

    return query;
  };

  try {
    console.log(
      "Parámetros recibidos -> Filter:",
      filter,
      " Start:",
      start,
      " Finish:",
      finish
    );

    // Validar los parámetros
    if (
      (start !== undefined && typeof start !== "number") ||
      (finish !== undefined && typeof finish !== "number")
    ) {
      throw new Error("start y finish deben ser números válidos.");
    }

    // Construir la query con la función auxiliar
    const query = buildQuery(filter, start, finish);

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

    const {data, len} = await response.json();
    console.log("Esta fue la query que se mandó:", query);
    console.log("Datos obtenidos de la API:", data, "tamano", len);
    return data;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
}

export default GetAllCarsInfoFiltered;
