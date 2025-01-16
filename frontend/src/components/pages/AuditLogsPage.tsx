import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const AuditLogsPage = () => {
  interface AuditLog {
    id: string;
    action: string;
    user: string;
    item: string;
    timestamp: string;
  }

  const [logs, setLogs] = useState<AuditLog[]>([]);
  const auditLogs = [
    {
      id: "1",
      action: "Added",
      user: "Admin1",
      item: "Widget A",
      timestamp: "2025-01-01T15:00:00Z",
    },
    {
      id: "2",
      action: "Updated",
      user: "Admin2",
      item: "Widget B",
      timestamp: "2025-01-02T16:00:00Z",
    },
    {
      id: "3",
      action: "Deleted",
      user: "Admin3",
      item: "Gadget C",
      timestamp: "2025-01-03T17:00:00Z",
    },
    {
      id: "4",
      action: "Added",
      user: "Admin4",
      item: "Tool E",
      timestamp: "2025-01-04T18:00:00Z",
    },
    {
      id: "5",
      action: "Updated",
      user: "Admin5",
      item: "Gadget D",
      timestamp: "2025-01-05T19:00:00Z",
    },
  ];

  useEffect(() => {
    setLogs(auditLogs);
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Audit Logs
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.item}</TableCell>
                <TableCell>
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AuditLogsPage;
