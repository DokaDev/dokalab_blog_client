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
            {/* <header className="header">
                <div className="logo">Logo</div>
                <nav className="gnb">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/post/1">Post 1</Link>
                    <Link to="/post/2">Post 2</Link>
                </nav>
            </header> */}
            <Header gnbItems={gnbItems}/>
            <div className="content">
                {/* <aside className="category">Category</aside> */}
                <Categories />
                <main className="inner">
                    <Outlet />
                </main>
            </div>
            <footer className="footer">Footer</footer>
        </div>
    );
}