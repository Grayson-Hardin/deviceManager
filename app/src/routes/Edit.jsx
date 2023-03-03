import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import * as React from "react";
import { retrieveID, updateEntry } from "../service";
import { viewAllPersons } from "../personService";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../index.css";
import { InputWithLabel } from "../common/InputWithLabel.jsx";
import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

// 1. Had to include an ID on devices because the datagrid requires unique IDs
// 2. When a person is deleted, it automatically deletes the row in devices (because of the FK constraint)
// 3. The dropdown returns the first name and last name... best way to splice?

export default function Edit() {
  const [person, setPerson] = useState([]);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm();
  let { id } = useParams();

  const onSubmit = async () => {
    const device = getValues();

    await updateEntry(device.personId, device.deviceId, device.comments, device.id);
    navigate("/");
  };

  const getPersons = async () => {
    const persons = await viewAllPersons();

    const personOptions = persons.rows.map((person) => ({
      label: `${person.firstName} ` + ` ${person.lastName}`,
      id: person.id,
    }));

    setPerson(personOptions);
    return persons;
  };

  console.log(getValues());

  useEffect(() => {
    async function getDevice() {
      const response = await retrieveID(id);
      reset(response);
      getPersons();
    }

    getDevice();
  }, []);

  return (
    <Box>
      <h3>Edit {getValues().firstName}'s Profile</h3>
      <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          render={(props) => (
            <Autocomplete
              {...props}
              onChange={(e, data) => props.onChange(data)}
              error={errors}
              disablePortal
              id="combo-box-demo"
              options={person}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Select Person" />}
            />
          )}
          name="personId"
          control={control}
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
