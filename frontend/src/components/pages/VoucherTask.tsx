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
      name: "Im Approving",
      description: "Log in daily to earn points",
      points: 10,
      isCompleted: true,
      isAwaiting: true,
      isPending: false,
    },
    {
      id: 2,
      name: "Im Doing",
      description: "Buy something from the mart to earn rewards",
      points: 20,
      isCompleted: false,
      isAwaiting: false,
      isPending: true,
    },
    {
      id: 3,
      name: "I passed",
      description: "Buy something from the mart to earn rewards",
      points: 20,
      isCompleted: true,
      isAwaiting: false,
      isPending: false,
    },
    {
      id: 4,
      name: "I failed",
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
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            marginBottom: "10px",
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>
              {task.name}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {task.description}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Points: {task.points}
            </Typography>
            {currentTab === 0 && (
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  onClick={() => completeTask(task.id)}
                  variant="contained"
                  color="secondary"
                >
                  Complete Task
                </Button>
              </Box>
            )}
          </CardContent>
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
