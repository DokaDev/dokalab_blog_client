import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalLayout from "../layout/globalLayout";

import About from "../pages/about/aboutPage";
import Main from "../pages/main/mainPage";
import BlogRoute from "../pages/blog/blogRoute";
import AdminRoute from "../pages/admin/adminRoute";

const MainRoute: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/admin/*" element={<AdminRoute />} />
                <Route path="/*" element={
                    <GlobalLayout>
                        <Routes>
                            <Route path="/" element={<Main />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/blog/*" element={<BlogRoute />} />
                        </Routes>
                    </GlobalLayout>
                } />
            </Routes>
        </Router>
    );
};

export default MainRoute;