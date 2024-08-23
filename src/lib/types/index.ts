export type Gender = "Male" | "Female" | "Other" | "";
export type Preference = "girls" | "guys" | "both" | "";

export interface State {
  loading: boolean;
  isLoggedIn: boolean;
  user: {
    id: string;
    username: string;
    email: string;
    profile?: {
      first_name: string;
      last_name: string;
      bio: string;
      gender: Gender;
      phone_number: string;
      date_of_birth: Date;
      preference: Preference;
    };
  };
}
