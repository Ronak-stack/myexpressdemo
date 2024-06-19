import { useNavigate, Route, Routes } from "react-router-dom";
import Signup from "../pages/signup";
import Signin from "../pages/signin";
import PrivateComponent from "../privateComponent/privateComponent";
import Home from "../pages/home";
import AddProduct from "../pages/products/add";
import ProductList from "../pages/products/list";

const RoutesList = () => {
    return (
        <Routes>
            <Route element={<PrivateComponent/>}>
                <Route path="/" element={<Home />}/>
                <Route path="/product/list" element={<ProductList />} />
                <Route path="/product/add" element={<AddProduct />}/>
                <Route path="/product/update" element={<h1>Update Product Page</h1>}/>
                <Route path="/profile" element={<h1>Profile Page</h1>}/>
            </Route>
            <Route path="/signin" element={<Signin/>} />
            <Route path="/signup" element={<Signup/>} />
        </Routes>
    );
}

export default RoutesList;