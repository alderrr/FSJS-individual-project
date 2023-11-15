import { createBrowserRouter, redirect } from "react-router-dom";
import ParentPage from "../pages/ParentPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import WishlistPage from "../pages/WishlistPage";
import LockerPage from "../pages/LockerPage";
import ShopPage from "../pages/ShopPage";

const router = createBrowserRouter([
  {
    path: "*",
    element: <LoginPage />,
    loader: async () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: async () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader: async () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <ParentPage />,
    loader: async () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/wishlist",
        element: <WishlistPage />,
      },
      {
        path: "/locker",
        element: <LockerPage />,
      },
    ],
  },
]);

export default router;
