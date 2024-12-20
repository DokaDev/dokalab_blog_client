import { useParams, Link } from "react-router-dom";
import { ArticleCategoryProps, TagProps } from "../types";
import "./articlePage.scss";
import MarkdownRenderer from "../../../component/markdown/markdownRenderer";

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
[![!nocap !align=center Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=14&pause=1000&width=435&lines=%F0%9F%9A%80+Building+the+Future%2C+One+Line+at+a+Time!+%F0%9F%92%BB;%F0%9F%94%A7+Turning+Ideas+into+Reality+with+Code+%E2%9C%8D%F0%9F%8F%BB;%F0%9F%A5%83+Developer+by+Day%2C+Whiskey+Lover+by+Night+%F0%9F%8C%99;%F0%9F%96%A5%EF%B8%8F+Beyond+Frameworks%3A+Mastering+the+Core+%F0%9F%9B%A1%EF%B8%8F)](https://git.io/typing-svg)

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

## Documentation Links

[!docs React Query API Reference](https://tanstack.com/query/latest/docs/react/reference)
[!docs TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Download Examples

[!download React Query Example Project](https://example.com/react-query-example.zip)

Basic Link is like this: [React Query Documentation](https://tanstack.com/query/latest)

## User Examples
[!user GitHub Profile](https://github.com/username)
[!user Twitter](https://twitter.com/username)
[!user LinkedIn](https://linkedin.com/in/username)
[!user Instagram](https://instagram.com/username)

[!user Facebook](https://facebook.com/username)
[!user YouTube](https://youtube.com/username)
[!user TikTok](https://tiktok.com/username)
[!user Pinterest](https://pinterest.com/username)

## Header Examples

# H1

## H2

### H3

#### H4

##### H5

###### H6

## Image Examples

### Basic Image
![AI Times Image](https://cdn.aitimes.kr/news/photo/202305/28000_42202_5649.jpg)

### Size Options
Small Image (300px):
![!width=300 AI Times Image](https://cdn.aitimes.kr/news/photo/202305/28000_42202_5649.jpg)

Medium Image (500px):
![!width=500 AI Times Image](https://cdn.aitimes.kr/news/photo/202305/28000_42202_5649.jpg)

### Shadow Effect
With Shadow Effect:
![!shadow AI Times Image](https://cdn.aitimes.kr/news/photo/202305/28000_42202_5649.jpg)

### Alignment Options
Left Aligned (300px):
![!align=left !width=300 Left Aligned Image](https://cdn.aitimes.kr/news/photo/202305/28000_42202_5649.jpg)

This text appears below the image, not on its right side.

Center Aligned (500px):
![!align=center !width=500 Center Aligned Image](https://cdn.aitimes.kr/news/photo/202305/28000_42202_5649.jpg)

Right Aligned (300px):
![!align=right !width=300 Right Aligned Image](https://cdn.aitimes.kr/news/photo/202305/28000_42202_5649.jpg)

### Combined Options
Shadow + Left Align (400px):
![!shadow !align=left !width=400 Shadow with Left Alignment](https://cdn.aitimes.kr/news/photo/202305/28000_42202_5649.jpg)

Shadow + Center Align (600px):
![!shadow !align=center !width=600 Shadow with Center Alignment](https://cdn.aitimes.kr/news/photo/202305/28000_42202_5649.jpg)

Shadow + Right Align (400px):
![!shadow !align=right !width=400 Shadow with Right Alignment](https://cdn.aitimes.kr/news/photo/202305/28000_42202_5649.jpg)

Caption Hidden (300px):
![!width=300 !nocap AI Times Image](https://cdn.aitimes.kr/news/photo/202305/28000_42202_5649.jpg)

Multiple Options with Hidden Caption:
![!shadow !align=center !width=500 !nocap AI Times Image](https://cdn.aitimes.kr/news/photo/202305/28000_42202_5649.jpg)

### Additional Image Test(Transparent Background)

Basic Image: 
![AI Times Image](https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/1200px-Google_Photos_icon_%282020%29.svg.png)

Center Aligned Image(500px):
![!align=center !width=500 AI Times Image](https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/1200px-Google_Photos_icon_%282020%29.svg.png)

Left Aligned Image(300px):
![!align=left !width=300 AI Times Image](https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/1200px-Google_Photos_icon_%282020%29.svg.png)

Right Aligned Image(300px):
![!align=right !width=300 AI Times Image](https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/1200px-Google_Photos_icon_%282020%29.svg.png)

Shadow Effect:
![!shadow AI Times Image](https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/1200px-Google_Photos_icon_%282020%29.svg.png)

Shadow + Left Align (400px):
![!shadow !align=left !width=400 AI Times Image](https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/1200px-Google_Photos_icon_%282020%29.svg.png)

Shadow + Center Align (600px):
![!shadow !align=center !width=600 AI Times Image](https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/1200px-Google_Photos_icon_%282020%29.svg.png)

Shadow + Right Align (400px):
![!shadow !align=right !width=400 AI Times Image](https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/1200px-Google_Photos_icon_%282020%29.svg.png)

No Caption:
![!width=300 !nocap AI Times Image](https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/1200px-Google_Photos_icon_%282020%29.svg.png)

## LaTeX Math Examples

### Inline Math
Einstein's famous equation: $E = mc^2$ shows the relationship between mass and energy.

The quadratic formula $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ solves ax² + bx + c = 0.

When $n \\to \\infty$, the sequence converges.

### Block Math
The Pythagorean theorem is represented as:

$$a^2 + b^2 = c^2$$

Maxwell's Equations in differential form:

$$
\\begin{align*}
\\nabla \\cdot \\mathbf{E} &= \\frac{\\rho}{\\epsilon_0} \\\\
\\nabla \\cdot \\mathbf{B} &= 0 \\\\
\\nabla \\times \\mathbf{E} &= -\\frac{\\partial \\mathbf{B}}{\\partial t} \\\\
\\nabla \\times \\mathbf{B} &= \\mu_0\\mathbf{J} + \\mu_0\\epsilon_0\\frac{\\partial \\mathbf{E}}{\\partial t}
\\end{align*}
$$

The Euler's identity:

$$e^{i\\pi} + 1 = 0$$

The probability density function of a normal distribution:

$$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$$

### Complex Math Examples

The Fourier Transform:

$$F(\\omega) = \\int_{-\\infty}^{\\infty} f(t)e^{-i\\omega t}dt$$

Schrödinger's Equation:

$$i\\hbar\\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r},t) = \\left[-\\frac{\\hbar^2}{2m}\\nabla^2 + V(\\mathbf{r},t)\\right]\\Psi(\\mathbf{r},t)$$

## Mermaid Diagram Examples

### Basic Flowchart
\`\`\`mermaid
graph TD
    A[Start] --> B{Is it?}
    B -- Yes --> C[OK]
    C --> D[Rethink]
    D --> B
    B -- No ----> E[End]
\`\`\`

### Same Flowchart (Code View)
\`\`\`mermaid:!code
graph TD
    A[Start] --> B{Is it?}
    B -- Yes --> C[OK]
    C --> D[Rethink]
    D --> B
    B -- No ----> E[End]
\`\`\`

### Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant Client
    participant API
    participant DB
    
    Client->>API: GET /users
    API->>DB: Select Query
    DB-->>API: Return Users
    API-->>Client: 200 OK with Users
    
    Note over Client,API: Authentication Flow
    Client->>API: POST /login
    API-->>Client: JWT Token
\`\`\`

### Entity Relationship Diagram
\`\`\`mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
\`\`\`

### Gantt Chart
\`\`\`mermaid
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Requirements    :a1, 2024-01-01, 30d
    Design         :after a1, 20d
    section Development
    Coding         :2024-02-20, 45d
    Testing        :2024-03-15, 30d
\`\`\`

### Pie Chart
\`\`\`mermaid
pie title Programming Languages
    "JavaScript" : 40
    "Python" : 30
    "Java" : 20
    "Others" : 10
\`\`\`

### Git Graph
\`\`\`mermaid
gitGraph
   commit
   commit
   branch develop
   checkout develop
   commit
   commit
   checkout main
   merge develop
   commit
   commit
\`\`\`

### User Journey
\`\`\`mermaid
journey
    title User Shopping Experience
    section Browse
      Find product: 5: User
      View details: 3: User
    section Purchase
      Add to cart: 5: User
      Checkout: 3: User, System
      Payment: 3: User, System
    section Post-Purchase
      Order confirmation: 5: System
      Delivery: 3: System
\`\`\`

### Complex Flowchart with Styling
\`\`\`mermaid
graph LR
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
    
    style A fill:#f9f,stroke:#333,stroke-width:4px
    style B fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff
    style C fill:#9f9,stroke:#333,stroke-width:2px
\`\`\`

### Same Complex Flowchart (Code View)
\`\`\`mermaid:!code
graph LR
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
    
    style A fill:#f9f,stroke:#333,stroke-width:4px
    style B fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff
    style C fill:#9f9,stroke:#333,stroke-width:2px
\`\`\`

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

### List Examples
- Level 1
    - Level 2
        - Level 3
            - Level 4
                - Level 5

### Ordered List
1. Level 1
2. Level 2
3. Level 3
4. Level 4
5. Level 5

## Collapsible Content Examples

:::details{summary="Basic Example"}
This is a basic example of collapsible content.
You can put any markdown content here!

- List items
- More items
:::

:::details{summary="Code Example"}
Here's some code:

\`\`\`typescript
function hello() {
    console.log("Hello from collapsible section!");
}
\`\`\`
:::

:::details{summary="Nested Example"}
You cannot nest these!
:::warning
**Nesting Limitation**: Currently, the details directive does not support nesting. Each details section should be used independently at the same level.
:::



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
                <MarkdownRenderer content={article.content} />
            </div>
        </article>
    );
};

export default ArticlePage;
