import { State } from "@/lib/types";

const date = new Date();

export const store: State = {
  loading: false,
  isLoggedIn: false,
  user: {
    id: "",
    token: "" /**
      Storing a token to the store is very harzadous for 
      security. Ensure you set a timeout for the expiry of this token 
      */,
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    userprofile: {
      bio: "",
      gender: "",
      phone_number: "",
      date_of_birth: date,
      preference: "",
    },
  },
};
