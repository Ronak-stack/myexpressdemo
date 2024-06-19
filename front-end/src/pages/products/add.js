import React, { useState } from "react";
import Header from "../../common/header";
import Footer from "../../common/footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {

    const [productName, setProductName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const navigation = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/product/add', {
            'name': productName,
            'category':categoryName,
            'company':companyName,
            'user_id': JSON.parse(localStorage.getItem('user'))._id
        }).then((e) => {
            alert(e.data.message);
            navigation('/product/list');
        }).catch((error) => {
            console.log(error);
        })
    }

   return (
    <>
        <Header/>
        <div className="my-5 container">
            <form action="#!">
                <div className="row">
                    <div className="offset-4 col-4 border shadow-lg py-3">
                        <div className="form-group">
                            <input type="file" name="productImg" />
                        </div>
                        <hr />
                        <div className="form-group mt-2">
                            <label htmlFor="product_name"> Product Name</label>
                            <input type="text" name="product_name" placeholder="Enter Product Name" className="form-control" defaultValue={productName} onChange={(e) => setProductName(e.target.value)} />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="category_name"> Category Name</label>
                            <input type="text" name="category_name" placeholder="Enter Category Name" className="form-control" defaultValue={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="company_name"> Company Name</label>
                            <input type="text" name="company_name" placeholder="Enter Company Name" className="form-control" defaultValue={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                        </div>
                        <button type="submit" onClick={saveProduct} className="mt-3 btn btn-primary btn-sm"> Save Product</button>
                    </div>
                </div>
            </form>
        </div>
        <Footer/>
    </>
   )
}

export default AddProduct;