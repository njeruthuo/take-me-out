import { store } from "./store";
import { State } from "@/lib/types";
import { Action } from "@/lib/actions/reducer-actions";
import { useReducer, createContext, ReactNode, useEffect } from "react";

// Function to load the state from localStorage
function loadStateFromLocalStorage(): State {
  try {
    const serializedState = localStorage.getItem("userState");
    return serializedState ? JSON.parse(serializedState) : store;
  } catch (err) {
    console.error("Could not load state from localStorage:", err);
    return store;
  }
}

// Function to save the state to localStorage
function saveStateToLocalStorage(state: State) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("userState", serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage:", err);
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, isLoggedIn: true };

    case "LOGOUT":
      return store;

    case "LOADING":
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
}

// Create context
const UserContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: store,
  dispatch: () => undefined,
});

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, loadStateFromLocalStorage());

  console.log(state);

  useEffect(() => {
    saveStateToLocalStorage(state);
  }, [state]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
