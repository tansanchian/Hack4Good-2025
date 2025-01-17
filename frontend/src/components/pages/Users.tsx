import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { DataGrid, GridRowClassNameParams, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAccount, getUsers, updateAccount, updateUserPrivilege } from "../../api/user";
import { useAuth } from "../../contexts/AuthContext";
import { PasswordRounded } from "@mui/icons-material";
import UpdateUserPassword from "../dashboard/UpdateUserPassword";
import UpdateUser from "../dashboard/UpdateUser";

interface UserRow {
  id: string;
  name: string;
  email: string;
  voucher: string;
  sex: string;
  admin: boolean;
  phonenumber: string;
  isActive: boolean;
}

interface UserPassword {
  id: string;
  newPassword: string;
  confirmPassword: string;
}

const Users: React.FC = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openUpdatePassword, setOpenUpdatePassword] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [selectedUserPassword, setSelectedUserPassword] = useState<UserPassword | null>(null);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const handleClickOpenUpdate = (row: UserRow) => {
    setLoading(true);
    setSelectedUser(null);

    setTimeout(() => {
      setSelectedUser(row);
      setLoading(false);
    }, 0);
  };

  const handleClickOpenUpdatePassword = (row: UserPassword) => {
    setLoading(true);
    setSelectedUserPassword(null);

    setTimeout(() => {
      setSelectedUserPassword(row);
      setLoading(false);
    }, 0);
  }

  useEffect(() => {
    if (selectedUser && Object.keys(selectedUser).length > 0) {
      setOpenUpdate(true);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUserPassword && Object.keys(selectedUserPassword).length > 0) {
      setOpenUpdatePassword(true);
    }
  }, [selectedUserPassword]);

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setOpenUpdatePassword(false);
    setSelectedUser(null);
    setSelectedUserPassword(null);
  };

  const handleUpdateUserInfo = (updatedUser: UserRow) => {
    handleCloseUpdate();
    setSelectedUser(updatedUser);

    // update admin privileges of user in backend
    updateUserPrivilege(
      updatedUser.id,
      updatedUser.admin
    ).then(response => {
      if (response.status === 200) {
        console.log("User permissions change successful");
      } else {
        console.error("User permissions change failed: ", response.message);
      }
    });

    // update user in backend
    updateAccount({
      id: updatedUser.id,
      username: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phonenumber,
      gender: updatedUser.sex,
      isActive: updatedUser.isActive
    }).then(response => {
      if (response.status === 200) {
        console.log("User update successful");
      } else {
        console.error("User update failed: ", response.message);
      }
    });
  };

  const handleUpdateUserInfoPassword = (updatedUser: UserPassword) => {
    handleCloseUpdate();
    setSelectedUserPassword(updatedUser);

    console.log(updatedUser.newPassword);

    // update user password in backend
    updateAccount({
      id: updatedUser.id,
      newPassword: updatedUser.newPassword
    }).then(response => {
      if (response.status === 200) {
        console.log("User update successful");
      } else {
        console.error("User update failed: ", response.message);
      }
    });
  };

  const handleClickOpenDelete = (id: string) => {
    console.log("Delete user with id:", id);

    deleteAccount(id).then(response => {
      if (response.status === 200) {
        console.log("Deletion successful");
      } else {
        console.error("Deletion failed");
      }
      updateRows();
    })
  };

  const DEFAULT_ROWS: UserRow[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      voucher: "ABC123",
      phonenumber: "1234567890",
      sex: "Female",
      admin: false,
      isActive: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      voucher: "XYZ456",
      phonenumber: "1234567890",
      sex: "Female",
      admin: true,
      isActive: true,
    },
    {
      id: "3",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      voucher: "LMN789",
      phonenumber: "1234567890",
      sex: "Male",
      admin: true,
      isActive: true,
    },
    {
      id: "4",
      name: "Bob Brown",
      email: "bob.brown@example.com",
      voucher: "OPQ012",
      phonenumber: "1234567890",
      sex: "Male",
      admin: true,
      isActive: true,
    },
  ];

  const [ rows, setRows ] = useState<UserRow[]>(DEFAULT_ROWS);

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
    { field: "isActive", headerName: "Active", editable: false, width: 70 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => ( auth.id !== params.id ? (
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
            aria-label="edit"
            onClick={() => handleClickOpenUpdatePassword({
              id: params.row.id,
              newPassword: "",
              confirmPassword: ""
            })}
          >
            <PasswordRounded fontSize="small" sx={{ color: "green" }} />
          </IconButton>
          <IconButton
            sx={{
              border: "none",
              borderRadius: "50%",
            }}
            aria-label="delete"
            onClick={() => handleClickOpenDelete((params.row as UserRow).id)}
          >
            <DeleteIcon fontSize="small" sx={{ color: "red" }} />
          </IconButton>
        </Box>
      ) : <></> ),
    },
  ];

  const updateRows = () => {
    getUsers().then(response => {
      if (response.status === 200) {
        setRows(response.data.map((row : any) => {
          return {
            id: row._id,
            name: row.username,
            email: row.email,
            voucher: row.voucher,
            phonenumber: row.phoneNumber,
            sex: row.gender,
            admin: row.isAdmin,
            isActive: row.isActive,
          } as UserRow
        }));
      } else {
        console.error("Could not fetch users!");
        setRows(DEFAULT_ROWS);
      }
    })
  }

  // get users from database
  useEffect(updateRows, [openUpdate, openUpdatePassword]);

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Manage Users
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
      {selectedUserPassword && (
        <UpdateUserPassword
          open={openUpdatePassword}
          handleClose={handleCloseUpdate}
          handleUpdateUserInfo={handleUpdateUserInfoPassword}
          selectedUser={selectedUserPassword}
        />
      )}
    </Box>
  );
};

export default Users;
