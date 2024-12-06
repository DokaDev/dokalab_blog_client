import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Layout.css"; // 별도 CSS 파일을 임포트

export default function Layout() {
    return (
        <div className="layout">
            <header className="header">
                <div className="logo">Logo</div>
                <nav className="gnb">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/post/1">Post 1</Link>
                    <Link to="/post/2">Post 2</Link>
                </nav>
            </header>
            <div className="content">
                <aside className="category">Category</aside>
                <main className="inner">
                    <Outlet />
                </main>
            </div>
            <footer className="footer">Footer</footer>
        </div>
    );
}