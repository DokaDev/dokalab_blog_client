import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./header.css";
import logo from "../../assets/dokadev.svg"

export default function Header({ gnbItems }) {
    return (
        <header className="header-container">
            <div className="header-content">
                <a href="/" className="header-logo">
                    <img src={logo} alt="logo" className="logoImage"/>
                </a>
                
                <nav className="header-gnb">
                    {gnbItems.map((item, index) => (
                        <a key={index} href={item.endpoint}>
                            {item.name}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
}

Header.propTypes = {
    gnbItems: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            endpoint: PropTypes.string.isRequired,
        })
    ).isRequired,
};