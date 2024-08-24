import { UserData } from "../types";

export type Action =
  | { type: "LOGIN"; payload: UserData }
  | { type: "LOGOUT" }
  | { type: "LOADING" };
