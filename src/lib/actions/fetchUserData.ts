import axios from "axios";
import { url } from "@/global";

export async function fetchUserData(token: string) {
  try {
    const response = await axios.get(
      `${url}/user-information/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
}
