import CategoryBox from "./category/categoryBox";
import './blogLayout.scss';
import { usePageTitle } from "../../hooks/usePageTitle.ts";
import { useLocation } from "react-router-dom";

const BlogLayout: React.FC<{ contentNode: React.ReactNode }> = ({ contentNode }) => {
    usePageTitle("Blog");
    const location = useLocation();

    // URL에서 현재 활성화된 카테고리 ID 추출
    const getCategoryIdFromPath = () => {
        const articleMatch = location.pathname.match(/\/blog\/article\/(\d+)/);
        const categoryMatch = location.pathname.match(/\/blog\/category\/(\d+)/);
        
        if (categoryMatch) {
            return parseInt(categoryMatch[1]);
        }
        
        // 게시글 페이지인 경우 임시로 카테고리 ID 1 반환 (실제로는 API에서 받아와야 함)
        if (articleMatch) {
            return 1; // 임시 데이터의 React 카테고리 ID
        }
        
        return null;
    };

    const categoryGroups: CategoryGroupProps[] = [
        {
            id: 1,
            name: "Frontend",
            description: "Frontend Development",
            categories: [
                { id: 1, name: "React", description: "React related posts", postCount: 10 },
                { id: 2, name: "Vue", description: "Vue.js related posts", postCount: 5 }
            ]
        },
        {
            id: 2,
            name: "Backend",
            description: "Backend Development",
            categories: [
                { id: 3, name: "Node.js", description: "Node.js related posts", postCount: 8 },
                { id: 4, name: "Spring", description: "Spring framework posts", postCount: 12 }
            ]
        }
    ];

    const activeCategoryId = getCategoryIdFromPath();

    return (
        <div className="blog-layout">
            <aside className="blog-sidebar">
                <CategoryBox 
                    categoryGroups={categoryGroups} 
                    activeCategoryId={activeCategoryId}
                />
            </aside>
            <main className="blog-content">
                {contentNode}
            </main>
        </div>
    )
};

export default BlogLayout;