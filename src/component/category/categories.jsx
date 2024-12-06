import React from "react";
import Category from "./category";

import "./categories.css";

export default function Categories() {
    return (
        <div className="categories">
            <Category name="Category1" postCount={10} />
            <Category name="Category2" postCount={20} />
            <Category name="Category3" postCount={30} />
        </div>
    );
}
