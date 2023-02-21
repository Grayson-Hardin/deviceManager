import {Form, redirect} from "react-router-dom";
import Box from "@mui/material/Box";
import * as React from "react";
import Paper from "@mui/material/Paper";
import { updateEntry } from "../service";
import Button from "@mui/material/Button";

export async function action({ request, params }) {
    return redirect(`/`);
}
export default function Edit() {

    const handleUpdate = async () => {
        await updateEntry()
    }

    return (
        <Box>
            <h1>Edit</h1>
            <Paper elevation={5}>
                <Form method="post" id="contact-form">
                    <p>
                        <span>First Name</span>
                        <input
                            value={"Bob"}
                            name="firstName"
                            label="firstName"
                            type="text"
                            id="firstName"
                        />
                    </p>
                    <label>
                        <span>Last Name</span>
                        <input
                            value={"Wiley"}
                            name="lastName"
                            label="lastName"
                            type="text"
                            id="lastName"
                        />
                    </label>
                    <label>
                        <span>Device ID</span>
                        <input
                            value={"1"}
                            name="id"
                            label="id"
                            type="text"
                            id="id"
                        />
                    </label>
                    <label>
                        <span>Comments</span>
                        <textarea
                            value={"Baby steps"}
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
