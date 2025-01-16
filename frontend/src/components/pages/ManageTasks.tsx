import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { Box, Typography, Button } from "@mui/material";
import EditableTask from "../dashboard/editableTask";
import UpdateTasks from "../dashboard/UpdateTasks";
import CreateTasks from "../dashboard/CreateTasks";

interface TaskDataType {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  points: number;
  remainingSlots: number;
}

const initialTaskData: TaskDataType[] = [
  {
    id: 1,
    title: "Apple",
    subtitle: "Complete the apple task",
    description:
      "This task involves sorting apples based on their size and quality.",
    points: 5,
    remainingSlots: 50,
  },
  {
    id: 2,
    title: "Banana",
    subtitle: "Complete the banana task",
    description:
      "This task requires you to count and bundle bananas for distribution.",
    points: 5,
    remainingSlots: 50,
  },
  {
    id: 3,
    title: "Orange",
    subtitle: "Complete the orange task",
    description: "This task includes juicing oranges for a special event.",
    points: 5,
    remainingSlots: 50,
  },
  {
    id: 4,
    title: "Grape",
    subtitle: "Complete the grape task",
    description: "This task involves sorting and packing grapes for delivery.",
    points: 5,
    remainingSlots: 50,
  },
];

export default function ManageTasks() {
  const [tasks, setTasks] = useState<TaskDataType[]>(initialTaskData);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskDataType | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

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
              remainingSlots={item.remainingSlots}
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
