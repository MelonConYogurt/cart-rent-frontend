async function SendCarData(data: object) {
  console.log("Data to send:", data);
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/cars/add/new/car/info",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer `,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(`Fail, error: ${response.status}`);
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

export default SendCarData;
