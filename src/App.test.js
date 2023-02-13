import { render, screen } from "@testing-library/react";
import App from "./App";

process.env.DEBUG_PRINT_LIMIT = 1000000;
describe("Device Manager Component", () => {
  it("should render Device ID", () => {
    render(<App />);
    const actual = screen.getByText("Device ID");
    expect(actual).toBeInTheDocument();
  });

  it("should render First Name", () => {
    render(<App />);
    const actual = screen.getByText("First name");
    expect(actual).toBeInTheDocument();
  });

  it("should render Last Name", () => {
    render(<App />);
    const actual = screen.getByText("Last name");
    expect(actual).toBeInTheDocument();
  });

  it("should render Comments", () => {
    render(<App />);
    const actual = screen.getByText("Comments");
    expect(actual).toBeInTheDocument();
  });

  // it("should render No Rows", () => {
  //   render(<App />);
  //   const actual = screen.getByText("No rows");
  //   expect(actual).toBeInTheDocument();
  // });
});
