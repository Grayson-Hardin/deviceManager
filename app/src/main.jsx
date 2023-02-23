import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root, { action as rootAction } from "./routes/Root.jsx";
import Add from "./routes/Add";
import Edit from "./routes/Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    action: rootAction,
  },
  {
    path: "devices/add",
    element: <Add />,
    action: "/",
  },
  {
    path: "devices/edit/:deviceID",
    element: <Edit />,
    action: "/",
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
