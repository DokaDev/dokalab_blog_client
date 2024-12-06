import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./layout/layout";

import Main from "./page/main/main";
import About from "./page/about/about";
import PostDetail from "./page/post/post_detail";
import CategoryPage from "./page/category/categoryPage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/post/:id" element={<PostDetail />} />
                    <Route path="/category/:id" element={<CategoryPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
