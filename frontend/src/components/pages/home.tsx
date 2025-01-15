import React, { useState } from "react";
import {
  Box,
  Grid2,
  Typography,
  Button,
  TextField,
  Paper,
  Checkbox,
  Card,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../contexts/AuthContext";

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  selected: boolean; // To track if the item is selected
}

interface CartItemProps {
  item: CartItem;
  onUpdate: (id: number, quantity: number) => void;
  onDelete: (id: number) => void;
  onSelect: (id: number) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  onUpdate,
  onDelete,
  onSelect,
}) => {
  return (
    <Paper elevation={2} style={{ padding: "16px", marginBottom: "16px" }}>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 size={{ xs: 1 }}>
          <Checkbox
            checked={item.selected}
            onChange={() => onSelect(item.id)}
          />
        </Grid2>
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
            <TextField
              type="number"
              size="small"
              value={item.quantity}
              onChange={(e) => onUpdate(item.id, parseInt(e.target.value) || 1)}
              fullWidth
            />
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 2 }}>
          <Typography variant="body1" color="primary">
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 1 }}>
          <IconButton onClick={() => onDelete(item.id)}>
            <DeleteIcon />
          </IconButton>
        </Grid2>
      </Grid2>
    </Paper>
  );
};

const Home: React.FC = () => {
  const { auth } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum",
      description: "SPF50+ PA++++",
      price: 15.99,
      quantity: 1,
      selected: false,
    },
    {
      id: 2,
      name: "COSRX Low pH Good Morning Gel Cleanser",
      description: "150ml",
      price: 8.0,
      quantity: 1,
      selected: false,
    },
  ]);

  const handleUpdate = (id: number, quantity: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleDelete = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleSelect = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleSelectAll = () => {
    const allSelected = cartItems.every((item) => item.selected);
    setCartItems((items) =>
      items.map((item) => ({ ...item, selected: !allSelected }))
    );
  };

  const getTotalPrice = (): string =>
    cartItems
      .filter((item) => item.selected)
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Hi { auth.username },
      </Typography>
      <Card>
        <Typography variant="h6" padding={2}>
          Voucher Balance: 500 points
        </Typography>
      </Card>
      <Typography component="h2" variant="h6" sx={{ mb: 1 }}>
        Shopping Cart
      </Typography>

      <Grid2 container spacing={2} style={{ padding: "16px" }}>
        <Grid2 size={{ xs: 1 }}>
          <Checkbox
            checked={cartItems.every((item) => item.selected)}
            onChange={handleSelectAll}
          />
        </Grid2>
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
            Actions
          </Typography>
        </Grid2>
      </Grid2>
      <Divider style={{ marginBottom: "16px" }} />
      <Box>
        {cartItems.map((item) => (
          <CartItemComponent
            key={item.id}
            item={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onSelect={handleSelect}
          />
        ))}
      </Box>

      <Paper elevation={3} style={{ padding: "16px", marginTop: "16px" }}>
        <Typography variant="h6">Summary</Typography>
        <Typography variant="body1">Total Price: ${getTotalPrice()}</Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Check Out
        </Button>
      </Paper>
    </Box>
  );
};

export default Home;
