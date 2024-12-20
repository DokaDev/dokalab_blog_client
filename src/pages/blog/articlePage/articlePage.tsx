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
import remarkGfm from "remark-gfm";
import remarkEmoji from 'remark-emoji';
import remarkDirective from 'remark-directive';
import { useState } from 'react';
import type { Components } from 'react-markdown';
import { visit } from 'unist-util-visit';
import { h } from 'hastscript';
import { HiLightBulb } from "react-icons/hi";
import { IoInformationCircle } from "react-icons/io5";
import { BiSolidError } from "react-icons/bi";
import { MdDangerous } from "react-icons/md";
import { HiDownload } from "react-icons/hi";

interface ArticlePageProps {
    id: number;
    title: string;
    content: string;
    date: string;
    readTime: string;
    category: ArticleCategoryProps;
    tags: TagProps[];
}

// 커스텀 directive 기 추가
function remarkDirectiveProcessor() {
    return (tree) => {
        visit(tree, (node) => {
            if (
                node.type === 'containerDirective' ||
                node.type === 'leafDirective' ||
                node.type === 'textDirective'
            ) {
                const data = node.data || (node.data = {});
                data.hName = node.name;
                data.hProperties = {
                    ...node.attributes,
                    className: `callout callout-${node.name}`
                };
            }
        });
    };
}

