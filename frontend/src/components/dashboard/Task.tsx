import React, { useState } from "react";
import { Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Button } from "reactstrap";

interface TaskProps {
  title: string;
  subtitle: string;
  description: string;
}

const Task: React.FC<TaskProps> = ({ title, subtitle, description }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <>
      {/* Main Task Card */}
      <Card
        style={{
          cursor: "pointer",
          border: "1px solid #eee",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          marginBottom: "8px",
          height: "80px",
          display: "flex",
          alignItems: "flex-start",
          padding: "20px",
        }}
        onClick={toggleModal}
        onMouseEnter={(e: React.MouseEvent) => {
          const target = e.currentTarget as HTMLDivElement;
          target.style.transform = "translateY(-2px)";
          target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e: React.MouseEvent) => {
          const target = e.currentTarget as HTMLDivElement;
          target.style.transform = "translateY(0)";
          target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        }}
      >
        <CardBody
          style={{
            padding: "0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <CardTitle tag="h5" style={{ marginBottom: "4px", fontSize: "16px" }}>
            {title}
          </CardTitle>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "0" }}>{subtitle}</p>
        </CardBody>
      </Card>

      {/* Modal */}
      <Modal isOpen={modalOpen} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
        <ModalBody>
          <p style={{ fontSize: "14px", color: "#666" }}>{description}</p>
          <Button
            color="primary"
            style={{ marginTop: "16px", display: "block", width: "100%" }}
            onClick={() => {
              toggleModal();
              alert(`Task "${title}" accepted!`);
            }}
          >
            Accept Task
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Task;

