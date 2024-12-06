import React, { useState, useEffect } from "react";
import Category from "./category";
import { Category as CategoryType } from "../../types/category";
import "./categories.css";

export default function Categories() {
    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        // API 호출 로직
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories");
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="categories">
            <p className="categories_text">Categories</p>
            <div className="categories-list">
                <Category name="All Posts" postCount={100} isSubCategory={false} />
                <Category name="Main Category 1" postCount={60} isSubCategory={false} />
                <Category
                    name="Category1"
                    postCount={10}
                    isSubCategory={true}
                />
                <Category name="Main Category 2" postCount={80} isSubCategory={false} />
                <Category
                    name="Category4"
                    postCount={20}
                    isSubCategory={true}
                />
                <Category
                    name="Category5"
                    postCount={30}
                    isSubCategory={true}
                />
                <Category
                    name="Category6"
                    postCount={20}
                    isSubCategory={true}
                />
                <Category
                    name="Category7"
                    postCount={30}
                    isSubCategory={true}
                />
                {/* {categories.map((category) => (
                    <Category 
                        key={category.id}
                        name={category.name}
                        postCount={category.postCount}
                        isSubCategory={category.isSubCategory}
                    />
                ))} */}
            </div>
        </div>
    );
}
