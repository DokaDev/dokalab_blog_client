import { Link } from "react-router-dom";
import './categoryItem.scss';

const CategoryItem: React.FC<CategoryProps> = ({ id, name, description, postCount }) => {
    return (
        <div className="category-item">
            <div className="category-header">
                <div className="category-title">
                    <Link to={`/blog/${id}`}>{name}</Link>
                    <span>{postCount} posts</span>
                </div>
            </div>
            <div className="category-description">{description}</div>
        </div>
    );
};

export default CategoryItem;