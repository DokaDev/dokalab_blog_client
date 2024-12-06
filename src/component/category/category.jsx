import React from "react";
import "./category.css";

export default function Category({ name, postCount, isSubCategory }) {
    return (
        <div 
            className={`category ${isSubCategory ? 'sub-category' : ''}`}
            data-count={`[${postCount}]`}
        >
            {name}
        </div>
    )
}