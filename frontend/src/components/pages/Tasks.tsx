import { Row, Col } from "reactstrap";
import React, { useState, useEffect } from "react";
import Task from "../dashboard/Task";
import { Box, Typography, Divider } from "@mui/material";
import { getAvailableVouchers } from "../../api/voucher";

interface TaskDataType {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  points: number;
  slots: number;
  acceptedBy: any[];
  userStatuses: any[];
  createdAt: string;
  updatedAt: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<TaskDataType[]>([]);
  useEffect(() => {
    const fetchVouchers = async () => {
      const response = await getAvailableVouchers();
      setTasks(response.voucherInfo);
    };
    fetchVouchers();
  }, []);
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Task List
      </Typography>
      <Divider style={{ margin: "16px 0" }} />
      <Box>
        {tasks.length > 0 ? (
          tasks.map((item, index) => (
            <Col xs="12" key={index}>
              <Task
                _id={item._id}
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                points={item.points}
                slots={item.slots}
              />
            </Col>
          ))
        ) : (
          <Col xs="12">
            <Typography variant="body1" color="textSecondary" align="center">
              Nothing here, Go accept some tasks
            </Typography>
          </Col>
        )}
      </Box>
    </Box>
  );
}
