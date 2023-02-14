import "./App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useState } from "react";
import { deviceManager } from "./api/service";

function App() {
  const [rows, setRows] = useState([]);

  const submit = async () => {
    const databaseRecords = await deviceManager();
    setRows(databaseRecords.rows);
  };

  const columns = [
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
      field: "id",
      headerName: "Device ID",
      description: "Employee's last name",
      width: 150,
      editable: true,
    },
    {
      field: "comments",
      headerName: "Comments",
      description: "Additional comments",
      editable: true,
      sortable: false,
      width: 160,
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Button
        aria-label="search"
        color="success"
        sx={{ m: ".5rem" }}
        variant="contained"
        onClick={() => submit()}
      >
        Search
      </Button>
      <DataGrid
        rows={rows}
        columnBuffer={6}
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
