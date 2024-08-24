import axios from "axios";

export async function loginUser(data: { username: string; password: string }) {
  const response = await axios.post(
    "http://localhost:8000/api/login-auth/",
    data
  );
  return response;
}