const ArticlePage: React.FC = () => {
    const { id } = useParams();

    // 임시 데이터
    const article: ArticlePageProps = {
        id: 1,
        title: "Managing Server State with React Query",
        content: `# Deep Dive into React Query: A Comprehensive Guide

React Query has revolutionized how we handle server state management in React applications. In this comprehensive guide, we'll explore its powerful features and best practices for implementing efficient data synchronization.

## Understanding Server State vs. Client State

Before diving deep into React Query, it's crucial to understand the distinction between server state and client state:

- **Server State**: Data that resides on the server and requires asynchronous APIs for updates
- **Client State**: Local data such as UI state that doesn't need synchronization

## Key Features of React Query

### 1. Automatic Background Updates

React Query provides sophisticated background update mechanisms:

\`\`\`typescript:src/features/todos/useTodos.ts
const { data, isLoading, isFetching } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    refetchInterval: 1000 * 60, // Refetch every minute
    staleTime: 1000 * 30,      // Consider data stale after 30 seconds
});
\`\`\`

### 2. Intelligent Caching

The library implements a powerful caching system:

\`\`\`typescript:src/config/queryClient.ts
// Configure global defaults
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 1000 * 60 * 60, // Cache for 1 hour
            staleTime: 1000 * 60 * 5,  // Consider stale after 5 minutes
        },
    },
});
\`\`\`

### 3. Optimistic Updates

Implement instant UI updates while waiting for server confirmation:

\`\`\`typescript:src/features/todos/useTodoMutation.ts
const mutation = useMutation({
    mutationFn: updateTodo,
    onMutate: async (newTodo) => {
        await queryClient.cancelQueries({ queryKey: ['todos'] });
        const previousTodos = queryClient.getQueryData(['todos']);
        queryClient.setQueryData(['todos'], (old) => [...old, newTodo]);
        return { previousTodos };
    },
    onError: (err, newTodo, context) => {
        queryClient.setQueryData(['todos'], context.previousTodos);
    },
});
\`\`\`

## Common Patterns and Best Practices

### 1. Query Key Management

Organize your query keys effectively:

\`\`\`typescript:src/constants/queryKeys.ts
export const queryKeys = {
    todos: {
        all: ['todos'] as const,
        byId: (id: number) => ['todos', id] as const,
        byUser: (userId: number) => ['todos', 'user', userId] as const,
    },
    user: {
        details: ['user'] as const,
        preferences: ['user', 'preferences'] as const,
    },
} as const;
\`\`\`

### 2. Custom Hook Patterns

Create reusable query hooks:

\`\`\`typescript:src/hooks/useTodoList.ts
export function useTodoList(filters: TodoFilters) {
    return useQuery({
        queryKey: ['todos', filters],
        queryFn: () => fetchTodoList(filters),
        select: (data) => ({
            active: data.filter(todo => !todo.completed),
            completed: data.filter(todo => todo.completed),
        }),
    });
}
\`\`\`

## Performance Comparison

Here's how React Query compares to other state management solutions:

| Feature | React Query | Redux | SWR | Apollo |
|---------|-------------|-------|-----|--------|
| Caching | ✅ Built-in | 🔧 Manual | ✅ Built-in | ✅ Built-in |
| Auto Sync | ✅ Advanced | ❌ No | ✅ Basic | ✅ Advanced |
| Dev Tools | ✅ Excellent | ✅ Excellent | ❌ Limited | ✅ Good |
| Bundle Size | 12.4kB | 6.4kB | 10.2kB | 32.9kB |

## Implementation Checklist

- [x] Basic query setup
- [x] Caching configuration
- [ ] Optimistic updates
- [ ] Error boundaries
- [ ] Infinite queries

## Error Handling

Implement robust error handling:

\`\`\`typescript:src/features/errorHandling.ts
const { data, error } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
    retry: 3,
    retryDelay: 1000,
    onError: (error) => {
        console.error('Query failed:', error);
        notifyUser('Failed to fetch data');
    },
});
\`\`\`

> **Pro Tip**: Always implement proper error boundaries in your React applications to gracefully handle query failures.

## Conclusion

React Query significantly simplifies server state management in React applications. By leveraging its powerful features and following best practices, you can build more robust and performant applications with less boilerplate code.

Remember to:
- Configure proper caching strategies
- Implement optimistic updates where appropriate
- Handle errors gracefully
- Optimize performance with built-in features

The ecosystem continues to evolve, and staying updated with the latest features and best practices will help you make the most of this powerful library.

---

*Last updated: March 20, 2024*

## Code Block Test Cases

### 1. Code Block without Language Specification

\`\`\`
// This is a code block without language specification
function test() {
    console.log("Hello World");
}
\`\`\`

### 2. Code Block with Language but No Filename

\`\`\`javascript
// This is a JavaScript code block without filename
const greeting = "Hello";
console.log(greeting);
\`\`\`

### 3. Code Block with Filename but No Language

\`\`\`:utils/helper.js
// This might cause issues or fallback to plain text
export function helper() {
    return "helper function";
}
\`\`\`

### 4. Inline Code Examples

This is an inline code example: \`const x = 1;\`
Here's another one: \`npm install react-query\`

### 5. Mixed Content Code Block

\`\`\`html:templates/mixed.html
<div class="container">
    <style>
        .container { padding: 1rem; }
    </style>
    <script>
        function init() {
            console.log("Initialized");
        }
    </script>
</div>
\`\`\`

### 6. Code Block with Special Characters in Filename

\`\`\`typescript:src/components/[id]/index.tsx
export default function DynamicComponent() {
    return <div>Dynamic Route Component</div>;
}
\`\`\`

\`\`\`
export default function DynamicComponent() {
    return <div>Dynamic Route Component</div>;
}
\`\`\`

---
[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=14&pause=1000&width=435&lines=%F0%9F%9A%80+Building+the+Future%2C+One+Line+at+a+Time!+%F0%9F%92%BB;%F0%9F%94%A7+Turning+Ideas+into+Reality+with+Code+%E2%9C%8D%F0%9F%8F%BB;%F0%9F%A5%83+Developer+by+Day%2C+Whiskey+Lover+by+Night+%F0%9F%8C%99;%F0%9F%96%A5%EF%B8%8F+Beyond+Frameworks%3A+Mastering+the+Core+%F0%9F%9B%A1%EF%B8%8F)](https://git.io/typing-svg)

*Code block test cases added: March 21, 2024*

## Callout Examples

:::tip
Here's a helpful tip for optimizing your React Query cache!
:::

:::info
React Query v5 introduces breaking changes in the API.
Please check the migration guide before upgrading.
:::

:::warning
Be careful when implementing optimistic updates with
complex data structures.
:::

:::danger
Never expose your API keys in client-side code!
:::

## Download Examples

[!download React Query Example Project](https://example.com/react-query-example.zip)

[:download Complete Source Code](https://example.com/source-code.zip)

일반 링크는 이렇게 보입니다: [React Query Documentation](https://tanstack.com/query/latest)

`,
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
                    remarkPlugins={[
                        remarkGfm,
                        remarkEmoji,
                        remarkDirective,
                        remarkDirectiveProcessor
                    ]}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            // 코드 블록인지 확인하는 정확한 방법
                            const isCodeBlock = node?.position?.start?.line !== node?.position?.end?.line || className?.includes('language-');
                            
                            if (!isCodeBlock) {
                                return (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            }

                            const [copied, setCopied] = useState(false);
                            const match = /language-(\w+)(?::(.+))?/.exec(className || '');
                            const fileOnlyMatch = /language-:(.+)/.exec(className || '');

                            const handleCopy = () => {
                                navigator.clipboard.writeText(String(children).trim())
                                    .then(() => {
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 2000);
                                    });
                            };
                            
                            return (
                                <div className="code-block-container">
                                    <div className={`code-block-header ${(!match && !fileOnlyMatch) ? 'no-language-file' : ''}`}>
                                        <div className="header-left">
                                            <div className="window-controls">
                                                <span className="control close"></span>
                                                <span className="control minimize"></span>
                                                <span className="control maximize"></span>
                                            </div>
                                            <button 
                                                className={`copy-button ${copied ? 'copied' : ''}`}
                                                onClick={handleCopy}
                                                title="Copy code"
                                            >
                                                {copied ? (
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                ) : (
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        <div className="header-content">
                                            {(match?.[2] || fileOnlyMatch?.[1]) && (
                                                <div className="file-name">
                                                    {match?.[2] || fileOnlyMatch?.[1]}
                                                </div>
                                            )}
                                            {match?.[1] && (
                                                <div className="language-label">
                                                    {match[1]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <SyntaxHighlighter
                                        style={oneLight}
                                        language={match?.[1] || 'text'}
                                        showLineNumbers={true}
                                        customStyle={{
                                            margin: 0,
                                            padding: "1.5rem",
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
                            );
                        },
                        tip: ({ node, children, className, ...props }) => (
                            <div className={`callout ${className}`} {...props}>
                                <div className="callout-icon">
                                    <HiLightBulb size={20} />
                                </div>
                                <div className="callout-content">{children}</div>
                            </div>
                        ),
                        info: ({ node, children, className, ...props }) => (
                            <div className={`callout ${className}`} {...props}>
                                <div className="callout-icon">
                                    <IoInformationCircle size={20} />
                                </div>
                                <div className="callout-content">{children}</div>
                            </div>
                        ),
                        warning: ({ node, children, className, ...props }) => (
                            <div className={`callout ${className}`} {...props}>
                                <div className="callout-icon">
                                    <BiSolidError size={20} />
                                </div>
                                <div className="callout-content">{children}</div>
                            </div>
                        ),
                        danger: ({ node, children, className, ...props }) => (
                            <div className={`callout ${className}`} {...props}>
                                <div className="callout-icon">
                                    <MdDangerous size={20} />
                                </div>
                                <div className="callout-content">{children}</div>
                            </div>
                        ),
                        a: ({ node, children, href, ...props }) => {
                            // 텍스트 컨텐츠 확인
                            const text = String(children);
                            
                            // 다운로드 링크 패턴 확인 (!download로 시작하는 패턴만 체크)
                            const downloadMatch = text.match(/^!download\s+(.+)$/);
                            
                            if (downloadMatch) {
                                return (
                                    <a 
                                        href={href} 
                                        className="download-link" 
                                        download 
                                        {...props}
                                    >
                                        <HiDownload className="download-icon" />
                                        <span>{downloadMatch[1]}</span>
                                    </a>
                                );
                            }
                            
                            // 일반 링크는 기본 스타일로 렌더링
                            return (
                                <a href={href} {...props}>
                                    {children}
                                </a>
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
