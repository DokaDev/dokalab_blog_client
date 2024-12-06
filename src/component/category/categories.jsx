import React from "react";
import Category from "./category";

import "./categories.css";

export default function Categories() {
    return (
        <div className="categories">
            <p className="categories_text">Categories</p>
            <div className="categories-list">
                <Category name="All Posts" postCount={100}/>
                <Category name="Main Category 1" postCount={60} />
                <Category name="Category1" postCount={10} isSubCategory={true} />
                <Category name="Main Category 2" postCount={80} />
                <Category name="Category4" postCount={20} isSubCategory={true} />
                <Category name="Category5" postCount={30} isSubCategory={true} />
                <Category name="Category6" postCount={20} isSubCategory={true} />
                <Category name="Category7" postCount={30} isSubCategory={true} />
            </div>
        </div>
    );
}
