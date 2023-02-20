import { Form, redirect } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { deviceManager, deleteEntry } from "../../backupSrc/api/service";
import DeleteIcon from "@mui/icons-material/Delete";
export default function Root() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function refreshPage() {
      await handleSearch();
    }

    let ignore = false;
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
        const onClick = async (e) => {
          e.stopPropagation();

          await handleDelete(thisRow.id);
        };

        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );

        return (
          <Button
            aria-label={`Delete button for ${thisRow.id}`}
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

        <Button
          aria-label="add"
          color="info"
          sx={{ m: ".5rem" }}
          variant="contained"
          type="submit"
        >
          Add
        </Button>
      </Form>

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

export async function action() {
  return redirect(`/routes/add/`);
}
