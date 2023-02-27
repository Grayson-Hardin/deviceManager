import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import * as React from "react";
import { retrieveID, updateEntry } from "../service";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../index.css";
import { InputWithLabel } from "../common/InputWithLabel.jsx";

export default function Edit() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  let { id } = useParams();

  const onSubmit = async () => {
    const device = getValues();

    await updateEntry(device.firstName, device.lastName, device.deviceId, device.comments, device.id);
    navigate("/");
  };

  useEffect(() => {
    async function getDevice() {
      const response = await retrieveID(id);
      reset(response);
    }

    getDevice();
  }, []);

  return (
    <Box>
      <h3>Edit {getValues().firstName}'s Profile</h3>
      <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <InputWithLabel
          register={register}
          labelText="First Name"
          name="firstName"
          type="text"
          validation={{ required: "First Name Required", maxLength: { value: 20, message: "Character Limit Is 20" } }}
          errors={errors}
        />

        <InputWithLabel
          register={register}
          labelText="Last Name"
          name="lastName"
          type="text"
          validation={{ required: "Last Name Required", maxLength: { value: 20, message: "Character Limit Is 20" } }}
          errors={errors}
        />

        <InputWithLabel
          register={register}
          labelText="Device ID"
          name="deviceId"
          type="text"
          validation={{ required: "Device ID Required", maxLength: { value: 4, message: "Character Limit Is 4" } }}
          errors={errors}
        />

        <InputWithLabel register={register} labelText="Comments" name="comments" type="text" />
        <Button aria-label="submit" type="submit" color="success" sx={{ m: ".5rem" }} variant="contained">
          Submit
        </Button>

        <Button href={"/"} aria-label="cancel" type="cancel" color="error" sx={{ m: ".5rem" }} variant="contained">
          Cancel
        </Button>
      </form>
    </Box>
  );
}
