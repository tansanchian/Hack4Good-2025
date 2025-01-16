import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap";

interface ProductProps {
  image: string;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  quantity: number;
  href?: string;
}

const Product: React.FC<ProductProps> = ({
  image,
  title,
  subtitle,
  price,
  description,
  quantity,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <>
      {/* Main Product Card */}
      <Card
        style={{
          cursor: "pointer",
          border: "1px solid #eee",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          marginBottom: "16px",
          transition: "transform 0.2s ease, boxShadow 0.2s ease",
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
        <CardImg
          top
          src={image}
          alt={title}
          style={{
            height: "150px",
            width: "100%",
            objectFit: "cover",
          }}
        />
        <CardBody>
          <CardTitle tag="h5">
            {title} <span style={{ color: "#007bff", fontSize: "14px" }}>{price}</span>
          </CardTitle>
          <p style={{ fontSize: "14px", color: "#666" }}>{subtitle}</p>
        </CardBody>
      </Card>

      {/* Modal */}
      <Modal isOpen={modalOpen} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
        <ModalBody>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <CardImg
              top
              src={image}
              alt={title}
              style={{
                height: "200px",
                width: "60%",
                objectFit: "cover",
                marginBottom: "16px",
              }}
            />
            <div style={{ textAlign: "right", width: "35%" }}>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: quantity > 0 ? "green" : "red",
                }}
              >
                Quantity: {quantity > 0 ? quantity : "Out of stock"}
              </p>
            </div>
          </div>
          <p style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>
            Price: {price}
          </p>
          <p style={{ fontSize: "14px", color: "#666" }}>{description}</p>
          <Button
            color="primary"
            style={{ marginTop: "16px", display: "block", width: "100%" }}
            onClick={toggleModal}
          >
            {quantity > 0 ? "Add to Cart" : "Preorder"}
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Product;
