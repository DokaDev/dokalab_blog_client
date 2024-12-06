import React, { useState, useEffect } from "react";
import Category from "./category";
import "./categories.css";
import { Category as CategoryType } from "../../types/category";
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';

export default function Categories() {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/category/list`);
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    // 전체 게시물 수 계산
    const totalPosts = categories.reduce((sum, category) => sum + category.postCount, 0);

    return (
        <div className="categories">
            <p className="categories_text">Categories</p>
            <div className="categories-list">
                <Category 
                    name="All Posts" 
                    postCount={totalPosts} 
                    isSubCategory={false} 
                    id={0}  // All Posts에 대한 id 값 지정
                />
                {categories.map((category) => (
                    <Category 
                        key={category.id}
                        id={category.id}  // 여기서 number 타입의 id를 전달
                        name={category.name}
                        postCount={category.postCount}
                        isSubCategory={category.isSubCategory}
                    />
                ))}
            </div>
        </div>
    );
}
