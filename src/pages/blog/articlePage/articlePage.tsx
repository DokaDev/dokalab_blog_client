import { useParams, Link } from 'react-router-dom';
import { ArticleCategoryProps, TagProps } from '../types';
import './articlePage.scss';

interface ArticlePageProps {
    id: number;
    title: string;
    content: string;
    date: string;
    readTime: string;
    category: ArticleCategoryProps;
    tags: TagProps[];
}

const ArticlePage: React.FC = () => {
    const { id } = useParams();

    // 임시 데이터
    const article: ArticlePageProps = {
        id: 1,
        title: "Managing Server State with React Query",
        content: `
React Query는 서버 상태 관리를 위한 강력한 라이브러리입니다. 이 글에서는 React Query의 주요 기능과 사용법에 대해 알아보겠습니다.

## 주요 기능

1. **자동 캐싱**
- 서버 데이터를 자동으로 캐싱
- 캐시 무효화 전략 제공
- 백그라운드 업데이트

2. **데이터 동기화**
- 실시간 데이터 동기화
- 낙관적 업데이트
- 자동 재시도

3. **성능 최적화**
- 중복 요청 방지
- 페이지네이션 지원
- 무한 스크롤

## 사용 예시

\`\`\`typescript
const { data, isLoading } = useQuery('todos', fetchTodos);

if (isLoading) {
    return <div>Loading...</div>;
}

return (
    <div>
        {data.map(todo => (
            <TodoItem key={todo.id} {...todo} />
        ))}
    </div>
);
\`\`\`

## 결론

React Query를 사용하면 복잡한 서버 상태 관리를 쉽게 할 수 있습니다.
        `,
        date: "2024-03-20",
        readTime: "8 min read",
        category: {
            id: 1,
            name: "React",
            group: {
                id: 1,
                name: "Frontend"
            }
        },
        tags: [
            { id: 1, name: "React" },
            { id: 2, name: "React Query" },
            { id: 3, name: "State Management" }
        ]
    };

    return (
        <article className="article-page">
            <header className="article-header">
                <div className="article-category">
                    <span className="group-name">{article.category.group.name}</span>
                    <span className="separator">{'>'}</span>
                    <Link 
                        to={`/blog/category/${article.category.id}`}
                        className="category-name"
                    >
                        {article.category.name}
                    </Link>
                </div>
                <h1 className="article-title">{article.title}</h1>
                <div className="article-meta">
                    <time className="article-date">{article.date}</time>
                    <span className="separator">•</span>
                    <span className="article-read-time">{article.readTime}</span>
                </div>
                <div className="article-tags">
                    {article.tags.map(tag => (
                        <Link 
                            key={tag.id}
                            to={`/blog/tag/${tag.id}`}
                            className="tag"
                        >
                            {tag.name}
                        </Link>
                    ))}
                </div>
            </header>
            <div className="article-content">
                {article.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </article>
    );
};

export default ArticlePage;
