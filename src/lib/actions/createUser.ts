import { url } from "@/global";
import { User } from "../types";
import axios from "axios";

export async function createUser(data: User) {
  const response = await axios.post(`${url}/signup/`, data);
  return response;
}
