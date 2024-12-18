import CategoryBox from "./category/categoryBox";
import './blogLayout.scss';
import { usePageTitle } from "../../hooks/usePageTitle.ts";

const BlogLayout: React.FC<{ contentNode: React.ReactNode }> = ({ contentNode }) => {
    usePageTitle("Blog");

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
    return (
        <div className="blog-layout">
            <aside className="blog-sidebar">
                <CategoryBox categoryGroups={categoryGroups} />
            </aside>
            <main className="blog-content">
                {contentNode}
            </main>
        </div>
    )
};

export default BlogLayout;