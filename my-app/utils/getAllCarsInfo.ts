async function GetAllCarsInfo() {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/graphql?query={ data { id brand model year vin color mileage numberOfDoors horsePower torque mediaUrl fuelType transmissionType driveType bodyType } }",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer `,
        },
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

export default GetAllCarsInfo;
