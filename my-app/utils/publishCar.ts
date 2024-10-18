import GetToken from "./getToken";

async function CarChangeAvailable(id: number, available: boolean) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const token_generator = GetToken();
    const bodyContent = {available, id};
    const token = sessionStorage.getItem("token");
    if (token !== null) {
      const response = await fetch(
        "http://127.0.0.1:8000/manage/change/available/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyContent),
        }
      );
      if (!response.ok) {
        throw new Error(`Fail: ${response.status}`);
      } else {
        const data = await response.json();
        return data;
      }
    } else {
      throw new Error("Token is undefined");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default CarChangeAvailable;
