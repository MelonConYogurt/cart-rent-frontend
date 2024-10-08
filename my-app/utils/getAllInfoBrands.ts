import GetToken from "./getToken";

async function GetAllBrands() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const token_generator = GetToken();
  try {
    const token = sessionStorage.getItem("token");
    console.log(token);
    const response = await fetch("http://127.0.0.1:8000/filters/brands", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
    });
    if (!response.ok) {
      throw new Error(`Fail: ${response.status}`);
    } else {
      const data = await response.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default GetAllBrands;
