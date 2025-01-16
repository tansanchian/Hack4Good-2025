import React from "react";
import { Card, IconButton, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface EditableTaskProps {
  title: string;
  subtitle: string;
  description: string;
  points: number;
  remainingSlots: number;
  onEdit: () => void;
  onDelete: () => void;
}

const EditableTask: React.FC<EditableTaskProps> = ({
  title,
  subtitle,
  description,
  points,
  remainingSlots,
  onEdit,
  onDelete,
}) => {
  return (
    <Card
      sx={{
        position: "relative",
        border: "1px solid #eee",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: "16px",
        height: "auto",
        padding: 2,
      }}
    >
      {/* Edit Button */}
      <IconButton
        sx={{
          position: "absolute",
          top: 8,
          right: 50,
          zIndex: 1,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      >
        <EditIcon />
      </IconButton>

      {/* Delete Button */}
      <IconButton
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <DeleteIcon />
      </IconButton>

      {/* Task Title */}
      <Typography variant="h6">{title}</Typography>
      {/* Task Subtitle */}
      <Typography variant="body2" color="textSecondary">
        {subtitle}
      </Typography>
      {/* Task Description */}
      <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
        {description}
      </Typography>
      {/* Points and Remaining Slots */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}
      >
        <Typography variant="body2">Points: {points}</Typography>
        <Typography variant="body2">
          Remaining Slots: {remainingSlots}
        </Typography>
      </Box>
    </Card>
  );
};

export default EditableTask;
