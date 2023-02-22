import Edit from "../routes/Edit";
import { describe, it, expect } from "vitest";
import * as React from "react";
import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import {render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import {retrieveID} from "../service.js";


vi.mock("../service.js");

// go through and refactor tests so they are cleaned up
const graysonHardin = {
    firstName: "Grayson",
    lastName: "Hardin",
    deviceId: "0213",
    comments: "misc",
};

beforeEach(async () => {

    const entry = {firstName: graysonHardin.firstName, lastName: graysonHardin.lastName, id: graysonHardin.deviceId, comments: graysonHardin.comments}
    retrieveID.mockResolvedValue(entry)

    const routes = [
        {
            path: "/",
            element: <Edit />,
        },
    ];

    const router = createMemoryRouter(routes, {
        initialEntries: ["/", "/"],
        initialIndex: 1,
    });

    render(<RouterProvider router={router} />);
});
describe("Edit Component", () => {
    it("should render edit tag", async () => {
        const header = await screen.findByText(`Edit ${graysonHardin.firstName}'s Profile`)

        expect(header).toBeInTheDocument()
    })

    it("should render first name", async () => {
        const firstName = await screen.findByText("First Name")

        expect(firstName).toBeInTheDocument()
    })

    it("should render last name", async () => {
        const lastName = await screen.findByText("Last Name")

        expect(lastName).toBeInTheDocument()
    })

    it("should render device id", async () => {
        const id = await screen.findByText("Device ID")

        expect(id).toBeInTheDocument()
    })

    it("should render comments", async () => {
        const comments = await screen.findByText("Comments")

        expect(comments).toBeInTheDocument()
    })

    it("should render submit button", async () => {
        const submitButton = await screen.findByLabelText("submit")

        expect(submitButton).toBeInTheDocument()
    })


    it("should render cancel button", async () => {
        const submitButton = await screen.findByLabelText("cancel")

        expect(submitButton).toBeInTheDocument()
    })
    it("should return first name, last name, id, and comments from retrievedID function", async () => {
        const entry = {firstName: graysonHardin.firstName, lastName: graysonHardin.lastName, id: graysonHardin.deviceId, comments: graysonHardin.comments}

        const firstNameInput =  screen.getByLabelText("first name")
        const lastNameInput =  screen.getByLabelText("last name")
        const idInput =  screen.getByLabelText("id")
        const commentsInput =  screen.getByLabelText("comments")

        await waitFor(() => expect(firstNameInput.value).toEqual(entry.firstName));
        await waitFor(() => expect(lastNameInput.value).toEqual(entry.lastName));
        await waitFor(() => expect(idInput.value).toEqual(entry.id));
        await waitFor(() => expect(commentsInput.value).toEqual(entry.comments));

    })

})

