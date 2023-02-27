import Edit from "../routes/Edit";
import { describe, it, expect } from "vitest";
import * as React from "react";
import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { retrieveID, updateEntry } from "../service.js";
import userEvent from "@testing-library/user-event";

vi.mock("../service.js");

const graysonHardin = {
  firstName: "Grayson",
  lastName: "Hardin",
  deviceId: "0213",
  comments: "misc",
};
const routes = [
  {
    path: "/",
    element: <Edit />,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/", "/"],
  initialIndex: 1,
});

beforeEach(async () => {
  const entry = {
    firstName: graysonHardin.firstName,
    lastName: graysonHardin.lastName,
    deviceId: graysonHardin.deviceId,
    comments: graysonHardin.comments,
  };
  retrieveID.mockResolvedValue(entry);
});
describe("Edit Component", () => {
  it("should render edit tag", async () => {
    render(<RouterProvider router={router} />);

    const header = await screen.findByText(`Edit ${graysonHardin.firstName}'s Profile`);

    expect(header).toBeInTheDocument();
  });

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

  it("should render submit button", async () => {
    render(<RouterProvider router={router} />);

    const submitButton = await screen.findByLabelText("submit");

    expect(submitButton).toBeInTheDocument();
  });

  it("should render cancel button", async () => {
    render(<RouterProvider router={router} />);

    const cancelButton = await screen.findByLabelText("cancel");

    expect(cancelButton).toBeInTheDocument();
  });

  it("should return first name, last name, id, and comments from retrievedID function", async () => {
    const entry = {
      firstName: graysonHardin.firstName,
      lastName: graysonHardin.lastName,
      deviceId: graysonHardin.deviceId,
      comments: graysonHardin.comments,
    };

    render(<RouterProvider router={router} />);

    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const deviceIdInput = screen.getByLabelText("Device ID");
    const commentsInput = screen.getByLabelText("Comments");

    await waitFor(() => expect(firstNameInput.value).toEqual(entry.firstName));
    await waitFor(() => expect(lastNameInput.value).toEqual(entry.lastName));
    await waitFor(() => expect(deviceIdInput.value).toEqual(entry.deviceId));
    await waitFor(() => expect(commentsInput.value).toEqual(entry.comments));
  });

  it("should return validation error when first name is not provided", async () => {
    const entry = {
      firstName: "",
      lastName: "New Last Name",
      deviceId: "150",
      comments: "New comments",
    };

    retrieveID.mockResolvedValue(entry);

    render(<RouterProvider router={router} />);

    await userEvent.click(screen.getByLabelText("submit"));

    const getMessage = screen.getByText("First Name Required");

    expect(getMessage).toBeInTheDocument();
  });

  it("should return validation error when first name is not provided", async () => {
    const entry = {
      firstName: "Grayson",
      lastName: "",
      deviceId: "150",
      comments: "New comments",
    };

    retrieveID.mockResolvedValue(entry);

    render(<RouterProvider router={router} />);

    await userEvent.click(screen.getByLabelText("submit"));

    const getMessage = screen.getByText("Last Name Required");

    expect(getMessage).toBeInTheDocument();
  });

  it("should return validation error when first name is not provided", async () => {
    const entry = {
      firstName: "Grayson",
      lastName: "Hardin",
      deviceId: "",
      comments: "New comments",
    };

    retrieveID.mockResolvedValue(entry);

    render(<RouterProvider router={router} />);

    await userEvent.click(screen.getByLabelText("submit"));

    const getMessage = screen.getByText("Device ID Required");

    expect(getMessage).toBeInTheDocument();
  });
});
