import { url } from "@/global";
import axios from "axios";

export async function loginUser(data: { username: string; password: string }) {
  const response = await axios.post(
    `${url}/login-auth/`,
    data
  );
  return response;
}
