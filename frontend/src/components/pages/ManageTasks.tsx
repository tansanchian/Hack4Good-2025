import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { Box, Typography, Button } from "@mui/material";
import EditableTask from "../dashboard/EditableTask";
import UpdateTasks from "../dashboard/UpdateTasks";
import CreateTasks from "../dashboard/CreateTasks";
import { getAvailableVouchers } from "../../api/voucher";

interface TaskDataType {
  title: string;
  subtitle: string;
  description: string;
  points: number;
  slots: number;
  acceptedBy: any[];
  userStatuses: any[];
  createdAt: Date;
  updatedAt: Date;
}

export default function ManageTasks() {
  const [tasks, setTasks] = useState<TaskDataType[]>([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskDataType | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    const fetchVouchers = async () => {
      const response = await getAvailableVouchers();
      setTasks(response.voucherInfo);
      console.log(response);
    };
    fetchVouchers();
  }, []);

  const handleClickOpenUpdate = (row: TaskDataType) => {
    setTaskToEdit(null);
    setTimeout(() => {
      setTaskToEdit(row);
    }, 0);
  };

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  useEffect(() => {
    if (taskToEdit && Object.keys(taskToEdit).length > 0) {
      setOpenUpdate(true);
    }
  }, [taskToEdit]);

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setTaskToEdit(null);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleUpdateTaskInfo = (updatedTask: TaskDataType) => {
    handleCloseUpdate();
    setTaskToEdit(updatedTask);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Task List
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleClickOpenCreate}
      >
        Add New Task
      </Button>

      <Row>
        {tasks.map((item, index) => (
          <Col xs="12" sm="6" md="4" key={index}>
            <EditableTask
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
              points={item.points}
              remainingSlots={item.slots}
              onEdit={() => handleClickOpenUpdate(item)} // Edit task functionality
              onDelete={() => {
                /* Add delete functionality here */
              }} // Delete task functionality
            />
          </Col>
        ))}
      </Row>

      {taskToEdit && (
        <UpdateTasks
          open={openUpdate}
          handleClose={handleCloseUpdate}
          handleUpdateTaskInfo={handleUpdateTaskInfo}
          taskToEdit={taskToEdit}
        />
      )}

      <CreateTasks
        open={openCreate}
        handleClose={handleCloseCreate}
        handleUpdateTaskInfo={handleUpdateTaskInfo}
      />
    </Box>
  );
}
