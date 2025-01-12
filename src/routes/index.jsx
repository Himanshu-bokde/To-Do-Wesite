import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import NotFoundPage from "../pages/NotFoundPage";
import PrivateRoute from "../components/PrivateRoute ";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  { path: "*", element: <NotFoundPage /> },
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
