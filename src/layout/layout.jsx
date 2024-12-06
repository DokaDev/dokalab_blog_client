import React from "react";
import { Outlet, Link } from "react-router-dom";

import Header from "../component/header/header";
import Categories from "../component/category/categories";

import "./Layout.css"; // 별도 CSS 파일을 임포트

export default function Layout() {
    const gnbItems = [
        { name: "Home", endpoint: "/" },
        { name: "About", endpoint: "/about" },
        { name: "Post 1", endpoint: "/post/1" },
        { name: "Post 2", endpoint: "/post/2" },
    ]

    return (
        <div className="layout">
            <Header gnbItems={gnbItems}/>
            <div className="content">
                <Categories />
                <main className="inner">
                    <Outlet />
                </main>
            </div>
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-left">
                        <div className="footer-logo">DokaDev</div>
                        <div className="footer-copyright">© 2024 DokaDev. All rights reserved.</div>
                    </div>
                    <div className="footer-links">
                        <a href="https://github.com/yourusername" className="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://twitter.com/yourusername" className="footer-link" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="/rss" className="footer-link">RSS</a>
                        <a href="/privacy" className="footer-link">Privacy Policy</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}