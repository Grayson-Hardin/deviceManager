import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root, { action as rootAction} from "./routes/Root.jsx";
import Add, { action as addAction } from "./routes/Add";
import Edit, { action as editAction } from "./routes/Edit";

// import Edit from "./routes/Edit.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    action: rootAction,
  },
  {
    path: "devices/add",
    element: <Add />,
    action: addAction,
  },
  {
    path: "devices/edit/:deviceID",
    element: <Edit />,
    action: editAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
