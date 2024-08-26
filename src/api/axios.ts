import { LoginSchemaData, RegisterSchemaData } from "@/zodSchema/userSchema";
import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

const options = (data: {}) => {
  return {
    method: "POST",
    url: process.env.BASE_URL,
    headers,
    data,
  };
};

// Refatorar, parece redundante.
export async function axiosLogin(user: LoginSchemaData) {
  try {
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

    const res = await axios(options(data));
    return res.data;
  } catch (err) {
    console.log("AXIOS ERROR:", err);
  }
}

export async function axiosRegister(user: RegisterSchemaData) {
  try {
    const data = {
      query: `mutation{
        registerUser(User:{
          username:"${user.username}"
          email:"${user.email}"
          password:"${user.password}"
        }){
          username
          access_token
        }
      }`,
    };

    const res = await axios(options(data));
    return res.data;
  } catch (err) {
    console.log("AXIOS ERROR:", err);
  }
}
