async function GetToken() {
  try {
    const bodyContent = new FormData();
    bodyContent.append("username", "new_user");
    bodyContent.append("password", "securepassword");
    const response = await fetch("http://127.0.0.1:8000/token", {
      method: "POST",
      headers: {
        Accept: "*/*",
      },
      body: bodyContent,
    });

    if (!response.ok) {
      throw new Error(`Fail: ${response.status}`);
    } else {
      const data = await response.json();
      const token = data.access_token;
      if (token) {
        console.log(token);
        sessionStorage.setItem("token", token);
      }
      return data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default GetToken;
