import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
} from "@mui/material";

interface ProductProps {
  image: string;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  quantity: number;
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
        sx={{
          cursor: "pointer",
          border: "1px solid #eee",
          borderRadius: 2,
          boxShadow: 2,
          mb: 2,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: 3,
          },
        }}
        onClick={toggleModal}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", fontSize: "20px" }}
        >
          {title}
        </Typography>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{
            objectFit: "fit",
          }}
        />
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Price: {price}
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: quantity > 0 ? "green" : "red",
              }}
            >
              Quantity: {quantity > 0 ? quantity : "Out of stock"}
            </Typography>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "14px" }}
          >
            {subtitle}
          </Typography>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={modalOpen} onClose={toggleModal} fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              height="300"
              image={image}
              alt={title}
              sx={{
                objectFit: "fit",
                mb: 2,
                width: "100%",
              }}
            />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Price: {price}
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: quantity > 0 ? "green" : "red",
              }}
            >
              Quantity: {quantity > 0 ? quantity : "Out of stock"}
            </Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color={quantity > 0 ? "primary" : "secondary"}
            sx={{ width: "100%" }}
            onClick={toggleModal}
          >
            {quantity > 0 ? "Add to Cart" : "Preorder"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Product;
