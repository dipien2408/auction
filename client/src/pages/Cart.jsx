import { useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 2;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link className="link" to="/" >
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag(${cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <Link className="link" to={`/product/${product._id}`}>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <br/>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                    </Link> 
                  </Details>
                </ProductDetail>
              </Product>
            ))}
            <Hr />
          </Info>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
