export type Gender = "Male" | "Female" | "Other" | "";
export type Preference = "girls" | "guys" | "both" | "";

export interface State {
  loading: boolean;
  isLoggedIn: boolean;
  user: {
    id: string;
    token: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    userprofile?: {
      bio?: string;
      gender: Gender;
      phone_number: string;
      date_of_birth: Date | string;
      preference?: Preference;
    };
  };
}

export interface User {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  date_of_birth: Date | string;
}

export interface UserData {
  id: string;
  token: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  userprofile?: {
    bio?: string;
    gender: Gender;
    phone_number: string;
    date_of_birth: Date | string;
    preference?: Preference;
  };
}
