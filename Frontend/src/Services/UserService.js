import axios from "axios"
import { BASE_URL } from "../Utiles/Url"
// import { data } from "react-router-dom"

export const loginAPI = async (userToken) => {
      const response = await axios.post(`${BASE_URL}/users/login`, userToken);
      console.log("Login API Response:", response.data); // Debugging
      return response.data;
    
  };
export const registerAPI=async(data)=>{
    console.log(data);
    
    const response=await axios.post(`${BASE_URL}/users/register`,data)
    return response.data
};