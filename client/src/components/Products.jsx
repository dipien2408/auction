import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { useLocation } from "react-router";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, sort }) => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const filter = location.pathname.split("/")[3];
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat ? 
            filter ?
              `http://localhost:5000/api/filter/search?result=${filter}`
            : `http://localhost:5000/api/products?category=${cat}`                
          : 
            `http://localhost:5000/api/products`  
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat, filter]);

  useEffect(() => {
    if (sort === "newest") {
      setProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {products.slice(0, 8).map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
