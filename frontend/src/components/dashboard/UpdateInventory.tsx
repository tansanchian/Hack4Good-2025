import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid2";

interface InventoryRow {
  id: string;
  name: string;
  description: string;
  photoURL: string;
  category: string;
  quantity: string;
  price: string;
  preorder: string;
}

interface UpdateInventoryProps {
  open: boolean;
  handleClose: () => void;
  handleInventoryUpdate: (updatedUser: InventoryRow) => void;
  selectedItem: InventoryRow | null;
}

interface FormData {
  id: string;
  name: string;
  description: string;
  photoURL: string;
  category: string;
  quantity: string;
  price: string;
  preorder: string;
}

interface ErrorState {
  [key: string]: { error: boolean; message: string };
}

const UpdateInventory: React.FC<UpdateInventoryProps> = ({
  open,
  handleClose,
  handleInventoryUpdate,
  selectedItem,
}) => {
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const [errorState, setErrorState] = useState<ErrorState>({
    name: { error: false, message: "" },
    description: { error: false, message: "" },
    photoURL: { error: false, message: "" },
    category: { error: false, message: "" },
    quantity: { error: false, message: "" },
    price: { error: false, message: "" },
    preorder: { error: false, message: "" },
  });

  useEffect(() => {
    if (selectedItem) {
      setFormData(selectedItem);
    }
  }, [selectedItem]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateInputs()) {
      handleInventoryUpdate(formData as InventoryRow);
    }
  };

  const setError = (field: string, error: boolean, message: string) => {
    setErrorState((prevState) => ({
      ...prevState,
      [field]: { error, message },
    }));
  };

  const validateInputs = (): boolean => {
    const name = document.getElementById("name") as HTMLInputElement;
    let isValid = true;

    if (!name.value || name.value.length < 1) {
      setError("name", true, "Name is required.");
      isValid = false;
    } else {
      setError("name", false, "");
    }

    return isValid;
  };

  const formFieldsLeft = [
    {
      id: "name",
      label: "Full name",
      placeholder: "Jon Snow",
      value: formData.name,
      error: errorState.name.error,
      helperText: errorState.name.message,
    },
    {
      id: "description",
      label: "Description",
      value: formData.description,
      placeholder: "Sweet apple",
      error: errorState.description.error,
      helperText: errorState.description.message,
    },
    {
      id: "photoURL",
      label: "Photo",
      value: formData.photoURL,
      placeholder: "12345678",
      error: errorState.photoURL.error,
      helperText: errorState.photoURL.message,
    },
    {
      id: "category",
      label: "Category",
      value: formData.category,
      placeholder: "12345678",
      error: errorState.category.error,
      helperText: errorState.category.message,
    },
    {
      id: "quantity",
      label: "Quantity",
      type: "number",
      value: formData.quantity,
      placeholder: "12345678",
      error: errorState.quantity.error,
      helperText: errorState.quantity.message,
    },
    {
      id: "price",
      label: "Price",
      value: formData.price,
      type: "number",
      placeholder: "12345678",
      error: errorState.price.error,
      helperText: errorState.price.message,
    },
    {
      id: "preorder",
      label: "Preorder",
      type: "number",
      value: formData.preorder,
      placeholder: "Preorder quantity",
      error: errorState.preorder?.error || false,
      helperText: errorState.preorder?.message || "",
    }
  ];

  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
          return;
        }
        handleClose();
      }}
      aria-labelledby="update-inventory-dialog-title"
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
        sx: { backgroundImage: "none" },
      }}
    >
      <DialogTitle id="user-dialog-title">Item Details</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 6 }}>
            {formFieldsLeft.map((field) => (
              <FormControl key={field.id} fullWidth sx={{ marginBottom: 2 }}>
                <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
                {field.type === "select" ? (
                  <TextField
                    required
                    id={field.id}
                    name={field.id}
                    select
                    value={field.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, [field.id]: e.target.value })
                    }
                    fullWidth
                  >
                    {field.options.map(
                      (option: { value: string; label: string }) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                ) : (
                  <TextField
                    autoComplete={field.id}
                    name={field.id}
                    id={field.id}
                    fullWidth
                    variant="outlined"
                    value={field.value}
                    type={field.type}
                    placeholder={field.placeholder}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.id]: e.target.value })
                    }
                    error={field.error}
                    helperText={field.helperText}
                    color={field.error ? "error" : "primary"}
                  />
                )}
              </FormControl>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UpdateInventory.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleInventoryUpdate: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    preorder: PropTypes.string.isRequired,
  }),
};

export default UpdateInventory;
