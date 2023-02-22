import {Form, redirect, useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import * as React from "react";
import Paper from "@mui/material/Paper";
import {updateEntry} from "../service";
import Button from "@mui/material/Button";
import {extractRowValues} from "./Root.jsx";
import {useState} from "react";

const row = extractRowValues()

console.log(row.firstName)
export async function action({ request, params }) {
    return redirect(`/`);
}

const initialValues = {
    firstName: "",
    lastName: "",
    id: "",
    comments: "",
};

export default function Edit() {

    let { deviceID } = useParams();


    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleUpdate = async () => {
        await updateEntry(
            values.firstName,
            values.lastName,
            values.id,
            values.comments)
    }

    return (
        <Box>
            <h1>Edit {deviceID}</h1>
            <Paper elevation={5}>
                <Form method="post" id="contact-form">
                    <p>
                        <span>First Name</span>
                        <input
                            onChange={handleInputChange}
                            placeholder={row.firstName}
                            name="firstName"
                            label="firstName"
                            type="text"
                            id="firstName"
                        />
                    </p>
                    <label>
                        <span>Last Name</span>
                        <input
                            onChange={handleInputChange}
                            placeholder={row.lastName}
                            name="lastName"
                            label="lastName"
                            type="text"
                            id="lastName"
                        />
                    </label>
                    <label>
                        <span>Device ID</span>
                        <input
                            onChange={handleInputChange}
                            placeholder={row.id}
                            name="id"
                            label="id"
                            type="text"
                            id="id"
                        />
                    </label>
                    <label>
                        <span>Comments</span>
                        <textarea
                            onChange={handleInputChange}
                            placeholder={row.comments}
                            name="comments"
                            label="comments"
                            type="text"
                            rows={6}
                            id="comments"
                        />
                    </label>
                    <Button
                        aria-label="submit"
                        type="submit"
                        color="success"
                        sx={{ m: ".5rem" }}
                        variant="contained"
                        onClick={handleUpdate}
                    >
                        Submit
                    </Button>
                </Form>
            </Paper>
        </Box>
    );
}
