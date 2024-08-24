import useUserContext from "@/lib/context/authcontext/useUserContext";
import { Navigate, Outlet } from "react-router-dom";

const RootLayout = () => {
  const { state } = useUserContext();
  return (
    <div>
      {state.isLoggedIn ? (
        <>
          <Outlet />
        </>
      ) : (
        <>
          <Navigate to={"/sign-in"} />
        </>
      )}
    </div>
  );
};
export default RootLayout;
