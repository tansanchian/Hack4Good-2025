import { Row, Col } from "reactstrap";
import Task from "../dashboard/Task";
import { Box, Typography } from "@mui/material";

interface TaskDataType {
  title: string;
  subtitle: string;
  description: string;
  points: number;
  remainingSlots: number;
}

const TaskData: TaskDataType[] = [
  {
    title: "apple",
    subtitle: "Complete the apple task",
    description:
      "This task involves sorting apples based on their size and quality.",
    points: 5,
    remainingSlots: 50,
  },
  {
    title: "banana",
    subtitle: "Complete the banana task",
    description:
      "This task requires you to count and bundle bananas for distribution.",
    points: 5,
    remainingSlots: 50,
  },
  {
    title: "orange",
    subtitle: "Complete the orange task",
    description: "This task includes juicing oranges for a special event.",
    points: 5,
    remainingSlots: 50,
  },
  {
    title: "grape",
    subtitle: "Complete the grape task",
    description: "This task involves sorting and packing grapes for delivery.",
    points: 5,
    remainingSlots: 50,
  },
];

export default function Tasks() {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Task List
      </Typography>
      <Box>
        {TaskData.map((item, index) => (
          <Col xs="12" key={index}>
            <Task
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
              points={item.points}
              remainingSlots={item.remainingSlots}
            />
          </Col>
        ))}
      </Box>
    </Box>
  );
}
