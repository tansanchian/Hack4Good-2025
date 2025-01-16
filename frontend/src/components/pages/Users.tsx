import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { DataGrid, GridRowClassNameParams, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateUser from "../dashboard/UpdateUser";

interface UserRow {
  id: number;
  name: string;
  email: string;
  voucher: string;
  sex: string;
  admin: boolean;
  phonenumber: string;
  active: boolean;
}

const Users: React.FC = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClickOpenUpdate = (row: UserRow) => {
    setLoading(true);
    setSelectedUser(null);

    setTimeout(() => {
      setSelectedUser(row);
      setLoading(false);
    }, 0);
  };

  useEffect(() => {
    if (selectedUser && Object.keys(selectedUser).length > 0) {
      setOpenUpdate(true);
    }
  }, [selectedUser]);

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedUser(null);
  };

  const handleUpdateUserInfo = (updatedUser: UserRow) => {
    handleCloseUpdate();
    setSelectedUser(updatedUser);
  };

  const handleClickOpenDelete = (email: string) => {
    console.log("Delete user with email:", email);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", editable: false, width: 150 },
    { field: "email", headerName: "Email", editable: false, width: 300 },
    {
      field: "phonenumber",
      headerName: "Phone Number",
      editable: false,
      width: 150,
    },
    { field: "voucher", headerName: "Voucher", editable: false, width: 120 },
    { field: "admin", headerName: "Admin", editable: false, width: 70 },
    { field: "sex", headerName: "Gender", editable: false, width: 70 },
    { field: "active", headerName: "Active", editable: false, width: 70 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box>
          <IconButton
            sx={{
              border: "none",
              borderRadius: "50%",
            }}
            aria-label="edit"
            onClick={() => handleClickOpenUpdate(params.row as UserRow)}
          >
            <EditIcon fontSize="small" sx={{ color: "blue" }} />
          </IconButton>

          <IconButton
            sx={{
              border: "none",
              borderRadius: "50%",
            }}
            aria-label="delete"
            onClick={() => handleClickOpenDelete((params.row as UserRow).email)}
          >
            <DeleteIcon fontSize="small" sx={{ color: "red" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const rows: UserRow[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      voucher: "ABC123",
      phonenumber: "1234567890",
      sex: "Female",
      admin: false,
      active: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      voucher: "XYZ456",
      phonenumber: "1234567890",
      sex: "Female",
      admin: true,
      active: true,
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      voucher: "LMN789",
      phonenumber: "1234567890",
      sex: "Male",
      admin: true,
      active: true,
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob.brown@example.com",
      voucher: "OPQ012",
      phonenumber: "1234567890",
      sex: "Male",
      admin: true,
      active: true,
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Users
      </Typography>
      <DataGrid
        checkboxSelection
        rows={rows}
        columns={columns}
        getRowClassName={(params: GridRowClassNameParams) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "secondary.main",
          },
        }}
      />
      {selectedUser && (
        <UpdateUser
          open={openUpdate}
          handleClose={handleCloseUpdate}
          handleUpdateUserInfo={handleUpdateUserInfo}
          selectedUser={selectedUser}
        />
      )}
    </Box>
  );
};

export default Users;
