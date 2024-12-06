import React from "react";
import { Route, Router, Routes } from "react-router-dom";

import Main from "./page/main/main";
import About from "./page/about/about";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default App;
