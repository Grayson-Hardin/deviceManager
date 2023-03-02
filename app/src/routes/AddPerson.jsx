import { InputWithLabel } from "../common/InputWithLabel.jsx";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { addPerson } from "../service.js";

// Should the tables be joined on ID or device ID?
// What happens if a person is deleted but not the device...the serial ID would be out of sync
// Should there be an option to view all persons?
// Should there be an option to view all  devices
// investigate why the comments isn't displaying

// add a view all devices
// keep edit as is
// don't show entries without a device
export default function AddPerson() {
  const navigate = useNavigate();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    let person = getValues();

    await addPerson(person.firstName, person.lastName);
    navigate("/");
  };

  return (
    <Box>
      <Paper elevation={5}>
        <form id="contain-form" onSubmit={handleSubmit(onSubmit)}>
          <InputWithLabel register={register} labelText="First Name" name="firstName" type="text" errors={errors} />

          <InputWithLabel register={register} labelText="Last Name" name="lastName" type="text" errors={errors} />

          <Button aria-label="add" type="submit" color="success" sx={{ m: ".5rem" }} variant="contained">
            Add
          </Button>

          <Button href={"/"} aria-label="cancel" type="submit" color="error" sx={{ m: ".5rem" }} variant="contained">
            Cancel
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
