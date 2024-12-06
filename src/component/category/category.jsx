import React from "react";
import "./category.css";
import { Link } from "react-router-dom";

export default function Category({ id, name, postCount, isSubCategory }) {
    return (
        <Link 
            to={`/category/${id}`}
            className={`category ${isSubCategory ? 'sub-category' : ''}`}
            data-count={`[${postCount}]`}
        >
            {name} 
        </Link>
    )
}