import React from "react";
import "./category.css";

import Icon from "../../assets/post_icon.png";

export default function Category({ name, postCount }) {
    return (
        <div className="category">
            {/* // CategoryName[PostCount] */}
            {/* Category1[10] */}
            <img src={Icon} alt="icon" width="16px" height="16px" className="categoryIcon"/>
            {name}[{postCount}]
        </div>
    )
}