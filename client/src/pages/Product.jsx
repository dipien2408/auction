import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { publicRequest, userRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import useInterval from "../useInterval";
import {Timer} from "../components/Timer" 
import PayPal from "../components/PayPal"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  flex-direction: column;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const Winner = styled.span`
  font-size: 20px;
  font-weight: 200;
  margin-bottom: 10px;
  position: relative;
`;

const NotWinner = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const OrderNoti = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const BidAndCheckout = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  width:20%;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const CheckOutButton = styled.button`
  width: 20%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  margin-top: 10px;
`;

const KEY = process.env.REACT_APP_STRIPE;

const Product = () => {

  //get product id to fetch data
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});

  //for bid button and winner
  const [isWinner, setIsWinner] = useState(false);
  const [price, setPrice] =  useState(0);
  const [isEnd, setIsEnd] = useState(false);  
  //for count down       
  const [time, setTime] = useState(0);             
  //get cart and currentUser data
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);

  //stripe checkout
  const [stripeToken, setStripeToken] = useState(null);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  //payment for stripe
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: price*100,
        });
        if(res) {
          setIsPaid(true);
          const createOrder = async () => {
            try {
              const res = await userRequest.post("/orders", {
                userId: user._id,
                productId: product._id,
                amount: product.price,
              });
              setOrderId(res.data._id);
            } catch {}
          };
          createOrder();
        }
      } catch {}
    };
    stripeToken && makeRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripeToken, user, product]);

  const handlePayPal = (id) => {
    setOrderId(id);
  }

  //fetch product and setSate
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        setPrice(res.data.price);
        setIsEnd(res.data.end);
        setTime(res.data.time);
        setIsPaid(res.data.paid);
        setIsWinner(res.data.curWinner === user.username);
      } catch {}
    };
    getPost();
  },[id, user]);

  //sync db changes in case be bid by other user
  useInterval (() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setPrice(res.data.price);
        setIsEnd(res.data.end);
        setIsPaid(res.data.paid);
        if(res.data.curWinner !== user.username) {
          setIsWinner(false);
        } else {
          setIsWinner(true);
        }
        const date = Date.now();
        if(time<=date){
          setIsEnd(true);
        }
      } catch {}
    };
    getProduct();
  }, 1000);

  //set product end
  useEffect (() => {
    const setEnd = async () => {
      try {
        await publicRequest.put("/products/end/" +id, {
          end: isEnd,
        })
      } catch {}
    };
    isEnd && setEnd();
  }, [isEnd, id]); 

  //bid button
  const handleClick = async () => {
    if(!user) {
      return alert("Login First");
    }
    setIsWinner(true)
    try {
      await userRequest.put("/products/bid/" +id, {
        price: Math.floor(( price/ 100) * 110),
        curWinner: user.username,
      });
    }catch {}
    if(cart.products.length < 1) {
      dispatch(addProduct({ ...product }));
    } else {
      const isNew = cart.products.every(e => e._id !== product._id);
      isNew && dispatch(addProduct({ ...product })
    );
    }
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
            <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {price}</Price>
          <br/>
          {time && <Timer time={time} />}
          <BidAndCheckout >
            {isWinner ? 
              (<><Winner>Winner</Winner>
                  {isEnd && 
                    !isPaid ? 
                      !isCheckout ? 
                        (<CheckOutButton onClick= {() => setIsCheckout(true)}>Checkout Now</CheckOutButton>)
                        : (<><StripeCheckout
                              name="Auction"
                              image="https://scontent.fdad3-3.fna.fbcdn.net/v/t1.6435-9/69873628_2572541156306706_8821361195278663680_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=1XF1JGKUwkwAX_mPs98&_nc_ht=scontent.fdad3-3.fna&oh=ba666fbfa8315fe761052a431e0f3500&oe=61DE1B60"
                              description={`Your total is $${product.price}`}
                              amount={product.price * 100}  //*100 is mean 1 dollar
                              token={onToken}
                              stripeKey={KEY}
                              style={{marginBottom:"10px"}}/>
                            <PayPal 
                              handlePayPal={handlePayPal}
                              description={product.title}
                              amount={price}
                              userId= {user._id}
                              productId={product._id}
                              key={product._id}/></>) 
                      : <OrderNoti>{orderId ? `Order has been created successfully. Your order number is ${orderId}`
                                      : `Successful. Your order is being prepared...`}</OrderNoti>}</>) 
              : (<>{isEnd ? <NotWinner>You are not winner!</NotWinner>
                      : <Button onClick={handleClick}>Bid</Button>}</>)}
          </BidAndCheckout>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
