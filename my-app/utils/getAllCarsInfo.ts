async function GetAllCarsindo() {
  const query = {
    query:
      "{ data { brand model year vin color mileage numberOfDoors horsePower torque mediaUrl fuelType transmissionType } }",
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/graphql?query=", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer `,
      },
      body: JSON.stringify(query),
    });
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

export default GetAllCarsindo;
