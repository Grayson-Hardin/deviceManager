import Add from "../routes/Add";
import { describe, it, expect } from "vitest";
import * as React from "react";
import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { retrieveID } from "../service.js";
import userEvent from "@testing-library/user-event";

vi.mock("../service.js");

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

describe("Add component", () => {
  it("should render first name", async () => {
    render(<RouterProvider router={router} />);

    const firstName = await screen.findByText("First Name");

    expect(firstName).toBeInTheDocument();
  });

  it("should render last name", async () => {
    render(<RouterProvider router={router} />);

    const lastName = await screen.findByText("Last Name");

    expect(lastName).toBeInTheDocument();
  });

  it("should render device id", async () => {
    render(<RouterProvider router={router} />);

    const id = await screen.findByText("Device ID");

    expect(id).toBeInTheDocument();
  });

  it("should render comments", async () => {
    render(<RouterProvider router={router} />);

    const comments = await screen.findByText("Comments");

    expect(comments).toBeInTheDocument();
  });

  it("should render add button", async () => {
    render(<RouterProvider router={router} />);

    const addButton = await screen.findByLabelText("add");

    expect(addButton).toBeInTheDocument();
  });

  it("should render cancel button", async () => {
    render(<RouterProvider router={router} />);

    const cancelButton = await screen.findByLabelText("cancel");

    expect(cancelButton).toBeInTheDocument();
  });

  it("should return validation error when first name is not provided", async () => {
    render(<RouterProvider router={router} />);

    await userEvent.click(screen.getByLabelText("add"));

    const getMessage = screen.getByText("First Name Required");

    expect(getMessage).toBeInTheDocument();
  });

  it("should return validation error when last name is not provided", async () => {
    render(<RouterProvider router={router} />);

    await userEvent.click(screen.getByLabelText("add"));

    const getMessage = screen.getByText("Last Name Required");

    expect(getMessage).toBeInTheDocument();
  });

  it("should return validation error when device id is not provided", async () => {
    render(<RouterProvider router={router} />);

    await userEvent.click(screen.getByLabelText("add"));

    const getMessage = screen.getByText("Device ID Required");

    expect(getMessage).toBeInTheDocument();
  });

  it("should return validation error when first name is above character limit", async () => {
    const firstName = "thisNameIsAboveTheMinimumCharacterLimit";

    render(<RouterProvider router={router} />);

    await userEvent.type(screen.getByLabelText("First Name"), firstName);

    await userEvent.click(screen.getByLabelText("add"));

    const getMessage = screen.getByText("Character Limit Is 20");

    expect(getMessage).toBeInTheDocument();
  });

  it("should return validation error when last name is above character limit", async () => {
    const lastName = "thisNameIsAboveTheMinimumCharacterLimit";

    render(<RouterProvider router={router} />);

    await userEvent.type(screen.getByLabelText("Last Name"), lastName);

    await userEvent.click(screen.getByLabelText("add"));

    const getMessage = screen.getByText("Character Limit Is 20");

    expect(getMessage).toBeInTheDocument();
  });

  it("should return validation error when device is above character limit", async () => {
    const deviceID = "12345";

    render(<RouterProvider router={router} />);

    await userEvent.type(screen.getByLabelText("Device ID"), deviceID);

    await userEvent.click(screen.getByLabelText("add"));

    const getMessage = screen.getByText("Character Limit Is 4");

    expect(getMessage).toBeInTheDocument();
  });
});
