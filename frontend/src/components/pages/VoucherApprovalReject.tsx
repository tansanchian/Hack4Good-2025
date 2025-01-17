import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Box,
  Button,
  Snackbar,
  Tabs,
  Tab,
  CardContent,
  Divider,
} from "@mui/material";
import { getAvailableVouchers, approveRejectVoucher } from "../../api/voucher";

const VoucherApprovalReject = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    const fetchVouchers = async () => {
      const response = await getAvailableVouchers();
      const data = response.voucherInfo;
      const modifiedData = data.flatMap((x) =>
        x.userStatuses.flatMap((y) => ({
          voucherId: { ...x },
          ...y,
        }))
      );
      setTasks(modifiedData);
    };
    fetchVouchers();
  }, []);

  // Approve a task
  // Approve a task
  const approveTask = async (
    voucherId: string,
    userId: string,
    action: string
  ) => {
    try {
      // Call the API to approve or reject the voucher
      const res = await approveRejectVoucher(voucherId, userId, action);
      setSuccessMessage(res.message);

      // Refetch vouchers after approval/rejection
      const response = await getAvailableVouchers();
      const data = response.voucherInfo;
      const modifiedData = data.flatMap((x) =>
        x.userStatuses.flatMap((y) => ({
          voucherId: { ...x },
          ...y,
        }))
      );
      setTasks(modifiedData); // Update the state with the new data
    } catch (error) {
      console.error("Error approving/rejecting voucher:", error);
    }
  };

  // Handle tab changes
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // Define the type for filteredTasks
  const filteredTasks: { [key: number]: typeof tasks } = {
    0: tasks.filter((task) => task.status === "approval"),
    1: tasks.filter((task) => task.status === "completed"),
    2: tasks.filter((task) => task.status === "cancelled"),
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
                Name: {task.userId}
              </Typography>
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
                      onClick={() =>
                        approveTask(
                          task.voucherId._id,
                          task.userId,
                          "completed"
                        )
                      }
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ width: "100px" }}
                      onClick={() =>
                        approveTask(
                          task.voucherId._id,
                          task.userId,
                          "cancelled"
                        )
                      }
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
        ))
      ) : (
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ textAlign: "center", marginTop: 2 }}
        >
          No Content
        </Typography>
      )}
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
