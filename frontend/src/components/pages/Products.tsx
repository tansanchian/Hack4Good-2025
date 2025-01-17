import { Row, Col } from "reactstrap";
import { Box, Typography } from "@mui/material";
import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import bg4 from "../../assets/bg4.jpg";
import { useEffect, useState } from "react";
import { getAllProducts, Product as ProductType } from "../../api/product";
import Product from "../dashboard/Product";

interface ProductDataType {
  image: string;
  title: string;
  price: number;
  description: string;
  quantity: number;
}

const DEFAULT_PRODUCT_DATA: ProductDataType[] = [
  {
    image: bg1,
    title: "apple",
    price: 2.99,
    description:
      "Our apples are fresh, organic, and sourced from local farms. Perfect for a healthy snack!",
    quantity: 50,
  },
  {
    image: bg2,
    title: "banana",
    price: 1.49,
    description:
      "Enjoy the sweetness of our bananas, rich in potassium and great for a quick energy boost.",
    quantity: 50,
  },
  {
    image: bg3,
    title: "orange",
    price: 3.19,
    description:
      "Our oranges are bursting with flavor and packed with Vitamin C to keep you refreshed.",
    quantity: 50,
  },
  {
    image: bg4,
    title: "grape",
    price: 4.50,
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
  
  const [productData, setProductData] = useState<ProductDataType[]>(DEFAULT_PRODUCT_DATA);
  useEffect(() => {
    getAllProducts().then(response => {
      if (response.status === 200) {
        console.log(response);
        setProductData(response.productInfo.data.map((p: ProductType) => {
          return {
            image: p.imageUrl,
            title: p.name,
            price: p.price,
            description: p.description,
            quantity: p.countInStock,
          }
        }));
      } else {
        setProductData(DEFAULT_PRODUCT_DATA);
      }
    })
  }, []);

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
        {productData.map((item, index) => (
          <Col xs="12" sm="6" md="4" key={index}>
            <Product
              image={item.image}
              title={item.title}
              subtitle=""
              price={item.price.toString()}
              description={item.description}
              quantity={item.quantity}
            />
          </Col>
        ))}
      </Row>
    </Box>
  );
}
