import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./categoryPage.css";
import { API_BASE_URL } from '../../config/config';

interface Post {
    postId?: number;
    id?: number;
    postTitle?: string;
    title?: string;
    postDate?: string;
    summary: string;
    categoryId: number;
    categoryName?: string;
    parentId?: number;
    parentName?: string;
}

interface CategoryData {
    id: number;
    name: string;
    parentId?: number;
    parentName?: string;
    posts: Post[];
}

export default function CategoryPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const url = id === "0" 
                    ? `${API_BASE_URL}/all/post`
                    : `${API_BASE_URL}/category/${id}`;
                
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                
                if (id === "0") {
                    setPosts(data);
                    setCategoryData({ id: 0, name: "All Posts", posts: data });
                } else {
                    setPosts(data.posts);
                    setCategoryData(data);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError(error instanceof Error ? error.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [id]);

    const handlePostClick = (postId: number) => {
        navigate(`/article/${postId}`);
    };

    const handleCategoryClick = (e: React.MouseEvent, categoryId: number) => {
        e.stopPropagation();
        navigate(`/category/${categoryId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div className="category-page">
            <h1>{categoryData?.name}</h1>
            {!posts.length ? (
                <div className="no-posts">
                    <div className="no-posts-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 5v14H5V5h14zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="currentColor"/>
                            <path d="M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="currentColor"/>
                        </svg>
                    </div>
                    <h2>아직 게시글이 없습니다.</h2>
                    <p className="sub-text">새로운 게시글이 작성되면 이곳에 표시됩니다.</p>
                </div>
            ) : (
                <div className="post-grid">
                    {posts.map((post) => (
                        <div 
                            key={post.postId || post.id} 
                            className="post-card"
                            onClick={() => handlePostClick(post.postId || post.id!)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="post-thumbnail">
                                <img src="https://via.placeholder.com/300x200" alt={post.postTitle || post.title} />
                            </div>
                            <div className="post-content">
                                <h2>{post.postTitle || post.title}</h2>
                                <p className="post-summary">{post.summary}</p>
                                <div className="post-meta">
                                    <span className="post-category">
                                        {id === "0" ? (
                                            <>
                                                <a 
                                                    href="#"
                                                    onClick={(e) => handleCategoryClick(e, post.parentId!)}
                                                >
                                                    {post.parentName}
                                                </a>
                                                <span className="separator">&gt;</span>
                                                <a 
                                                    href="#"
                                                    onClick={(e) => handleCategoryClick(e, post.categoryId)}
                                                >
                                                    {post.categoryName}
                                                </a>
                                            </>
                                        ) : (
                                            categoryData?.parentName ? (
                                                <>
                                                    <a 
                                                        href="#"
                                                        onClick={(e) => handleCategoryClick(e, categoryData.parentId!)}
                                                    >
                                                        {categoryData.parentName}
                                                    </a>
                                                    <span className="separator">&gt;</span>
                                                    <a 
                                                        href="#"
                                                        onClick={(e) => handleCategoryClick(e, categoryData.id)}
                                                    >
                                                        {categoryData.name}
                                                    </a>
                                                </>
                                            ) : (
                                                <a 
                                                    href="#"
                                                    onClick={(e) => handleCategoryClick(e, categoryData!.id)}
                                                >
                                                    {categoryData?.name}
                                                </a>
                                            )
                                        )}
                                    </span>
                                    <span className="post-date">
                                        {post.postDate && new Date(post.postDate).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 