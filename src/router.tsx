import { Outlet, createBrowserRouter } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { Navbar } from "./Navbar";

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
]);
