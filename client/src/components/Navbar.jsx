import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";
import { reset } from "../redux/cartRedux";

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  &:focus {
    outline: none;
  }
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
  cursor: pointer;
  margin-left: 25px;
`
const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity)
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(dispatch);
    dispatch(reset());
  }
  
  const handleKeyDown = (e) => {
    const value = e.target.value;
    const isLetter = (value) => {
      return value.toLowerCase() !== value.toUpperCase();
    }
    if (e.key === 'Enter' && isLetter(value)) {
      navigate(`/filter/search/${value}`)
  }}
  return (
    <Container>
      <Wrapper>
        <Left>
            <Link className="link" to="/">
              <Logo>Auction</Logo>
            </Link>
        </Left>
        <Center>
          <SearchContainer>
            <Search style={{ color: "gray", fontSize: 16 }} />
            <Input placeholder="Search" type="text" onKeyDown={handleKeyDown} /> 
          </SearchContainer>
        </Center>
        <Right>
          {user ? 
            (<>
              <Link to="/cart">
                <MenuItem>
                  <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined />
                  </Badge>
                </MenuItem>
              </Link>
              <MenuItem><UserImg src={user.img}/></MenuItem>
              <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
            </>) : (<>
              <Link className="link" to="/register">
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link className="link" to="/login">
                <MenuItem>SIGN IN</MenuItem>
              </Link>              
              <Link to="/cart">
                <MenuItem>
                  <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined />
                  </Badge>
                </MenuItem>
              </Link>
          </>)} 
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
