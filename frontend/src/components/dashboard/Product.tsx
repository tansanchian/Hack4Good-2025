import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
} from "reactstrap";

interface ProductProps {
  image: string;
  title: string;
  href?: string;
}

const Product: React.FC<ProductProps> = ({
  image,
  title,
  href = "#",
}) => {
  return (
    <a
      href={href}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <Card
        style={{
          cursor: "pointer",
          border: "1px solid #eee",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          marginBottom: "16px",
          transition: "transform 0.2s ease, boxShadow 0.2s ease",
        }}
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
          <CardTitle tag="h5">{title}</CardTitle>
        </CardBody>
      </Card>
    </a>
  );
};

export default Product;
