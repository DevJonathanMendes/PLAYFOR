import axios from "axios";

export default async function axiosLogin(
  user: { username: string; password: string }
  // BearerToken: string
) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const data = {
      query: `mutation{
      loginUser(loginUserInput:{
        username:"${user.username}"
        password:"${user.password}"
      }){
        username
        access_token
      }
    }`,
    };

    const options = {
      method: "POST",
      url: process.env.BASE_URL,
      headers,
      data,
    };

    const res = await axios(options);
    return res.data;
  } catch (err) {
    console.log("AXIOS ERROR:", err);
  }
}
