import ArticleList from "./articleList";
import ArticlePage from "./articlePage/articlePage";
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from "react-router-dom";
import BlogLayout from "./blogLayout";

// 리다이렉션을 위한 컴포넌트
const CategoryRedirect: React.FC = () => {
    const { id } = useParams();
    return <Navigate to={`/blog/category/${id}`} replace />;
};

const BlogRoute: React.FC = () => {
    return (
        <BlogLayout
            contentNode = {
                <Routes>
                    <Route path="/" element={<ArticleList type="all" />} />
                    <Route path="/category/:id" element={<ArticleList type="category" />} />
                    <Route path="/tag/:id" element={<ArticleList type="tag" />} />
                    <Route path="/search" element={<ArticleList type="search" />} />
                    <Route path="/article/:id" element={<ArticlePage />} />
                    <Route path="/:id" element={<CategoryRedirect />} />
                </Routes>
            }
        />
    );
}

export default BlogRoute;