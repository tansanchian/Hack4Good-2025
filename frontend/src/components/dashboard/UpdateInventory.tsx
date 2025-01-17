import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid2";

interface InventoryRow {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
  quantity: number;
}

interface UpdateInventoryProps {
  open: boolean;
  handleClose: () => void;
  handleInventoryUpdate: (updatedUser: InventoryRow) => void;
  selectedItem: InventoryRow | null;
}

interface FormData {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
  quantity: number;
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
    title: { error: false, message: "" },
    description: { error: false, message: "" },
    image: { error: false, message: "" },
    quantity: { error: false, message: "" },
    price: { error: false, message: "" },
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
    const title = document.getElementById("title") as HTMLInputElement;
    let isValid = true;

    if (!title.value || title.value.length < 1) {
      setError("title", true, "Title is required.");
      isValid = false;
    } else {
      setError("title", false, "");
    }

    return isValid;
  };

  const formFieldsLeft = [
    {
      id: "title",
      label: "Title",
      placeholder: "Jon Snow",
      value: formData.title,
      error: errorState.title.error,
      helperText: errorState.title.message,
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
      id: "image",
      label: "Photo",
      value: formData.image,
      placeholder: "12345678",
      error: errorState.image.error,
      helperText: errorState.image.message,
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
      <DialogContent sx={{ display: "flex", gap: 2 }}>
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
                ></TextField>
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
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }),
};

export default UpdateInventory;
