import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./lib/context/theme-provider";
import { UserContextProvider } from "./lib/context/authcontext/UserContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ThemeProvider>
  </BrowserRouter>
);
