import { Outlet, createBrowserRouter } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { Navbar } from "./Navbar";
import { SignupPage } from "./pages/SignupPage";
import { SigninPage } from "./pages/SigninPage";

const NavbarWrapper = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [{ path: "/", element: <HomePage /> }],
  },
  {
    path: "/signin",
    element: <NavbarWrapper />,
    children: [{ path: "/signin", element: <SigninPage /> }],
  },
  {
    path: "/signup",
    element: <NavbarWrapper />,
    children: [{ path: "/signup", element: <SignupPage /> }],
  },
]);
