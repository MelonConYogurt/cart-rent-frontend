import GetToken from "./getToken";

async function GetAllColors() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const token_generator = GetToken();
  try {
    const token = sessionStorage.getItem("token");
    console.log(token);
    const response = await fetch("http://127.0.0.1:8000/filters/colors", {
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
      return data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default GetAllColors;
