import { User } from "../types";
import axios from "axios";

export async function createUser(data: User) {
  const response = await axios.post("http://localhost:8000/api/signup/", data);
  return response;
}
