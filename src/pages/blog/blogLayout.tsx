import CategoryBox from "./category/categoryBox";
import './blogLayout.scss';

const BlogLayout: React.FC<{ contentNode: React.ReactNode }> = ({ contentNode }) => {
    const categories: CategoryProps[] = [
        { id: 1, name: "Category 1", description: "Description 1", postCount: 10 },
        { id: 2, name: "Category 2", description: "Description 2", postCount: 20 },
        { id: 3, name: "Category 3", description: "Description 3", postCount: 30 },
    ];

    return (
        <div className="blog-layout">
            <aside className="blog-sidebar">
                <CategoryBox categories={categories} />
            </aside>
            <main className="blog-content">
                {contentNode}
            </main>
        </div>
    )
};

export default BlogLayout;