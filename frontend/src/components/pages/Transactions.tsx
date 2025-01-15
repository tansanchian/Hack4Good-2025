import React, { useState } from "react";
import {
  Box,
  Grid2,
  Typography,
  Button,
  TextField,
  Paper,
  IconButton,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  selected: boolean;
  status: "Cancelled" | "Completed" | "Pending"; // Add status field
}

interface CartItemProps {
  item: CartItem;
  onDelete: (id: number) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item, onDelete }) => {
  return (
    <Paper elevation={2} style={{ padding: "16px", marginBottom: "16px" }}>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 size={{ xs: 4 }}>
          <Typography variant="body1" fontWeight="bold">
            {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {item.description}
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 2 }}>
          <Typography variant="body1" color="primary">
            ${item.price.toFixed(2)}
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 2 }}>
          <Grid2 style={{ maxWidth: "70px" }}>
            <Typography variant="body1">{item.quantity}</Typography>
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 2 }}>
          <Typography variant="body1" color="primary">
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 1 }}>{item.status}</Grid2>
        <Grid2 size={{ xs: 1 }}>
          {item.status === "Pending" ? (
            <IconButton onClick={() => onDelete(item.id)}>
              <DeleteIcon />
            </IconButton>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No Action
            </Typography>
          )}
        </Grid2>
      </Grid2>
    </Paper>
  );
};

const Transactions: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum",
      description: "SPF50+ PA++++",
      price: 15.99,
      quantity: 1,
      selected: false,
      status: "Completed",
    },
    {
      id: 3,
      name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum",
      description: "SPF50+ PA++++",
      price: 15.99,
      quantity: 1,
      selected: false,
      status: "Pending",
    },
    {
      id: 2,
      name: "COSRX Low pH Good Morning Gel Cleanser",
      description: "150ml",
      price: 8.0,
      quantity: 5,
      selected: false,
      status: "Cancelled",
    },
  ]);

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const filteredItems = cartItems.filter((item) => {
    if (selectedTab === 0) return true;
    if (selectedTab === 1) return item.status === "Cancelled";
    if (selectedTab === 2) return item.status === "Completed";
    return true;
  });

  const handleDelete = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Transactions
      </Typography>

      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="All" />
        <Tab label="Cancelled" />
        <Tab label="Completed" />
      </Tabs>

      <Divider style={{ margin: "16px 0" }} />

      <Grid2 container spacing={2} style={{ padding: "16px" }}>
        <Grid2 size={{ xs: 4 }}>
          <Typography variant="body1" fontWeight="bold">
            Product
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 2 }}>
          <Typography variant="body1" fontWeight="bold">
            Unit Price
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 2 }}>
          <Typography variant="body1" fontWeight="bold">
            Quantity
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 2 }}>
          <Typography variant="body1" fontWeight="bold">
            Total Price
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 1 }}>
          <Typography variant="body1" fontWeight="bold">
            Status
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 1 }}>
          <Typography variant="body1" fontWeight="bold">
            Actions
          </Typography>
        </Grid2>
      </Grid2>
      <Divider style={{ marginBottom: "16px" }} />
      <Box>
        {filteredItems.map((item) => (
          <CartItemComponent
            key={item.id}
            item={item}
            onDelete={handleDelete}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Transactions;
