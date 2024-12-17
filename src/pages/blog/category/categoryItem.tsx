import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import './categoryItem.scss';

interface CategoryItemProps extends CategoryProps {
    className?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ 
    id, 
    name, 
    description, 
    postCount,
    className 
}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const timerRef = useRef<number>();

    const handleMouseEnter = () => {
        timerRef.current = window.setTimeout(() => {
            setShowTooltip(true);
        }, 700);
    };

    const handleMouseLeave = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = undefined;
        }
        setShowTooltip(false);
    };

    return (
        <NavLink 
            to={`/blog/${id}`} 
            className={({ isActive }) => 
                `category-item ${className || ''} ${isActive ? 'active' : ''}`
            }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="category-header">
                <div className="category-title">
                    <span className="category-name">{name}</span>
                    <div className="tooltip" data-show={showTooltip}>
                        {description}
                    </div>
                </div>
                <span className="post-count">{postCount} posts</span>
            </div>
        </NavLink>
    );
};

export default CategoryItem;