import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Home";
import Login from "../admin/login/Login";
import Admin from "../admin/Admin";
import AdminDashboard from "../admin/Dashboard/Home";
import { auth } from "../firebase/config";
import { Outlet, Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <App />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "details/:id",
        element: <Home />,
      },
    ],
  },
  {
    element: auth.currentUser ? <Admin /> : <Navigate to={"/admin/login"} />,
    children: [
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <Login />,
  },
]);

export default router;
