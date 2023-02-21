import { Form, redirect } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import Paper from "@mui/material/Paper";
import { addEntry } from "../service";
import { useState } from "react";

export async function action({ request, params }) {
  return redirect(`/`);
}

const initialValues = {
  firstName: "",
  lastName: "",
  id: "",
  comments: "",
};

export default function Add() {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleAdd = async () => {
    await addEntry(
      values.firstName,
      values.lastName,
      values.id,
      values.comments
    );
  };

  return (
    <Box>
      <Paper elevation={5}>
        <Form method="post" id="contact-form">
          <p>
            <span>First Name</span>
            <input
              value={values.firstName}
              onChange={handleInputChange}
              name="firstName"
              label="firstName"
              type="text"
              id="firstName"
            />
          </p>
          <label>
            <span>Last Name</span>
            <input
              value={values.lastName}
              onChange={handleInputChange}
              name="lastName"
              label="lastName"
              type="text"
              id="lastName"
            />
          </label>
          <label>
            <span>Device ID</span>
            <input
              values={values.id}
              onChange={handleInputChange}
              name="id"
              label="id"
              type="text"
              id="id"
            />
          </label>
          <label>
            <span>Comments</span>
            <textarea
              values={values.comments}
              onChange={handleInputChange}
              name="comments"
              label="comments"
              type="text"
              rows={6}
              id="comments"
            />
          </label>
          <p>
            <Button
              aria-label="add"
              type="submit"
              color="success"
              sx={{ m: ".5rem" }}
              variant="contained"
              onClick={handleAdd}
            >
              Add
            </Button>

            <Button
              aria-label="cancel"
              type="button"
              color="error"
              sx={{ m: ".5rem" }}
              variant="contained"
            >
              Cancel
            </Button>
          </p>
        </Form>
      </Paper>
    </Box>
  );
}
