import { Form, redirect } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { deviceManager, deleteEntry } from "../service";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Root() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function refreshPage() {
      await handleSearch();
    }

    refreshPage();
  }, []);

  const handleSearch = async () => {
    const databaseRecords = await deviceManager();
    setRows(databaseRecords.rows);
  };

  const handleDelete = async (id) => {
    await deleteEntry(id);

    await handleSearch();
  };

  const columns = [
    {
      field: "firstName",
      headerName: "First name",
      description: "Employee's first name",
      width: 150,
      editable: false,
    },

    {
      field: "lastName",
      headerName: "Last name",
      description: "Employee's last name",
      width: 150,
      editable: false,
    },

    {
      field: "deviceId",
      headerName: "Device ID",
      description: "Device's ID",
      width: 150,
      editable: false,
    },
    {
      field: "comments",
      headerName: "Comments",
      description: "Additional comments",
      editable: false,
      sortable: false,
      width: 160,
    },
    {
      field: "action",
      headerName: "Delete",
      sortable: false,
      editable: false,
      renderCell: (params) => {
        const onClick = async (e) => {
          e.stopPropagation();

          await handleDelete(params.id);
        };

        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

        return (
          <Button
            aria-label={`Delete button for ${params.id}`}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={onClick}
          ></Button>
        );
      },
    },

    {
      field: "edit",
      headerName: "Edit",
      description: "Edit entry",
      editable: false,
      sortable: false,
      width: 160,
      renderCell: (params) => {
        const onClick = async (e) => {
          e.stopPropagation();
        };

        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

        return (
          <Button
            aria-label="editButton"
            color="info"
            variant="contained"
            href={`devices/edit/${params.id}`}
            startIcon={<EditIcon />}
            onClick={onClick}
          ></Button>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Form method="post">
        <Button
          aria-label="search"
          color="success"
          sx={{ m: ".5rem" }}
          variant="contained"
          onClick={() => handleSearch()}
        >
          Search
        </Button>

        <Button aria-label="add" color="info" sx={{ m: ".5rem" }} variant="contained" type="submit">
          Add
        </Button>
      </Form>

      <DataGrid
        rows={rows}
        columnBuffer={6}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}

export async function action() {
  return redirect(`/devices/add/`);
}
