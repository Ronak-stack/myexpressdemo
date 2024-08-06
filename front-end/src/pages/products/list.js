import React, { useEffect, useState } from "react";
import Header from "../../common/header";
import Footer from "../../common/footer";
import axios from "axios";
import EditProductModal from "../../components/modals/editProduct";
import { ToastContainer, toast } from 'react-toastify';

const ProductList = () => {
    const [productList, setProductList] = useState([]);
    const [product, setProduct] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [productName, setProductName] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/product').then((e) => {
            if (e.data.success) {
                setProductList(e.data.data);
            } else {
                alert("Record not found!");
            }
        }).catch((error) => {
            alert("Ooppss.. something error!");
        });
    }, [showEditModal, product]);

    const openEditProductModal = (element) => {
        setProduct(element);
        setShowEditModal(true);
    }

    const closeEditModel = () => {
        setShowEditModal(false);
    }
    const notify = (type, msg) => {
        let setting = {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        };
        if (type) {
            toast.success(msg, setting);
        } else {
            toast.error(msg, setting);
        }
    };

    const searchProductByName = () => {
        axios.post('http://localhost:5000/product/search', {
            "name": productName
        }).then((e) => {
            if (e.data.success) {
                setProductList(e.data.data);
            } else {
                toast.error(e.data.message);
            }
        }).catch((error) => {
            toast.error('Ooopsss...Something error!!!');
        });
    }

    const deleteProduct = (pid) => {
        const token = localStorage.getItem('auth');
        if(window.confirm('Do you want to delete this product?')) {
            axios.post('http://localhost:5000/product/delete', {
                "id": pid
            }, {
                headers: `Bearer ${token}`
            }).then((e) => {
                if(e.data.success) {
                    toast.error(e.data.message);
                    setProductList(productList.filter(product => product._id !== pid));
                } else {
                    toast.error(e.data.message);
                }
            }).catch((error) => {
                toast.error(error.message)
            });
        }
    }
    return (
        <>
            <Header />
            <div className="container">
                <div className="row mt-5">
                    <div className="col-4 mb-3">
                        <div className="input-group">
                            <input type="text" className="form-control form-control-sm" onKeyUp={(e) => setProductName(e.target.value)} placeholder="Search product by name" />
                            <button type="button" className="btn btn-sm btn-primary" onClick={searchProductByName}>Search</button>
                        </div>
                    </div>
                    <div className="col-12">
                        <table className="table table-bordered table-striped table-hover table-sm">
                            <thead className="bg-dark text-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Company</th>
                                    <th>Created At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productList.length > 0 && productList.map(element => (
                                    <tr key={element._id}>
                                        <td>{element.name}</td>
                                        <td>{element.category}</td>
                                        <td>{element.company}</td>
                                        <td>{new Date(element.created_at).toDateString()}</td>
                                        <td>
                                            <button type="button" onClick={() => openEditProductModal(element)} className="btn btn-sm btn-success"><i className="fa fa-edit"></i></button>
                                            <button type="button" className="ms-1 btn btn-sm btn-danger"><i className="fa fa-trash" onClick={() => deleteProduct(element._id)}></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <EditProductModal product={product} show={showEditModal} updateShowWditModelStatus={closeEditModel} notify={notify} />
                        <ToastContainer />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default ProductList;