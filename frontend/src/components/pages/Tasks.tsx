import { Row, Col } from "reactstrap";
import Task from "../dashboard/Task";
import Box from "@mui/material/Box";

interface TaskDataType {
  title: string;
  subtitle: string;
  description: string;
}

const TaskData: TaskDataType[] = [
  {
    title: "apple",
    subtitle: "Complete the apple task",
    description: "This task involves sorting apples based on their size and quality.",
  },
  {
    title: "banana",
    subtitle: "Complete the banana task",
    description: "This task requires you to count and bundle bananas for distribution.",
  },
  {
    title: "orange",
    subtitle: "Complete the orange task",
    description: "This task includes juicing oranges for a special event.",
  },
  {
    title: "grape",
    subtitle: "Complete the grape task",
    description: "This task involves sorting and packing grapes for delivery.",
  },
];


export default function Tasks() {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Row>
        {TaskData.map((item, index) => (
          <Col xs="12" key={index}>
            <Task
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
            />
          </Col>
        ))}
      </Row>
    </Box>
  );
}
