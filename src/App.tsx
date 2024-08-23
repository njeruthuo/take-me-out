import "./index.css";

import { Home } from "./components/pages";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/custom/shared";
import { Separator } from "@/components/ui/separator";
import { AuthLayout, LoginForm, SignupForm } from "./components/custom/_auth";

export default function App() {
  return (
    <main className="dark:text-white">
      <Navbar />
      <Separator />

      <div className="mx-auto w-[90%] my-4">
        <Routes>
          <Route index element={<Home />} />
          <Route element={<AuthLayout />}>
            <Route path="/sign-up" element={<SignupForm />} />
            <Route path="/sign-in" element={<LoginForm />} />
          </Route>
        </Routes>
      </div>
    </main>
  );
}
