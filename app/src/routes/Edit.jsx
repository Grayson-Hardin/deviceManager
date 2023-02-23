import {Form, useParams, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import * as React from "react";
import {retrieveID, updateEntry} from "../service";
import Button from "@mui/material/Button";
import {useState, useEffect} from "react";
import { useForm } from "react-hook-form";

const initialValues = {
    firstName: "",
    lastName: "",
    id: "",
    comments: "",
};
export default function Edit() {
    const navigate = useNavigate();
    const [device, setDevice] = useState(initialValues);
    const { register, handleSubmit, formState: { errors } } = useForm();
    let { deviceID } = useParams();


    const onSubmit = async () => {
        console.log(device.firstName,  device.lastName,
            device.id,
            device.comments)
        await updateEntry(
            device.firstName,
            device.lastName,
            device.id,
            device.comments)
        navigate("/")
    }

    useEffect(() => {
        async function getDevice() {
            const response = await retrieveID(deviceID)
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

    return (
        <Box>
            <h3>Edit {device.firstName}'s Profile</h3>
            <Form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
                    <label>First Name</label>
                    <input
                        value={device.firstName}
                        aria-label="first name"
                        name="firstName"
                        label="firstName"
                        type="text"
                        id="firstName"
                        {...register("firstName", { required: true, maxLength: 20 })}
                        onChange={handleInputChange}

                    />
                <label>Last Name</label>
                    <input
                        value={device.lastName}
                        aria-label="last name"
                        name="lastName"
                        label="lastName"
                        type="text"
                        id="lastName"
                        {...register("lastName", { required: true, maxLength: 20 })}
                        onChange={handleInputChange}

                    />
                <label>Device ID</label>

                <input
                    value={device.id}
                    aria-label="id"
                    name="id"
                    label="id"
                    type="text"
                    id="id"
                    {...register("id", { required: false, maxLength: 10 })}
                    onChange={handleInputChange}

                />
                {errors.lastName && <p className={"inputValidation"}>Last Name Required</p>}

                <label>Comments</label>
                <input
                        value={device.comments}
                        aria-label="comments"
                        name="comments"
                        label="comments"
                        type="text"
                        id="comments"
                        {...register("comments", { required: false, maxLength: 30 })}
                        onChange={handleInputChange}
                    />
                {errors.firstName && <p className={"inputValidation"}>First Name Required</p>}
                <Button
                    aria-label="submit"
                    type="submit"
                    color="success"
                    sx={{ m: ".5rem" }}
                    variant="contained"
                >
                    Submit
                </Button>

                <Button
                    href={"/"}
                    aria-label="cancel"
                    type="cancel"
                    color="error"
                    sx={{ m: ".5rem" }}
                    variant="contained"
                >
                    Cancel
                </Button>

            </Form>
        </Box>
    )
    // return (
    //     <Box>
    //         <h3>Edit {device.firstName}'s Profile</h3>
    //         <Paper elevation={5}>
    //             <Form method="post" id="contact-form">
    //                 <p>
    //                     <span>First Name</span>
    //                     <input
    //                         onChange={handleInputChange}
    //                         value={device.firstName}
    //                         aria-label="first name"
    //                         name="firstName"
    //                         label="firstName"
    //                         type="text"
    //                         id="firstName"
    //                     />
    //                 </p>
    //                 <label>
    //                     <span>Last Name</span>
    //                     <input
    //                         onChange={handleInputChange}
    //                         value={device.lastName}
    //                         aria-label="last name"
    //                         name="lastName"
    //                         label="lastName"
    //                         type="text"
    //                         id="lastName"
    //                     />
    //                 </label>
    //                 <label>
    //                     <span>Device ID</span>
    //                     <input
    //                         onChange={handleInputChange}
    //                         value={device.id}
    //                         aria-label="id"
    //                         name="id"
    //                         label="id"
    //                         type="text"
    //                         id="id"
    //                     />
    //                 </label>
    //                 <label>
    //                     <span>Comments</span>
    //                     <textarea
    //                         onChange={handleInputChange}
    //                         value={device.comments}
    //                         aria-label="comments"
    //                         name="comments"
    //                         label="comments"
    //                         type="text"
    //                         rows={6}
    //                         id="comments"
    //                     />
    //                 </label>
    //                 <p>
    //                     <Button
    //                         aria-label="submit"
    //                         type="submit"
    //                         color="success"
    //                         sx={{ m: ".5rem" }}
    //                         variant="contained"
    //                         onClick={handleUpdate}
    //                     >
    //                         Submit
    //                     </Button>
    //
    //                     <Button
    //                         aria-label="cancel"
    //                         type="cancel"
    //                         color="error"
    //                         sx={{ m: ".5rem" }}
    //                         variant="contained"
    //                     >
    //                         Cancel
    //                     </Button>
    //                 </p>
    //             </Form>
    //         </Paper>
    //     </Box>
    // );
}