import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { Box, Typography, Button, Divider, Snackbar } from "@mui/material";
import EditableTask from "../dashboard/EditableTask";
import UpdateTasks from "../dashboard/UpdateTasks";
import CreateTasks from "../dashboard/CreateTasks";
import {
  getAllVoucher,
  createVoucher,
  deleteVoucher,
  updateVoucher,
} from "../../api/voucher";

interface TaskDataType {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  points: number;
  slots: number;
}

interface TaskRowCreate {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  points: number;
  slots: number;
}

export default function ManageTasks() {
  const [tasks, setTasks] = useState<TaskDataType[]>([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskDataType | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const displaySnackbar = (message : string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    console.log(message);
  }

  // close snackbar/toast
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  }

  const handleCreateTask = async (createTask: TaskRowCreate) => {
    const response = await createVoucher(
      createTask.title,
      createTask.subtitle,
      createTask.description,
      createTask.points,
      createTask.slots
    );

    if (response.status === 200 || response.status === 201) {
      displaySnackbar("Voucher task created successfully!");
    } else {
      displaySnackbar("There was an error in creating the task: " + response.message);
    }

    handleCloseCreate();
  };

  useEffect(() => {
    const fetchVouchers = async () => {
      const response = await getAllVoucher();
      setTasks(response.voucherInfo);
    };
    fetchVouchers();
  }, [handleCreateTask]);

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

  const handleUpdateTaskInfo = async (updatedTask: TaskDataType) => {
    handleCloseUpdate();
    const response = await updateVoucher({
      id: updatedTask._id,
      title: updatedTask.title,
      subtitle: updatedTask.subtitle,
      description: updatedTask.description,
      points: updatedTask.points,
      slots: updatedTask.slots,
    });

    if (response.status === 200 || response.status === 201) {
      displaySnackbar("Voucher task updated successfully!");
    } else {
      displaySnackbar("There was an error in updating the task: " + response.message);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
      }}
    >
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
      <Divider style={{ margin: "16px 0" }} />
      <Row>
        {tasks.length > 0 ? (
          tasks.map((item, index) => (
            <Col xs="12" sm="6" md="4" key={index}>
              <EditableTask
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                points={item.points}
                remainingSlots={item.slots}
                onEdit={() => handleClickOpenUpdate(item)} // Edit task functionality
                onDelete={async () => {
                  await deleteVoucher(item._id);
                }}
              />
            </Col>
          ))
        ) : (
          <Col xs="12">
            <Typography variant="body1" color="textSecondary" align="center">
              Nothing here, create some tasks!
            </Typography>
          </Col>
        )}
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
        handleCreateTask={handleCreateTask}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
}
