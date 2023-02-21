import Add from "../routes/Add";
import { describe, it, expect } from "vitest";
import * as React from "react";
import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

beforeEach(async () => {

  const routes = [
    {
      path: "/",
      element: <Add />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/"],
    initialIndex: 1,
  });

  render(<RouterProvider router={router} />);
});

describe("Add component", () => {
  it("should render first name", async () => {

    const firstName = await screen.findByText("First Name");

    expect(firstName).toBeInTheDocument();
  });

  it("should render last name", async () => {

    const lastName = await screen.findByText("Last Name");

    expect(lastName).toBeInTheDocument();
  });

  it("should render device id", async () => {

    const id = await screen.findByText("Device ID");

    expect(id).toBeInTheDocument();
  });

  it("should render comments", async () => {

    const comments = await screen.findByText("Comments");

    expect(comments).toBeInTheDocument();
  });

  it("should render add button", async () => {

    const addButton = await screen.findByLabelText("add");

    expect(addButton).toBeInTheDocument();
  });

  it("should render cancel button", async () => {

    const cancelButton = await screen.findByLabelText("cancel");

    expect(cancelButton).toBeInTheDocument();
  });
});
