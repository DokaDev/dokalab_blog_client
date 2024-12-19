import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import './categoryItem.scss';

interface CategoryItemProps extends CategoryProps {
    isActive?: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ 
    id, 
    name, 
    description, 
    postCount,
    className,
    isActive
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

    const linkPath = id === 0 ? "/blog" : `/blog/category/${id}`;

    return (
        <NavLink 
            to={linkPath}
            end={id === 0}
            className={({ isActive: isNavActive }) => 
                `category-item ${className || ''} ${(isActive || isNavActive) ? 'active' : ''}`
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