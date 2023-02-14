import "./App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useState } from "react";
import { deviceManager, deleteEntry } from "./api/service";
import DeleteIcon from "@mui/icons-material/Delete";
function App() {
  const [rows, setRows] = useState([]);

  const handleSearch = async () => {
    const databaseRecords = await deviceManager();
    setRows(databaseRecords.rows);
  };

  const handleDelete = async (id) => {
    await deleteEntry(id);

    return handleSearch();
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
    {
      field: "action",
      headerName: "Delete",
      sortable: false,
      editable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          handleDelete(thisRow.id);
        };

        return (
          <Button
            aria-label="deleteButton"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={onClick}
          ></Button>
        );
      },
    },
  ];
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Button
        aria-label="search"
        color="success"
        sx={{ m: ".5rem" }}
        variant="contained"
        onClick={() => handleSearch()}
      >
        Search
      </Button>

      <DataGrid
        rows={rows}
        columnBuffer={5}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}

export default App;
