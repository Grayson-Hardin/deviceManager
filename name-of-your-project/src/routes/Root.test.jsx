import { render, screen, waitFor } from "@testing-library/react";
import Root from "../routes/Root";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

describe("Device Manager Component", () => {
  it("should render First Name", () => {
    render(<Root />);
    const actual = screen.getByText("First name");
    expect(actual).toBeInTheDocument();
  });

  it("should render Last Name", async () => {
    render(<Root />);
    // const userEvent = screen.getByLabelText("search").click();
    await userEvent.click(screen.getByLabelText("search"));

    const actual = await screen.findByLabelText("Last name");
    expect(actual).toBeInTheDocument();
  });

  it("should render Device ID", () => {
    render(<Root />);
    const actual = screen.getByText("Device ID");
    expect(actual).toBeInTheDocument();
  });

  it("should render Comments", async () => {
    render(<Root />);
    const actual = await screen.findByLabelText("Comments");
    expect(actual).toBeInTheDocument();
  });

  it("should render No Rows", () => {
    render(<Root />);
    const actual = screen.getByText("No rows");
    expect(actual).toBeInTheDocument();
  });

  it("should render Search button", () => {
    render(<Root />);

    const actual = screen.getByText("Search");

    expect(actual).toBeInTheDocument();
  });

  it("should render page numbers", async () => {
    render(<Root />);

    const actual = await screen.findByText("0–0 of 0");

    expect(actual).toBeInTheDocument();
  });

  it("should return first name when search is clicked", async () => {
    render(<Root />);

    userEvent.click(screen.getByLabelText("search"));

    const actual = await screen.findByText("Grayson");

    expect(actual).toBeInTheDocument();
  });

  it("should return last name when search is clicked", async () => {
    render(<Root />);

    userEvent.click(screen.getByLabelText("search"));

    const actual = await screen.findByText("Hardin");

    expect(actual).toBeInTheDocument();
  });

  it("should return device id when search is clicked", async () => {
    render(<Root />);

    userEvent.click(screen.getByLabelText("search"));

    const actual = await screen.findByText("0213");

    expect(actual).toBeInTheDocument();
  });

  it("should return comments when search is clicked", async () => {
    render(<Root />);

    userEvent.click(screen.getByLabelText("search"));

    const actual = await screen.findByText("N/A");

    expect(actual).toBeInTheDocument();
  });

  it("should update results after an entry is deleted", async () => {
    render(<Root />);

    userEvent.click(screen.getByLabelText("search"));
    const actual = await screen.findByText("0213");

    userEvent.click(screen.getByLabelText("Delete button for 0213"));

    await waitFor(() => expect(actual).not.toBeInTheDocument());
  });
});
