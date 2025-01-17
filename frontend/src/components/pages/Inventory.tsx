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
import {
  deleteProduct,
  createProduct,
  getAllProducts,
  updateProduct,
  Product as ProductType,
  cProduct as cProduct,
} from "../../api/product";

interface ProductRow {
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

interface ItemRow {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
  quantity: number;
}

interface ProductDataType {
  _id: string;
  image: string;
  title: string;
  price: number;
  description: string;
  quantity: number;
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

  const [productData, setProductData] = useState<ProductDataType[]>([]);
  // Helper function to fetch and update product data
  const fetchAndSetProducts = async () => {
    const response = await getAllProducts();
    if (response.status === 200) {
      setProductData(
        response.productInfo.data.map((p: ProductType) => ({
          id: p._id,
          image: p.imageUrl,
          title: p.name,
          price: p.price,
          description: p.description,
          quantity: p.countInStock,
        }))
      );
    } else {
      setProductData([]);
    }
  };

  // Use the helper function in useEffect
  useEffect(() => {
    fetchAndSetProducts();
  }, []);

  // Handle creating a new product
  const handleCreateProduct = async (product: ProductRow) => {
    const newProduct: cProduct = {
      name: product.title,
      countInStock: product.quantity,
      imageUrl: product.image,
      price: product.price,
      description: product.description,
    };

    const response = await createProduct(newProduct);
    if (response.status === 201) {
      handleCloseCreate(); // Close the modal
      fetchAndSetProducts(); // Reload the product data
    } else {
      console.error("Failed to create product", response);
    }
  };

  // Handle deleting a product
  const handleClickOpenDelete = async (id: string) => {
    const response = await deleteProduct(id);
    if (response.status === 200) {
      fetchAndSetProducts(); // Reload the product data
    } else {
      console.error("Failed to delete product", response);
    }
  };

  // Handle updating inventory (example placeholder function)
  const handleInventoryUpdate = async (updatedItem: ItemRow) => {
    handleCloseUpdate();
    const response = await updateProduct(
      updatedItem.id,
      updatedItem.title,
      updatedItem.description,
      updatedItem.price,
      updatedItem.quantity,
      updatedItem.image
    );
    if (response.status === 200) {
      fetchAndSetProducts(); // Reload the product data
    } else {
      console.error("Failed to update product", response);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "image",
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
    { field: "title", headerName: "Name", editable: false, width: 150 },
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
        rows={productData}
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
