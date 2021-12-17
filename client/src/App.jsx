import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ProductList />}/>
        <Route path="/products/:category" element={<ProductList />}/>
        <Route path="/filter/search/:result" element={<ProductList />}/>
        <Route path="/product/:id" element={<Product />}/>
        <Route path="/cart" element={<Cart />}/>
        {user ? (
          <>
          <Route path="/login" element={<Navigate to="/"/>}/>
          <Route path="/register" element={<Navigate to="/"/>}/>
          </>
        ): (
          <>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          </>
        )}
        
      </Routes>
    </Router>
  );
};

export default App;
