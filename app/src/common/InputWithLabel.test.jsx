import { render, screen } from "@testing-library/react";
import { InputWithLabel } from "./InputWithLabel.jsx";
import { it } from "vitest";

const name = "firstName";
const labelText = "first name";

const register = () => {};

it("should have a label associated with input", () => {
  render(
    <form>
      <InputWithLabel labelText={labelText} name={name} register={register} />{" "}
    </form>
  );

  const firstName = screen.getByLabelText(labelText);

  expect(firstName).toBeInTheDocument();
});

it("should validate that returned label is associated with an input", () => {
  render(<InputWithLabel labelText={labelText} name={name} register={register} />);

  const firstName = screen.getByLabelText(labelText);

  expect(firstName.nodeName).toEqual("INPUT");
});

it("should have a label name associated with input", () => {
  render(<InputWithLabel labelText={labelText} name={name} register={register} />);

  const firstName = screen.getByLabelText(labelText);

  expect(firstName.name).toEqual("firstName");
});

it("should have a label type associated with input", () => {
  const type = "text";
  render(<InputWithLabel labelText={labelText} type={type} name={name} register={register} />);

  const firstName = screen.getByLabelText(labelText);

  expect(firstName.type).toEqual("text");
});

it("should have a label id associated with input", () => {
  render(<InputWithLabel labelText={labelText} name={name} register={register} />);

  const firstName = screen.getByLabelText(labelText);

  expect(firstName.id).toEqual("firstName");
});

it("should render error when first name is not provided", () => {
  const error = { firstName: { message: "First Name Required", type: "required" } };
  render(
    <InputWithLabel
      labelText={labelText}
      name={name}
      register={register}
      validation={{ required: true }}
      errors={error}
    />
  );

  const errorMessage = screen.getByText(error.firstName.message);

  expect(errorMessage).toBeInTheDocument();
});

it("should return validation error when first name's character length is over 20", () => {
  const error = { firstName: { message: "Character Limit Is 20", type: "required" } };
  render(
    <InputWithLabel
      labelText={labelText}
      name={name}
      register={register}
      validation={{ required: true }}
      errors={error}
    />
  );

  const errorMessage = screen.getByText(error.firstName.message);

  expect(errorMessage).toBeInTheDocument();
});
