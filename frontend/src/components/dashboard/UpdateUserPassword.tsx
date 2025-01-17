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

interface UserPassword {
  id: string;
  newPassword: string;
  confirmPassword: string;
}

interface UpdateUserPasswordProps {
  open: boolean;
  handleClose: () => void;
  handleUpdateUserInfo: (updatedUser: UserPassword) => void;
  selectedUser: UserPassword | null;
}

interface FormData {
  id: string;
  newPassword: string;
  confirmPassword: string;
}

interface ErrorState {
  [key: string]: { error: boolean; message: string };
}

const UpdateUser: React.FC<UpdateUserPasswordProps> = ({
  open,
  handleClose,
  handleUpdateUserInfo,
  selectedUser,
}) => {
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const [errorState, setErrorState] = useState<ErrorState>({
    newPassword: { error: false, message: "" },
    confirmPassword: { error: false, message: "" },
  }); 

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    }
  }, [selectedUser]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateInputs()) {
      handleUpdateUserInfo(formData as UserPassword);
      handleClose();
    }
  };

  const setError = (field: string, error: boolean, message: string) => {
    setErrorState((prevState) => ({
      ...prevState,
      [field]: { error, message },
    }));
  };

  const validateInputs = (): boolean => {
    const confirmPassword = document.getElementById("confirmPassword") as HTMLInputElement;
    const newPassword = document.getElementById("newPassword") as HTMLInputElement;

    let isValid = true;

    if (newPassword.value && newPassword.value.length < 8) {
      setError("newPassword", true, "Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setError("newPassword", false, "");
    }

    if (confirmPassword.value && confirmPassword.value !== newPassword.value) {
      setError("confirmPassword", true, "Passwords must match.");
      isValid = false;
    } else {
      setError("confirmPassword", false, "");
    }

    return isValid;
  };

  const formFieldsLeft = [
    {
      id: "newPassword",
      label: "New Password",
      placeholder: "●●●●●●●●",
      type: "password",
      value: formData.newPassword,
      error: errorState.newPassword.error,
      helperText: errorState.newPassword.message,
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      placeholder: "●●●●●●●●",
      type: "password",
      value: formData.confirmPassword,
      error: errorState.confirmPassword.error,
      helperText: errorState.confirmPassword.message,
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
      aria-labelledby="update-user-dialog-title"
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
        sx: { backgroundImage: "none" },
      }}
    >
      <DialogTitle id="user-dialog-title">Set New Password</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 6 }}>
            {formFieldsLeft.map((field) => (
              <FormControl key={field.id} fullWidth sx={{ marginBottom: 2 }}>
                <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
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

UpdateUser.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleUpdateUserInfo: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    newPassword: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }),
};

export default UpdateUser;
