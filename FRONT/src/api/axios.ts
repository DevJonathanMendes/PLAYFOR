import { LoginSchemaData, RegisterSchemaData } from "@/zodSchema/userSchema";
import axios from "axios";

// Refatorar, parece redundante.
export async function axiosLogin(user: LoginSchemaData) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const data = {
      query: `mutation{
      loginUser(User:{
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

export async function axiosRegister(user: RegisterSchemaData) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const data = {
      query: `mutation{
        registerUser(registerUserInput:{
          username:"${user.username}"
          email:"${user.email}"
          password:"${user.password}"
        }){
          username
          email
          password
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
