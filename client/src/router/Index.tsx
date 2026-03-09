import { createBrowserRouter, Outlet, type RouteObject, RouterProvider } from "react-router-dom";
import Layout from "../components/layout/layout";
import Login from "../pages/auth/login/Index";
import Home from "../pages/home/Index"
import Register from "../pages/auth/register/Index";
import Error from "../pages/error/Index";
import Search from "../pages/search/Index";
import Account from "../pages/account/Index";

const routeList: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/search", element: <Search /> },
  { path: "/account", element: <Account /> },
];

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Outlet />,
    children: [{ path: "", element: <Login /> }],
  },
  {
    path: "/register",
    element: <Outlet />,
    children: [{ path: "", element: <Register /> }],
  },
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: routeList, 
      },
      { path: "*", element: <Error /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={routes} />;
}