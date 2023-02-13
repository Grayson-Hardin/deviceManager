import "./App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useState } from "react";
import { deviceManager } from "./api/service";

function App() {
  const [deviceID, setDeviceID] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [comments, setComments] = useState(null);

  const submit = async () => {
    const databaseRecords = await deviceManager();
    setFirstName(databaseRecords.firstName);
    setLastName(databaseRecords.lastName);
    setDeviceID(databaseRecords.deviceID);
    setComments(databaseRecords.comments);

    console.log(databaseRecords.length);
  };

  const columns = [
    {
      field: "id",
      headerName: "Row ID",
      description: "Device's ID number",
      width: 90,
      editable: true,
    },
    {
      field: "firstName",
      headerName: "First name",
      description: "Employee's first name",
      width: 150,
      editable: true,
    },

    {
      field: "lastName",
      headerName: "Last name",
      description: "Employee's last name",
      width: 150,
      editable: true,
    },

    {
      field: "deviceID",
      headerName: "Device ID",
      description: "Employee's last name",
      width: 150,
      editable: true,
    },
    {
      field: "Comments",
      headerName: "Comments",
      description: "Additional comments",
      editable: true,
      sortable: false,
      width: 160,
    },
  ];

  let items = [
    { lastname: "Yo", firstName: "Sup", deviceID: 123, comments: "N/A" },
    { lastname: "Hi", firstName: "bye", deviceID: 42, comments: "N/A" },
  ];
  const rows = [
    {
      id: 1,
      lastName: lastName,
      firstName: firstName,
      deviceID: deviceID,
      Comments: comments,
    },
    {
      id: 1,
      lastName: lastName,
      firstName: firstName,
      deviceID: deviceID,
      Comments: comments,
    },
  ];

  // for (let row of items) {
  //   console.log(row);
  // }

  // const generateRows = () => {
  //   let counter = 0;
  //   for (let row of items) {
  //     const results = {
  //       id: counter,
  //       firstName: row,
  //     };
  //     return results;
  //   }
  // };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Button
        color="success"
        sx={{ m: ".5rem" }}
        variant="contained"
        onClick={() => submit()}
      >
        Search
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}

export default App;
