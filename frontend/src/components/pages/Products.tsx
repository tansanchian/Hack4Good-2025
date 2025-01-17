import { Row, Col } from "reactstrap";
import { Box, Typography } from "@mui/material";
import Product from "../dashboard/Product";
import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import bg4 from "../../assets/bg4.jpg";

interface ProductDataType {
  image: string;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  quantity: number;
}

const ProductData: ProductDataType[] = [
  {
    image: bg1,
    title: "apple",
    subtitle: "Fresh and juicy",
    price: "$2.99",
    description:
      "Our apples are fresh, organic, and sourced from local farms. Perfect for a healthy snack!",
    quantity: 50,
  },
  {
    image: bg2,
    title: "banana",
    subtitle: "Sweet and healthy",
    price: "$1.49",
    description:
      "Enjoy the sweetness of our bananas, rich in potassium and great for a quick energy boost.",
    quantity: 50,
  },
  {
    image: bg3,
    title: "orange",
    subtitle: "Full of vitamin C",
    price: "$3.19",
    description:
      "Our oranges are bursting with flavor and packed with Vitamin C to keep you refreshed.",
    quantity: 50,
  },
  {
    image: bg4,
    title: "grape",
    subtitle: "Seedless and fresh",
    price: "$4.50",
    description:
      "Juicy, seedless grapes that are perfect for snacking or adding to your favorite salads.",
    quantity: 0,
  },
  {
    image: bg4,
    title: "grape",
    subtitle: "Seedless and fresh",
    price: "$4.50",
    description:
      "Juicy, seedless grapes that are perfect for snacking or adding to your favorite salads.",
    quantity: 0,
  },
  {
    image: bg4,
    title: "grape",
    subtitle: "Seedless and fresh",
    price: "$4.50",
    description:
      "Juicy, seedless grapes that are perfect for snacking or adding to your favorite salads.",
    quantity: 0,
  },
  {
    image: bg4,
    title: "grape",
    subtitle: "Seedless and fresh",
    price: "$4.50",
    description:
      "Juicy, seedless grapes that are perfect for snacking or adding to your favorite salads.",
    quantity: 0,
  },
  {
    image: bg4,
    title: "grape",
    subtitle: "Seedless and fresh",
    price: "$4.50",
    description:
      "Juicy, seedless grapes that are perfect for snacking or adding to your favorite salads.",
    quantity: 0,
  },
  {
    image: bg4,
    title: "grape",
    subtitle: "Seedless and fresh",
    price: "$4.50",
    description:
      "Juicy, seedless grapes that are perfect for snacking or adding to your favorite salads.",
    quantity: 0,
  },
];

export default function Products() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
      }}
    >
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Products
      </Typography>

      <Row>
        {ProductData.map((item, index) => (
          <Col xs="12" sm="6" md="4" key={index}>
            <Product
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              price={item.price}
              description={item.description}
              quantity={item.quantity}
            />
          </Col>
        ))}
      </Row>
    </Box>
  );
}
