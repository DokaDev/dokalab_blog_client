import { useParams, Link } from "react-router-dom";
import { ArticleCategoryProps, TagProps } from "../types";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./articlePage.scss";
import {
    atomOneLight,
    vs,
    xcode,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import remarkGfm from "remark-gfm";

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
        content: `React Query는 서버 상태 관리를 위한 강력한 라이브러리입니다. 이 글에서는 React Query의 주요 기능과 사용법에 대해 알아보겠습니다.

## 주요 기능

1. **자동 캐싱**
- 서버 데이터를 자동으로 캐싱
- 캐시 무효화 전 제공
- 백그라운드 데이트

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

React Query를 사용하면 복잡한 서버 상태 관리를 쉽게 할 수 있습니다.`,
        date: "2024-03-20",
        readTime: "8 min read",
        category: {
            id: 1,
            name: "React",
            group: {
                id: 1,
                name: "Frontend",
            },
        },
        tags: [
            { id: 1, name: "React" },
            { id: 2, name: "React Query" },
            { id: 3, name: "State Management" },
        ],
    };

    return (
        <article className="article-page">
            <header className="article-header">
                <div className="article-category">
                    <span className="group-name">
                        {article.category.group.name}
                    </span>
                    <span className="separator">{">"}</span>
                    <Link
                        to={`/blog/category/${article.category.id}`}
                        className="category-name">
                        {article.category.name}
                    </Link>
                </div>
                <h1 className="article-title">{article.title}</h1>
                <div className="article-meta">
                    <time className="article-date">{article.date}</time>
                    <span className="separator">•</span>
                    <span className="article-read-time">
                        {article.readTime}
                    </span>
                </div>
                <div className="article-tags">
                    {article.tags.map((tag) => (
                        <Link
                            key={tag.id}
                            to={`/blog/tag/${tag.id}`}
                            className="tag">
                            {tag.name}
                        </Link>
                    ))}
                </div>
            </header>
            <div className="article-content">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({ node, inline, className, children, ...props }: CodeProps) {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                                <div className="code-block-container">
                                    <div className="code-block-header">
                                        <div className="window-controls">
                                            <span className="control close"></span>
                                            <span className="control minimize"></span>
                                            <span className="control maximize"></span>
                                        </div>
                                        <div className="language-label">
                                            {match[1]}
                                        </div>
                                    </div>
                                    <SyntaxHighlighter
                                        style={oneLight}
                                        language={match[1]}
                                        showLineNumbers={true}
                                        customStyle={{
                                            margin: 0,
                                            padding: "1.5rem",
                                            // lineHeight: "2",
                                            fontSize: "13px",
                                        }}
                                        wrapLines={true}
                                        lineProps={() => ({
                                            style: {
                                                display: "block",
                                                width: "100%"
                                            }
                                        })}
                                        lineNumberStyle={() => ({
                                            minWidth: "2.5em",
                                            paddingRight: "1em",
                                            textAlign: "right",
                                            userSelect: "none",
                                            marginRight: "1em",
                                        })}
                                        {...props}>
                                        {String(children).trim()}
                                    </SyntaxHighlighter>
                                </div>
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}>
                    {article.content}
                </ReactMarkdown>
            </div>
        </article>
    );
};

export default ArticlePage;
