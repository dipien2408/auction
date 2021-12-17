import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useLocation } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sort, setSort] = useState("newest");
  const cat = location.pathname.split("/")[2];

  const handleSelect = (e) => {
    const select = e.target.value;
    navigate(`/products/${select}`);
  }

  return (
    <Container>
      <Navbar />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="category" onChange={handleSelect}>
            <Option disabled>Category</Option>
            <Option>Education</Option>
            <Option>Fashion</Option>
            <Option>Food</Option>
            <Option>Electronics</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
