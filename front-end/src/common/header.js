import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const auth = localStorage.getItem('auth');
    const navigate = useNavigate();
    const logout = () => {
        if(auth) {
            localStorage.clear();
            navigate("/signin");
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/product/list">Products</Link>
                        </li>
                        {
                            auth ?
                                <li className="nav-item">
                                    <Link className="nav-link" to="/product/add">Add Product</Link>
                                </li> : ''
                        }
                        <li className="nav-item">
                            {
                                auth ?
                                    <Link className="nav-link" onClick={logout} to="signup">Logout</Link>
                                    :
                                    <Link className="nav-link" to="signup">Sign Up</Link>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default Header;