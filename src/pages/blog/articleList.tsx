import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import ArticleCard, { ArticleCardProps } from "./articleCard/articleCard";
import './articleList.scss';
import { useState, useEffect } from "react";

interface ArticleListProps {
    type: 'all' | 'category' | 'tag' | 'search';
}

const ArticleList: React.FC<ArticleListProps> = ({ type }) => {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');
    const searchType = searchParams.get('searchType') || 'title';

    // URL의 검색 파라미터로 검색어 상태 초기화
    const [searchQuery, setSearchQuery] = useState(query || '');
    const [selectedSearchType, setSelectedSearchType] = useState(searchType);

    // URL 파라미터가 변경될 때 로컬 상태 업데이트
    useEffect(() => {
        setSearchQuery(query || '');
        setSelectedSearchType(searchType);
    }, [query, searchType]);

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            // 검색어가 비어있으면 검색 파라미터 제거
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.delete('query');
            newSearchParams.delete('searchType');
            setSearchParams(newSearchParams);
            return;
        }

        // 현재 URL을 유지하면서 검색 파라미터만 업데이트
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('query', searchQuery.trim());
        newSearchParams.set('searchType', selectedSearchType);
        setSearchParams(newSearchParams);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // 현재 목록의 타입에 따른 제목과 설명 설정
    const getCurrentHeader = () => {
        switch (type) {
            case 'all':
                return {
                    name: "All Posts",
                    description: query 
                        ? `Search results for "${query}" in all posts`
                        : "Show all posts",
                    postCount: 35
                };
            case 'category':
                return {
                    name: "React",
                    description: query 
                        ? `Search results for "${query}" in React category`
                        : "Show all posts with [React] category",
                    postCount: 10
                };
            case 'tag':
                return {
                    name: "Tag: React Query",
                    description: query 
                        ? `Search results for "${query}" in React Query tag`
                        : "Show all posts with [React Query] tag",
                    postCount: 5
                };
            default:
                return {
                    name: "Posts",
                    description: "Show all posts",
                    postCount: 0
                };
        }
    };

    const currentHeader = getCurrentHeader();

    // 임시 게시글 데이터
    const articles: ArticleCardProps[] = [
        {
            id: 1,
            title: "Managing Server State with React Query",
            description: "Learn how to efficiently manage server state using React Query.",
            date: "2024-03-20",
            readTime: "8 min read",
            tags: [
                { id: 1, name: "React" },
                { id: 2, name: "React Query" },
                { id: 3, name: "State Management" }
            ],
            category: {
                id: 1,
                name: "React",
                group: {
                    id: 1,
                    name: "Frontend"
                }
            },
            showCategory: true
        },
        {
            id: 2,
            title: "Exploring New Features in Next.js 13",
            description: "Dive into the key new features and performance improvements introduced in Next.js version 13.",
            date: "2024-03-15",
            readTime: "12 min read",
            tags: [
                { id: 4, name: "Next.js" },
                { id: 1, name: "React" },
                { id: 5, name: "Web Development" }
            ],
            category: {
                id: 1,
                name: "React",
                group: {
                    id: 1,
                    name: "Frontend"
                }
            },
            showCategory: true
        }
    ];

    return (
        <div className="article-list">
            <div className="category-header">
                <div className="title-wrapper">
                    <div className="category-title">{currentHeader.name}</div>
                    <span className="post-count">{currentHeader.postCount} posts</span>
                </div>
                <div className="category-description">{currentHeader.description}</div>
                <div className="search-section">
                    <select 
                        className="search-type"
                        value={selectedSearchType}
                        onChange={(e) => setSelectedSearchType(e.target.value)}
                    >
                        <option value="title">Title</option>
                        <option value="content">Content</option>
                        <option value="both">Title & Content</option>
                    </select>
                    <div className="search-input-wrapper">
                        <input
                            type="text"
                            className="search-input"
                            placeholder={`Search ${type === 'category' ? 'in category' : type === 'tag' ? 'in tag' : 'articles'}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button 
                            className="search-button"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="articles-container">
                {articles.map(article => (
                    <ArticleCard key={article.id} {...article} />
                ))}
            </div>
        </div>
    );
};

export default ArticleList;