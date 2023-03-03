import { Form, redirect } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { deletePerson, viewAllPersons } from "..//personService";
import DeleteIcon from "@mui/icons-material/Delete.js";

export default function ViewPersons() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function refreshPage() {
      await handleSearch();
    }

    refreshPage();
  }, []);

  const handleSearch = async () => {
    const databaseRecords = await viewAllPersons();
    setRows(databaseRecords.rows);
  };

  const handleDelete = async (id) => {
    await deletePerson(id);

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
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Form method="post">
        <Button
          href={"/"}
          aria-label="search"
          color="success"
          sx={{ m: ".5rem" }}
          variant="contained"
          onClick={() => handleSearch()}
        >
          Back
        </Button>
      </Form>

      <DataGrid
        rows={rows}
        columnBuffer={7}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
