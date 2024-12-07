import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./layout/layout";

import Main from "./page/main/main";
import About from "./page/about/about";
import CategoryPage from "./page/category/categoryPage.tsx";
import ArticlePage from "./page/article/articlePage.tsx";
import NotFound from "./page/notFound/notFound.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/category/:id" element={<CategoryPage />} />
                    <Route path="/article/:id" element={<ArticlePage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
