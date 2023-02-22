import {Form, redirect, useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import * as React from "react";
import Paper from "@mui/material/Paper";
import {retrieveID, updateEntry} from "../service";
import Button from "@mui/material/Button";
import {useState, useEffect} from "react";

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
    const [device, setDevice] = useState(initialValues);

    let { deviceID } = useParams();

    useEffect(() => {
        async function getDevice() {
            const response = await retrieveID(deviceID)
            console.log(response)
            setDevice(response)
        }

        getDevice();
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDevice({
            ...device,
            [name]: value,
        });
    };

    const handleUpdate = async () => {
        await updateEntry(
            device.firstName,
            device.lastName,
            device.id,
            device.comments)
    }

    return (
        <Box>
            <h3>Edit {device.firstName}'s Profile</h3>
            <Paper elevation={5}>
                <Form method="post" id="contact-form">
                    <p>
                        <span>First Name</span>
                        <input
                            onChange={handleInputChange}
                            value={device.firstName}
                            aria-label="first name"
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
                            value={device.lastName}
                            aria-label="last name"
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
                            value={device.id}
                            aria-label="id"
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
                            value={device.comments}
                            aria-label="comments"
                            name="comments"
                            label="comments"
                            type="text"
                            rows={6}
                            id="comments"
                        />
                    </label>
                    <p>
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

                    <Button
                        aria-label="cancel"
                        type="cancel"
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
