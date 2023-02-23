import { Form, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import Paper from "@mui/material/Paper";
import { addEntry } from "../service";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "../index.css";

const initialValues = {
  firstName: "",
  lastName: "",
  id: "",
  comments: "",
};

export default function Add() {
  const [values, setValues] = useState(initialValues);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async () => {
    await addEntry(
      values.firstName,
      values.lastName,
      values.id,
      values.comments
    );
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return (
    <Box>
      <Paper elevation={5}>
        <Form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <label>First Name</label>
          <input
            aria-label={"first name"}
            name="firstName"
            label="firstName"
            id="firstName"
            type="text"
            {...register("firstName", { required: true, maxLength: 20 })}
            onChange={handleInputChange}
          />
          {errors.firstName && (
            <p className={"inputValidation"}>First Name Required</p>
          )}

          <label>Last Name</label>
          <input
            aria-label={"last name"}
            name="lastName"
            label="lastName"
            id="lastName"
            type="text"
            {...register("lastName", { required: true, maxLength: 20 })}
            onChange={handleInputChange}
          />
          {errors.lastName && (
            <p className={"inputValidation"}>Last Name Required</p>
          )}

          <label>Device ID</label>
          <input
            aria-label={"device id"}
            name="id"
            label="id"
            id="id"
            type="text"
            {...register("id", { required: true, maxLength: 20 })}
            onChange={handleInputChange}
          />
          {errors.id && <p className={"inputValidation"}>Device ID Required</p>}

          <label>Comments</label>
          <input
            aria-label={"comments"}
            name="comments"
            label="comments"
            id="comments"
            type="text"
            {...register("comments", { required: false, maxLength: 20 })}
            onChange={handleInputChange}
          />

          <p>
            <Button
              aria-label="add"
              type="submit"
              color="success"
              sx={{ m: ".5rem" }}
              variant="contained"
            >
              Add
            </Button>

            <Button
              href={"/"}
              aria-label="cancel"
              type="submit"
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
