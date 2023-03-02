import Root from "../routes/Root";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import * as React from "react";
import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { deviceManager } from "../service.js";

vi.mock("../service.js");

const mocked_id = "23";

beforeEach(async () => {
  const entry = [{ id: mocked_id, firstName: "Bob", lastName: "Wiley", deviceId: "0213", comments: "N/A" }];
  deviceManager.mockResolvedValue({ rows: entry });
  const routes = [
    {
      path: "/",
      element: <Root />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/"],
    initialIndex: 1,
  });

  render(<RouterProvider router={router} />);
});
describe("Device Manager Component", () => {
  it("should render search", async () => {
    const search = await screen.findByLabelText("search");

    expect(search).toBeInTheDocument();
  });
});

it("should render add", async () => {
  const add = await screen.findByLabelText("add");

  expect(add).toBeInTheDocument();
});

it("should render add Person", async () => {
  const addPersonButton = await screen.findByLabelText("addPerson");

  expect(addPersonButton).toBeInTheDocument();
});

it("should render  view Persons", async () => {
  const addPersonButton = await screen.findByLabelText("viewPersons");

  expect(addPersonButton).toBeInTheDocument();
});

it("should render first name", async () => {
  const firstName = await screen.findByText("First name");

  expect(firstName).toBeInTheDocument();
});

it("should render first last", async () => {
  const lastName = await screen.findByText("Last name");

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

it("should render the actual comments", async () => {
  const comments = await screen.findByText("N/A");

  expect(comments).toBeInTheDocument();
});

it("should render delete", async () => {
  const comments = await screen.findByText("Delete");

  expect(comments).toBeInTheDocument();
});

it("should render edit", async () => {
  const edit = await screen.findByText("Edit");

  expect(edit).toBeInTheDocument();
});

it("should no rows", async () => {
  const noRows = await screen.findByText("No rows");

  expect(noRows).toBeInTheDocument();
});

it("should render page numbers", async () => {
  const pageNumber = await screen.findByText("1–1 of 1");

  expect(pageNumber).toBeInTheDocument();
});

it("should show a entry's first name", async () => {
  const firstName = await screen.findByText("Bob");

  expect(firstName).toBeInTheDocument();
});

it("should show a entry's last name", async () => {
  const lastName = await screen.findByText("Wiley");

  expect(lastName).toBeInTheDocument();
});

it("should show a entry's device id", async () => {
  const id = await screen.findByText("0213");

  expect(id).toBeInTheDocument();
});

it("should show a entry's comments", async () => {
  const comments = await screen.findByText("N/A");

  expect(comments).toBeInTheDocument();
});

it("should show updated results after an entry is deleted", async () => {
  const id = await screen.findByText("0213");

  expect(id).toBeInTheDocument();

  const entry = [];
  deviceManager.mockResolvedValue({ rows: entry });

  await userEvent.click(screen.getByLabelText(`Delete button for ${mocked_id}`));

  expect(id).not.toBeInTheDocument();
});
