import React, { useState, useEffect } from "react";
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
import { getUserVoucher, completeVoucher } from "../../api/voucher";
import { useAuth } from "../../contexts/AuthContext";

const VoucherTask = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentTab, setCurrentTab] = useState(0);
  const { auth } = useAuth();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const filteredTasks: { [key: number]: any[] } = {
    0: tasks.filter((task) => task.status == "pending"),
    1: tasks.filter((task) => task.status == "approval"),
    2: tasks.filter((task) => task.status == "completed"),
    3: tasks.filter((task) => task.status == "cancelled"),
  };

  const completeTask = async (taskId: string) => {
    try {
      // Call the API to complete the voucher
      const response = await completeVoucher(taskId, auth.id);
      setSuccessMessage(response.message);

      // Fetch the updated list of tasks after completion
      const updatedTasks = await getUserVoucher(auth.id);
      setTasks(updatedTasks.voucherInfo.userStatuses); // Update the state with the new data
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await getUserVoucher(auth.id);
        setTasks(response.voucherInfo.userStatuses); // Set the initial state
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };
    fetchVouchers();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
      }}
    >
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
      {filteredTasks[currentTab].length > 0 ? (
        filteredTasks[currentTab].map((task) => (
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
            <CardContent sx={{ flexGrow: 1, padding: 0.5 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                {task.voucherId.title}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                {task.voucherId.subtitle}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1" color="textSecondary">
                {task.voucherId.description}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ marginRight: 1 }}
                >
                  Points:
                </Typography>
                <Typography variant="body1" color="primary">
                  {task.voucherId.points}
                </Typography>
              </Box>
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
                  onClick={() => completeTask(task.voucherId._id)}
                  variant="contained"
                  sx={{ width: "120px" }}
                >
                  Complete
                </Button>
              )}
            </Box>
          </Card>
        ))
      ) : (
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ textAlign: "center", marginTop: 2 }}
        >
          No Missions
        </Typography>
      )}

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
