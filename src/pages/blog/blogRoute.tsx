import ArticleList from "./articleList";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogLayout from "./blogLayout";

const BlogRoute: React.FC = () => {
    return (
        <BlogLayout
            contentNode = {
                <Routes>
                    <Route path="/:categoryId" element={<ArticleList />} />
                </Routes>
            }
        />
    );
}

export default BlogRoute;