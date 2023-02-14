import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("Device Manager Component", () => {
  it("should render First Name", () => {
    render(<App />);
    const actual = screen.getByText("First name");
    expect(actual).toBeInTheDocument();
  });

  it("should render Last Name", async () => {
    render(<App />);
    // const userEvent = screen.getByLabelText("search").click();
    await userEvent.click(screen.getByLabelText("search"));

    const actual = await screen.findByLabelText("Last name");
    expect(actual).toBeInTheDocument();
  });

  it("should render Device ID", () => {
    render(<App />);
    const actual = screen.getByText("Device ID");
    expect(actual).toBeInTheDocument();
  });

  it("should render Comments", async () => {
    render(<App />);
    const actual = await screen.findByLabelText("Comments");
    expect(actual).toBeInTheDocument();
  });

  it("should render No Rows", () => {
    render(<App />);
    const actual = screen.getByText("No rows");
    expect(actual).toBeInTheDocument();
  });

  it("should render Search button", () => {
    render(<App />);

    const actual = screen.getByText("Search");

    expect(actual).toBeInTheDocument();
  });

  it("should render page numbers", async () => {
    render(<App />);

    const actual = await screen.findByText("0–0 of 0");

    expect(actual).toBeInTheDocument();
  });

  it("should return first name when search is clicked", async () => {
    render(<App />);

    userEvent.click(screen.getByLabelText("search"));

    const actual = await screen.findByText("Grayson");

    expect(actual).toBeInTheDocument();
  });

  it("should return last name when search is clicked", async () => {
    render(<App />);

    userEvent.click(screen.getByLabelText("search"));

    const actual = await screen.findByText("Hardin");

    expect(actual).toBeInTheDocument();
  });

  it("should return device id when search is clicked", async () => {
    render(<App />);

    userEvent.click(screen.getByLabelText("search"));

    const actual = await screen.findByText("0213");

    expect(actual).toBeInTheDocument();
  });

  it("should return comments when search is clicked", async () => {
    render(<App />);

    userEvent.click(screen.getByLabelText("search"));

    const actual = await screen.findByText("N/A");

    expect(actual).toBeInTheDocument();
  });
});
