import { Row, Col } from "reactstrap";
import Product from "../dashboard/Product";
import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import bg4 from "../../assets/bg4.jpg";

interface ProductDataType {
  image: string;
  title: string;
  btnbg: string;
}

const ProductData: ProductDataType[] = [
  {
    image: bg1,
    title: "This is an apple",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    btnbg: "primary",
  },
];

export default function Products() {
  return (
    <div>
      <Row>
        {ProductData.map((item, index) => (
          <Col xs="12" sm="6" md="4" key={index}>
            <Product
              image={item.image}
              title={item.title}
              color={item.btnbg}
              href="#"
              style={{ height: "300px" }}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
