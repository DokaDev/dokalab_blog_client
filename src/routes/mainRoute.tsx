import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalLayout from "../layout/globalLayout";

import About from "../pages/about/aboutPage";
import Main from "../pages/main/mainPage";
import BlogRoute from "../pages/blog/blogRoute";

const MainRoute: React.FC = () => {
    return (
        <Router>
            <GlobalLayout>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blog/*" element={<BlogRoute />} />
                </Routes>
            </GlobalLayout>
        </Router>
    );
};

export default MainRoute;