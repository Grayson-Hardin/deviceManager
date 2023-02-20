// import React from "react";
// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./index.css";
// import Root from "./routes/root";
// import Add from "./routes/Add.jsx";
//
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//   },
//   {
//     path: "contacts/:contactId",
//     element: <Add />,
//   },
// ]);
//
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

import ErrorPage from ".//routes/add";
import Contact, { loader as contactLoader } from "./routes/contact";

import Add, { action as editAction } from ".//routes/add";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
  },
  {
    path: "contacts/:contactId/edit",
    element: <Add />,
    loader: contactLoader,
    action: editAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
