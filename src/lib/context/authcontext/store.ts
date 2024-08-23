import { State } from "@/lib/types";

export const store: State = {
  loading: false,
  isLoggedIn: false,
  user: {
    id: "",
    username: "",
    email: "",
    profile: {
      first_name: "",
      last_name: "",
      bio: "",
      gender: "",
      phone_number: "",
      date_of_birth: "",
      preference: "",
    },
  },
};
