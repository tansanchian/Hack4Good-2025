import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton, Button } from "@mui/material";
import {
  DataGrid,
  GridRowClassNameParams,
  GridToolbar,
  GridColDef,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateInventory from "../dashboard/UpdateInventory";
import CreateProducts from "../dashboard/CreateProducts";

interface ItemRow {
  id: string;
  name: string;
  description: string;
  photoURL: string;
  category: string;
  quantity: string;
  price: string;
  preorder: string;
}

const Inventory: React.FC = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemRow | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

  const handleClickOpenUpdate = (row: ItemRow) => {
    setSelectedItem(null);
    setTimeout(() => {
      setSelectedItem(row);
    }, 0);
  };

  useEffect(() => {
    if (selectedItem && Object.keys(selectedItem).length > 0) {
      setOpenUpdate(true);
    }
  }, [selectedItem]);

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedItem(null);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleCreateProduct = () => {
    handleCloseCreate();
  };

  const handleInventoryUpdate = (updatedItem: ItemRow) => {
    handleCloseUpdate();
    setSelectedItem(updatedItem);
  };

  const handleClickOpenDelete = (email: string) => {
    console.log("Delete user with email:", email);
  };

  const columns: GridColDef[] = [
    {
      field: "photoURL",
      headerName: "Photo",
      editable: false,
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Photo"
          style={{ width: "100%", height: "auto" }}
        />
      ),
    },
    { field: "name", headerName: "Name", editable: false, width: 150 },
    {
      field: "description",
      headerName: "Description",
      editable: false,
      width: 300,
    },

    { field: "category", headerName: "Category", editable: false, width: 150 },
    {
      field: "quantity",
      headerName: "Quantity",
      editable: false,
      width: 150,
    },
    { field: "price", headerName: "Price", editable: false, width: 120 },
    {
      field: "preorder",
      headerName: "Preorder",
      editable: false,
      width: 150,
    },
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
            onClick={() => handleClickOpenUpdate(params.row as ItemRow)}
          >
            <EditIcon fontSize="small" sx={{ color: "blue" }} />
          </IconButton>

          <IconButton
            sx={{
              border: "none",
              borderRadius: "50%",
            }}
            aria-label="delete"
            onClick={() => handleClickOpenDelete((params.row as ItemRow).id)}
          >
            <DeleteIcon fontSize="small" sx={{ color: "red" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const rows: ItemRow[] = [
    {
      id: "1",
      name: "Widget A",
      description: "lol",
      photoURL:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      category: "Tools",
      quantity: "50",
      price: "50",
      preorder: "0",
    },
    {
      id: "2",
      name: "Widget B",
      description: "lol",
      photoURL:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      category: "Electronics",
      quantity: "30",
      price: "50",
      preorder: "0",
    },
    {
      id: "3",
      name: "Gadget C",
      description: "lol",
      photoURL:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      category: "Appliances",
      quantity: "20",
      price: "50",
      preorder: "0",
    },
    {
      id: "4",
      name: "Gadget D",
      description: "lol",
      photoURL:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      category: "Furniture",
      quantity: "15",
      price: "50",
      preorder: "0",
    },
    {
      id: "232",
      name: "Gadget D",
      description: "lol",
      photoURL:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      category: "Furniture",
      quantity: "15",
      price: "50",
      preorder: "0",
    },
    {
      id: "121",
      name: "Gadget D",
      description: "lol",
      photoURL:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      category: "Furniture",
      quantity: "15",
      price: "50",
      preorder: "0",
    },
    {
      id: "122",
      name: "Gadget D",
      description: "lol",
      photoURL:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      category: "Furniture",
      quantity: "15",
      price: "50",
      preorder: "0",
    },
    {
      id: "133",
      name: "Gadget D",
      description: "lol",
      photoURL:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      category: "Furniture",
      quantity: "15",
      price: "50",
      preorder: "0",
    },
    {
      id: "27",
      name: "Gadget D",
      description: "lol",
      photoURL:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      category: "Furniture",
      quantity: "15",
      price: "50",
      preorder: "0",
    },
    {
      id: "26",
      name: "Gadget D",
      description: "lol",
      photoURL:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      category: "Furniture",
      quantity: "15",
      price: "50",
      preorder: "0",
    },
    {
      id: "25",
      name: "Gadget D",
      description: "lol",
      photoURL:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      category: "Furniture",
      quantity: "15",
      price: "50",
      preorder: "0",
    },
    {
      id: "23",
      name: "Gadget D",
      description: "lol",
      photoURL:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      category: "Furniture",
      quantity: "15",
      price: "50",
      preorder: "0",
    },
    {
      id: "22",
      name: "Gadget D",
      description: "lol",
      photoURL:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      category: "Furniture",
      quantity: "15",
      price: "50",
      preorder: "0",
    },
    {
      id: "21",
      name: "Gadget D",
      description: "lol",
      photoURL:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      category: "Furniture",
      quantity: "15",
      price: "50",
      preorder: "0",
    },
    {
      id: "56",
      name: "Gadget D",
      description: "lol",
      photoURL:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      category: "Furniture",
      quantity: "15",
      price: "50",
      preorder: "0",
    },
    {
      id: "5",
      name: "Tool E",
      description: "lol",
      photoURL:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      category: "Hardware",
      quantity: "0",
      price: "50",
      preorder: "10",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px", minHeight: "100vh" },
      }}
    >
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Inventory List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => setOpenCreate(true)}
      >
        Add New Product
      </Button>

      {/* DataGrid container */}

      <DataGrid
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
        slots={{
          toolbar: GridToolbar,
        }}
      />

      {selectedItem && (
        <UpdateInventory
          open={openUpdate}
          handleClose={handleCloseUpdate}
          handleInventoryUpdate={handleInventoryUpdate}
          selectedItem={selectedItem}
        />
      )}
      <CreateProducts
        open={openCreate}
        handleClose={handleCloseCreate}
        handleCreateProduct={handleCreateProduct}
      />
    </Box>
  );
};

export default Inventory;
