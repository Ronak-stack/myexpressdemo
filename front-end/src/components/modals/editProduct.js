import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProductModal = (props) => {
    const [productName, setProductName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const navigation = useNavigate();

    useEffect(() => {
        if (props.show) {
            setProductName(props.product.name)
            setCategoryName(props.product.category)
            setCompanyName(props.product.company)
            openModal();
        }
    }, [props]);

    const modalRef = useRef(null);

    const openModal = () => {
        const modal = modalRef.current;
        if (modal) {
            modal.classList.add("show");
            modal.style.display = "block";
        }
    }

    const closeModal = () => {
        const modal = modalRef.current;
        if (modal) {
            modal.classList.remove("show");
            modal.style.display = "none";
        }
    }

    const updateProduct = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('auth');
        axios.post('http://localhost:5000/product/update', {
            'pid': props.product._id,
            'name': productName,
            'category': categoryName,
            'company': companyName,
            'user_id': JSON.parse(localStorage.getItem('user'))._id
        },{headers:`Bearer ${token}`}).then((e) => {
            props.notify(e.data.success,e.data.message);
            props.updateShowWditModelStatus();
            closeModal();
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <div ref={modalRef} className="modal" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Product Details</h5>
                            <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                        </div>
                        <form action="#!">
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12">
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
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-secondary" onClick={closeModal}>Close</button>
                                <button type="submit" onClick={updateProduct} className="btn btn-primary btn-sm"> Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProductModal;
