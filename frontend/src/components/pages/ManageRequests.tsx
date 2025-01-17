import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Typography,
  Box,
} from "@mui/material";

const requests = [
  {
    id: 1,
    user: "John Doe",
    item: "Fresh Apples",
    quantity: 2,
    points: 100,
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: 2,
    user: "Jane Smith",
    item: "Milk Carton",
    quantity: 1,
    points: 45,
    status: "approved",
    date: "2024-01-14",
  },
  {
    id: 3,
    user: "Bob Johnson",
    item: "Whole Grain Bread",
    quantity: 3,
    points: 90,
    status: "rejected",
    date: "2024-01-13",
  },
];

const ManageRequests = () => {
  const [requestsData, setRequestsData] = useState(requests);

  const handleStatusChange = (id: number, newStatus: string) => {
    setRequestsData(
      requestsData.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  const getStatusChipColor = (status: string) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      default:
        return "warning";
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px", minHeight: "100vh" },
      }}
    >
      <Typography variant="h4" gutterBottom>
        Request Management
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          maxHeight: "500px",
          overflow: "auto",
        }}
      >
        <Table stickyHeader aria-label="request table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requestsData.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell>{row.item}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.points}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={getStatusChipColor(row.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  {row.status === "pending" && (
                    <Box display="flex" justifyContent="center">
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => handleStatusChange(row.id, "approved")}
                        sx={{
                          mr: 1,
                          bgcolor: "success.main",
                          "&:hover": { bgcolor: "success.dark" },
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => handleStatusChange(row.id, "rejected")}
                        sx={{
                          bgcolor: "error.main",
                          "&:hover": { bgcolor: "error.dark" },
                        }}
                      >
                        Reject
                      </Button>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageRequests;
