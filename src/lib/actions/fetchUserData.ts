import axios from "axios";

export async function fetchUserData(token: string) {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/user-information/",
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
