import { useState } from "react";

import CategoryItem from "./categoryItem";

import './categoryBox.scss';

interface CategoryBoxProps {
    categoryGroups: CategoryGroupProps[];
    activeCategoryId: number | null;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ categoryGroups, activeCategoryId }) => {
    return (
        <div className="category-box">
            <CategoryItem 
                id={0}
                name="All Posts"
                description="View all blog posts"
                postCount={35}
                className="all-posts"
                isActive={activeCategoryId === null}
            />
            {categoryGroups.map((group) => (
                <div key={group.id} className="category-group">
                    <div className="group-header">
                        <h3>{group.name}</h3>
                        <p>{group.description}</p>
                    </div>
                    <div className="group-categories">
                        {group.categories.map((category) => (
                            <CategoryItem 
                                key={category.id} 
                                {...category} 
                                isActive={category.id === activeCategoryId}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
};

export default CategoryBox;