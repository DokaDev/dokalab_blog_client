import { useState } from "react";

import CategoryItem from "./categoryItem";

import './categoryBox.scss';

interface CategoryBoxProps {
    categories: CategoryProps[];
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ categories }) => {
    return (
        <div className="category-box">
            {categories.map((category) => (
                <CategoryItem key={category.id} {...category} />
            ))}
        </div>
    )
};

export default CategoryBox;