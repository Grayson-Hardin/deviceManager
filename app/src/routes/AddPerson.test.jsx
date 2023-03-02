import { createMemoryRouter, RouterProvider } from "react-router-dom";
import * as React from "react";
import AddPerson from "./AddPerson.jsx";
import { it, expect } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const routes = [
  {
    path: "/",
    element: <AddPerson />,
  },
];
const router = createMemoryRouter(routes, {
  initialEntries: ["/", "/"],
  initialIndex: 1,
});

it("should render first name", () => {
  render(<RouterProvider router={router} />);

  const firstName = screen.getByLabelText("First Name");

  expect(firstName).toBeInTheDocument();
});

it("should render last name", () => {
  render(<RouterProvider router={router} />);

  const lastName = screen.getByLabelText("Last Name");

  expect(lastName).toBeInTheDocument();
});

it("should render add button", () => {
  render(<RouterProvider router={router} />);

  const addButton = screen.getByLabelText("add");

  expect(addButton).toBeInTheDocument();
});

it("should render cancel button", () => {
  render(<RouterProvider router={router} />);

  const cancelButton = screen.getByLabelText("cancel");

  expect(cancelButton).toBeInTheDocument();
});
