import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Snackbar,
} from "@mui/material";
import { acceptVoucher } from "../../api/voucher";
import { useAuth } from "../../contexts/AuthContext";

interface TaskProps {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  points: number;
  slots: number;
  onClose: (message : string) => void;
}

const Task: React.FC<TaskProps> = ({
  _id,
  title,
  subtitle,
  description,
  points,
  slots,
  onClose
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);
  const { auth } = useAuth();

  return (
    <>
      {/* Main Task Card */}
      <Card
        sx={{
          cursor: "pointer",
          border: "1px solid #eee",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          marginBottom: "8px",
          height: "120px", // Increased height to accommodate new details
        }}
        onClick={toggleModal}
        onMouseEnter={(e: React.MouseEvent) => {
          const target = e.currentTarget as HTMLDivElement;
          target.style.transform = "translateY(-2px)";
          target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
        }}
        onMouseLeave={(e: React.MouseEvent) => {
          const target = e.currentTarget as HTMLDivElement;
          target.style.transform = "translateY(0)";
          target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Title bolded */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: "4px" }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginBottom: "4px" }}
          >
            {subtitle}
          </Typography>

          {/* Points and Remaining Slots */}
          <Typography variant="body2" color="textSecondary">
            Points: {points}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Remaining Slots: {slots}
          </Typography>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={modalOpen} onClose={toggleModal} fullWidth maxWidth="sm">
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {subtitle}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* Description for the task */}
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
          {/* Points and Remaining Slots inside Modal */}
          <Typography variant="body2" color="textSecondary">
            Points: {points}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Remaining Slots: {slots}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={async () => {
              toggleModal();
              const response = await acceptVoucher(_id, auth.id);
              onClose(response.message);
            }}
            fullWidth
          >
            Accept Task
          </Button>
        </DialogActions>
      </Dialog>     
    </>
  );
};

export default Task;
