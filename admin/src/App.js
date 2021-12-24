import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import "./app.css";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/apiCalls";

function App() {
  const user = useSelector((state) => state.user.currentUser); 
  const dispatch = useDispatch();
  const handleLogout = () => {
    logout(dispatch);
  }
  return (
    <Router>
      <Switch>
        <Route path="/login">
            {user ? <Redirect to="/"/> : <Login/>}
        </Route>
        {user ? 
          user.isAdmin ? (
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/users">
                  <UserList />
                </Route>
                <Route path="/user/:userId">
                  <User />
                </Route>
                <Route path="/products">
                  <ProductList />
                </Route>
                <Route path="/product/:productId">
                  <Product />
                </Route>
                <Route path="/newproduct">
                  <NewProduct />
                </Route>
              </div>
            </>
          ) : (<>{handleLogout()}</>) : (<Redirect to="/login"/>)
        }
      </Switch>
    </Router>
  );
}

export default App;