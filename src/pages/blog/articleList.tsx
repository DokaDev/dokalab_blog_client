import { useParams } from "react-router-dom";
import ArticleCard, { ArticleCardProps } from "./articleCard/articleCard";
import './articleList.scss';

const ArticleList: React.FC = () => {
    const { categoryId } = useParams();
    
    // 임시 데이터 - 현재 카테고리 정보
    const currentCategory = {
        name: "React",
        description: "React 관련 기술 블로그 글 모음",
        postCount: 10
    };

    // 임시 게시글 데이터
    const articles: ArticleCardProps[] = [
        {
            id: 1,
            title: "React Query로 서버 상태 관리하기",
            description: "React Query를 사용하여 효율적으로 서버 상태를 관리하는 방법을 알아봅니다.",
            date: "2024-03-20",
            readTime: "8 min read",
            tags: [
                { id: 1, name: "React" },
                { id: 2, name: "React Query" },
                { id: 3, name: "상태관리" }
            ],
            category: {
                id: 1,
                name: "React"
            },
            showCategory: true
        },
        {
            id: 2,
            title: "Next.js 13의 새로운 기능 살펴보기",
            description: "Next.js 13 버전에서 추가된 주요 기능들과 성능 개선사항들을 자세히 알아봅니다.",
            date: "2024-03-15",
            readTime: "12 min read",
            tags: [
                { id: 4, name: "Next.js" },
                { id: 1, name: "React" },
                { id: 5, name: "Web Development" }
            ],
            category: {
                id: 1,
                name: "React"
            },
            showCategory: true
        },
    ];

    return (
        <div className="article-list">
            <div className="category-header">
                <div className="category-title">{currentCategory.name}</div>
                <div className="category-description">{currentCategory.description}</div>
                <span className="post-count">{currentCategory.postCount} posts</span>
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