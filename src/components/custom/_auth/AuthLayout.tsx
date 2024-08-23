import { Navigate, Outlet } from "react-router-dom";
import useUserContext from "@/lib/context/authcontext/useUserContext";

const AuthLayout = () => {
  const { state } = useUserContext();

  return (
    <>
      {state.isLoggedIn ? (
        <>
          <Navigate to={"/"} />
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};
export default AuthLayout;
