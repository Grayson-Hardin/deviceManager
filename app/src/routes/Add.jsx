import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import Paper from "@mui/material/Paper";
import { addEntry } from "../service";
import { useForm } from "react-hook-form";
import "../index.css";
import { InputWithLabel } from "../common/InputWithLabel.jsx";
export default function Add() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    let device = getValues();

    await addEntry(device.firstName, device.lastName, device.deviceId, device.comments);
    navigate("/");
  };

  return (
    <Box className={"container"}>
      <Paper elevation={5}>
        <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <InputWithLabel
            register={register}
            labelText="First Name"
            name="firstName"
            type="text"
            errors={errors}
            validation={{
              required: "First Name Required",
              maxLength: { value: 20, message: "Character Limit Is 20" },
            }}
          />

          <InputWithLabel
            register={register}
            labelText="Last Name"
            name="lastName"
            type="text"
            errors={errors}
            validation={{
              required: "Last Name Required",
              maxLength: { value: 20, message: "Character Limit Is 20" },
            }}
          />

          <InputWithLabel
            register={register}
            labelText="Device ID"
            name="deviceId"
            type="text"
            errors={errors}
            validation={{
              required: "Device ID Required",
              maxLength: { value: 4, message: "Character Limit Is 4" },
            }}
          />

          <InputWithLabel register={register} labelText="Comments" name="comments" type="text" errors={errors} />
          <div className={"buttons"}>
            <Button aria-label="add" type="submit" color="success" sx={{ m: ".5rem" }} variant="contained">
              Add
            </Button>

            <Button href={"/"} aria-label="cancel" type="submit" color="error" sx={{ m: ".5rem" }} variant="contained">
              Cancel
            </Button>
          </div>
        </form>
      </Paper>
    </Box>
  );
}
