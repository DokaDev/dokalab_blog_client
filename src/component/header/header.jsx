import React from "react";
import PropTypes from "prop-types";

import "./header.css";
import logo from "../../assets/dokadev.svg"

export default function Header({ gnbItems }) {
    return (
        <header className="header-container">
            <div className="header-logo">
                <img src={logo} alt="logo" className="logoImage"/>
            </div>
            
            {/* <div className="header-auth">
                <button>Login</button>
                <button>Register</button>
            </div> */}

            <nav className="header-gnb">
                {gnbItems.map((item, index) => (
                    <a key={index} href={item.endpoint}>
                        {item.name}
                    </a>
                ))}
            </nav>
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