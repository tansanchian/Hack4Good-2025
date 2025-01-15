import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Snackbar,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";

const VoucherTask = () => {
  const [tasks, setTasks] = useState<any[]>([
    {
      id: 1,
      title: "Im Approving",
      description: "Log in daily to earn points",
      points: 10,
      isCompleted: true,
      isAwaiting: true,
      isPending: false,
    },
    {
      id: 2,
      title: "Im Doing",
      description: "Buy something from the mart to earn rewards",
      points: 20,
      isCompleted: false,
      isAwaiting: false,
      isPending: true,
    },
    {
      id: 3,
      title: "I passed",
      description: "Buy something from the mart to earn rewards",
      points: 20,
      isCompleted: true,
      isAwaiting: false,
      isPending: false,
    },
    {
      id: 4,
      title: "I failed",
      description: "Buy something from the mart to earn rewards",
      points: 20,
      isCompleted: false,
      isAwaiting: false,
      isPending: false,
    },
  ]);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const filteredTasks: { [key: number]: any[] } = {
    0: tasks.filter((task) => task.isPending),
    1: tasks.filter((task) => !task.isPending && task.isAwaiting),
    2: tasks.filter(
      (task) => !task.isPending && task.isCompleted && !task.isAwaiting
    ),
    3: tasks.filter(
      (task) => !task.isPending && !task.isCompleted && !task.isAwaiting
    ),
  };

  const completeTask = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: true } : task
    );
    setTasks(updatedTasks);
    setSuccessMessage("Task completed!");
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Missions
      </Typography>

      <Tabs value={currentTab} onChange={handleTabChange}>
        <Tab label="Pending Mission" />
        <Tab label="Awaiting Approval" />
        <Tab label="Completed Mission" />
        <Tab label="Cancelled Mission" />
      </Tabs>

      <Divider style={{ margin: "16px 0" }} />

      {filteredTasks[currentTab].map((task) => (
        <Card
          key={task.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%", // Ensures card height grows as necessary
            marginBottom: "10px",
            position: "relative", // Allow absolute positioning of elements inside the card
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>
              {task.title}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {task.description}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Points: {task.points}
            </Typography>
          </CardContent>

          {/* Positioning the button at the bottom-right */}
          <Box
            sx={{
              position: "absolute",
              bottom: 16, // 16px from the bottom of the card
              right: 16, // 16px from the right side of the card
              display: "flex",
              gap: 1,
              flexDirection: "column", // Stack buttons vertically if needed
              alignItems: "flex-end",
            }}
          >
            {currentTab === 0 && (
              <Button
                onClick={() => completeTask(task.id)}
                variant="contained"
                color="secondary"
                sx={{ width: "120px" }}
              >
                Complete
              </Button>
            )}
          </Box>
        </Card>
      ))}

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        message={successMessage}
        onClose={() => setSuccessMessage("")}
      />
    </Box>
  );
};

export default VoucherTask;
