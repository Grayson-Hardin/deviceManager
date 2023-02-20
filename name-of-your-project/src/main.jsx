import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Root, { action as rootAction } from "./routes/Root.jsx";

import Add, { action as editAction } from "../backupSrc/routes/add";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    action: rootAction,
  },
  {
    path: "routes/add",
    element: <Add />,
    action: editAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
