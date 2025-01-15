import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Grid,
  LinearProgress,
  Button,
  Paper,
} from "@mui/material";

const Vouchers = () => {
  const [voucherBalance, setVoucherBalance] = useState(100); // Example balance
  const [tasks, setTasks] = useState([
    { id: 1, name: "Complete Daily Login", progress: 0, points: 10 },
    { id: 2, name: "Make a Purchase", progress: 0, points: 20 },
    { id: 3, name: "Refer a Friend", progress: 0, points: 30 },
  ]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleCompleteTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, progress: 100 } : task
      )
    );
    setVoucherBalance(
      voucherBalance + tasks.find((task) => task.id === taskId).points
    );
    setCompletedTasks([...completedTasks, taskId]);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <Typography variant="h6" padding={2}>
            Voucher Balance: {voucherBalance} points
          </Typography>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={2} padding={2}>
          <Typography variant="h5" padding={2}>
            Available Tasks
          </Typography>
          {tasks.map((task) => (
            <Grid container spacing={2} alignItems="center" key={task.id}>
              <Grid item xs={6}>
                <Typography variant="body1">{task.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <LinearProgress variant="determinate" value={task.progress} />
                {task.progress === 100 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleCompleteTask(task.id)}
                    disabled={completedTasks.includes(task.id)}
                  >
                    Complete Task
                  </Button>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Progress: {task.progress}%
                  </Typography>
                )}
              </Grid>
            </Grid>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Vouchers;
