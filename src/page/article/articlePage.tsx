import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';
import './articlePage.css';

interface Article {
    postId: number;
    postTitle: string;
    postContent: string;
    createdAt: string;
    categoryId: number;
    categoryName: string;
    parentCategoryId?: number;
    parentCategoryName?: string;
}

export default function ArticlePage() {
    const { id } = useParams();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/article/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch article');
                }
                const data = await response.json();
                setArticle(data);
            } catch (error) {
                console.error('Error fetching article:', error);
                setError(error instanceof Error ? error.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!article) return <div>Article not found</div>;

    return (
        <div className="article-page">
            <div className="article-header">
                <h1>{article.postTitle}</h1>
                <div className="article-meta">
                    <span className="article-category">
                        {article.parentCategoryName ? 
                            `${article.parentCategoryName} > ${article.categoryName}` : 
                            article.categoryName}
                    </span>
                    <span className="article-date">
                        {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>
            <div className="article-content">
                {article.postContent}
            </div>
        </div>
    );
} 