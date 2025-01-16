import React, { useState } from "react";
import {
  Card,
  Typography,
  Box,
  Button,
  Snackbar,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";

const VoucherApprovalReject = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "John Doe",
      title: "da,m",
      description: "Submitted a voucher for travel expenses.",
      points: 10,
      photoUrl:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      status: "pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "da,m",
      description: "Submitted a voucher for food expenses.",
      points: 20,
      photoUrl:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      status: "approved",
    },
    {
      id: 3,
      name: "Bob Johnson",
      title: "da,m",
      description: "Submitted a voucher for accommodation.",
      points: 15,
      photoUrl:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      status: "rejected",
    },
  ]);

  const [successMessage, setSuccessMessage] = useState("");
  const [currentTab, setCurrentTab] = useState(0);

  // Handle tab changes
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // Define the type for filteredTasks
  const filteredTasks: { [key: number]: typeof tasks } = {
    0: tasks.filter((task) => task.status === "pending"),
    1: tasks.filter((task) => task.status === "approved"),
    2: tasks.filter((task) => task.status === "rejected"),
  };

  // Approve a task
  const approveTask = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: "approved" } : task
    );
    setTasks(updatedTasks);
    setSuccessMessage("Task approved successfully!");
  };

  // Reject a task
  const rejectTask = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: "rejected" } : task
    );
    setTasks(updatedTasks);
    setSuccessMessage("Task rejected successfully!");
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        Voucher Approval System
      </Typography>

      {/* Tabs for different task statuses */}
      <Tabs value={currentTab} onChange={handleTabChange}>
        <Tab label="Pending Approval" />
        <Tab label="Approved" />
        <Tab label="Rejected" />
      </Tabs>

      <Divider sx={{ my: 2 }} />

      {/* Render filtered tasks based on the current tab */}
      {filteredTasks[currentTab].map((task) => (
        <Card
          key={task.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: 2,
            padding: 2,
            height: "auto", // Ensures the card expands to accommodate all content
            position: "relative", // To position the status and buttons at the bottom right
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <img
              src={task.photoUrl}
              alt={`${task.name}'s submission`}
              style={{ width: 160, height: 160, borderRadius: "8px" }}
            />
            <Box>
              <Typography variant="h6" gutterBottom>
                Name: {task.name}
              </Typography>
              <Typography variant="body2">Title</Typography>
              <Typography variant="body2">{task.title}</Typography>
              <Typography variant="body2">{task.description}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Points: {task.points}
              </Typography>
            </Box>
          </Box>

          {/* Position both the buttons and status at the bottom right */}
          <Box
            sx={{
              position: "absolute",
              bottom: 16, // 16px from the bottom
              right: 16, // 16px from the right
              display: "flex",
              gap: 1,
              flexDirection: "column", // Stack buttons and status vertically
              alignItems: "flex-end",
            }}
          >
            {currentTab === 0 ? (
              <>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ width: "100px" }}
                    onClick={() => approveTask(task.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ width: "100px" }}
                    onClick={() => rejectTask(task.id)}
                  >
                    Reject
                  </Button>
                </Box>
              </>
            ) : (
              <Typography variant="body2">{task.status}</Typography>
            )}
          </Box>
        </Card>
      ))}

      {/* Snackbar for success messages */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
        message={successMessage}
      />
    </Box>
  );
};

export default VoucherApprovalReject;
