import { useState, useRef, useEffect } from 'react';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { githubLight } from '@uiw/codemirror-theme-github';
import MarkdownRenderer from '../../../component/markdown/markdownRenderer';
import './editor.scss';

interface Category {
    id: string;
    name: string;
}

const TEMP_CATEGORIES: Category[] = [
    { id: 'web', name: 'Web Development' },
    { id: 'ai', name: 'Artificial Intelligence' },
    { id: 'mobile', name: 'Mobile Development' },
    { id: 'data', name: 'Data Science' }
];

const MARKDOWN_GUIDE = [
    {
        title: 'Basic Syntax',
        items: [
            { label: 'Bold', summary_syntax: '**text**', syntax: '**bold text**' },
            { label: 'Italic', summary_syntax: '*text*', syntax: '*italic text*' },
            { label: 'Link', summary_syntax: '[text](url)', syntax: '[text](url)' }
        ]
    },
    {
        title: 'Headers',
        items: [
            { label: 'Heading 1', summary_syntax: '# Title', syntax: '# Heading 1' },
            { label: 'Heading 2', summary_syntax: '## Title', syntax: '## Heading 2' },
            { label: 'Heading 3', summary_syntax: '### Title', syntax: '### Heading 3' },
            { label: 'Heading 4', summary_syntax: '#### Title', syntax: '#### Heading 4' },
            { label: 'Heading 5', summary_syntax: '##### Title', syntax: '##### Heading 5' },
            { label: 'Heading 6', summary_syntax: '###### Title', syntax: '###### Heading 6' }
        ]
    },
    {
        title: 'Content Blocks',
        items: [
            { 
                label: 'Quote Block', 
                summary_syntax: '> Quote text',
                syntax: '> **Pro Tip**: Always implement proper error boundaries in your React applications to gracefully handle query failures.'
            },
            { 
                label: 'Tip Callout', 
                summary_syntax: ':::tip\nTip content\n:::',
                syntax: ':::tip\nHere\'s a helpful tip for optimizing your React Query cache!\n:::'
            },
            { 
                label: 'Info Callout', 
                summary_syntax: ':::info\nInfo content\n:::',
                syntax: ':::info\nReact Query v5 introduces breaking changes in the API.\nPlease check the migration guide before upgrading.\n:::'
            },
            { 
                label: 'Warning Callout', 
                summary_syntax: ':::warning\nWarning content\n:::',
                syntax: ':::warning\nBe careful when implementing optimistic updates with\ncomplex data structures.\n:::'
            },
            { 
                label: 'Danger Callout', 
                summary_syntax: ':::danger\nDanger content\n:::',
                syntax: ':::danger\nNever expose your API keys in client-side code!\n:::'
            }
        ]
    },
    {
        title: 'Code Blocks',
        items: [
            { 
                label: 'Basic (No Language/Filename)', 
                summary_syntax: '```\ncode\n```',
                syntax: '```\nconst greeting = "Hello, World!";\nconsole.log(greeting);\n```' 
            },
            { 
                label: 'With Language', 
                summary_syntax: '```language\ncode\n```',
                syntax: '```javascript\nconst greeting = "Hello, World!";\nconsole.log(greeting);\n```' 
            },
            { 
                label: 'With Filename', 
                summary_syntax: '```::filename.ext\ncode\n```',
                syntax: '```::index.js\nconst greeting = "Hello, World!";\nconsole.log(greeting);\n```' 
            },
            { 
                label: 'With Language & Filename', 
                summary_syntax: '```language:filename.ext\ncode\n```',
                syntax: '```javascript:index.js\nconst greeting = "Hello, World!";\nconsole.log(greeting);\n```' 
            }
        ]
    },
    {
        title: 'Mermaid Diagrams',
        items: [
            {
                label: 'Code View (!code)',
                summary_syntax: '```mermaid:!code\ndiagram code\n```',
                syntax: 'To view the diagram code instead of rendering it,\nadd :!code after mermaid:\n\n```mermaid:!code\ngraph TD\n    A[Start] --> B{Decision}\n    B -- Yes --> C[OK]\n    B -- No --> D[End]\n```'
            },
            {
                label: 'Basic Flowchart',
                summary_syntax: '```mermaid\ngraph TD\nA --> B\n```',
                syntax: '```mermaid\ngraph TD\n    A[Start] --> B{Decision}\n    B -- Yes --> C[OK]\n    B -- No --> D[End]\n```'
            },
            {
                label: 'Complex Flowchart with Styling',
                summary_syntax: '```mermaid\ngraph LR\nA --> B\nstyle A fill:#f9f\n```',
                syntax: '```mermaid\ngraph LR\n    A[Hard edge] -->|Link text| B(Round edge)\n    B --> C{Decision}\n    C -->|One| D[Result one]\n    C -->|Two| E[Result two]\n    \n    style A fill:#f9f,stroke:#333,stroke-width:4px\n    style B fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff\n    style C fill:#9f9,stroke:#333,stroke-width:2px\n```'
            },
            {
                label: 'Sequence Diagram',
                summary_syntax: '```mermaid\nsequenceDiagram\nA->>B: Message\n```',
                syntax: '```mermaid\nsequenceDiagram\n    participant Client\n    participant API\n    participant DB\n    \n    Client->>API: GET /users\n    API->>DB: Select Query\n    DB-->>API: Return Users\n    API-->>Client: 200 OK\n```'
            },
            {
                label: 'Entity Relationship',
                summary_syntax: '```mermaid\nerDiagram\nA ||--o{ B\n```',
                syntax: '```mermaid\nerDiagram\n    CUSTOMER ||--o{ ORDER : places\n    ORDER ||--|{ LINE-ITEM : contains\n    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses\n```'
            },
            {
                label: 'User Journey',
                summary_syntax: '```mermaid\njourney\n  step: 5: User\n```',
                syntax: '```mermaid\njourney\n    title User Shopping Experience\n    section Browse\n      Find product: 5: User\n      View details: 3: User\n    section Purchase\n      Add to cart: 5: User\n      Checkout: 3: User, System\n      Payment: 3: User, System\n```'
            },
            {
                label: 'Pie Chart',
                summary_syntax: '```mermaid\npie\n  "A" : 40\n```',
                syntax: '```mermaid\npie title Programming Languages\n    "JavaScript" : 40\n    "Python" : 30\n    "Java" : 20\n    "Others" : 10\n```'
            },
            {
                label: 'Gantt Chart',
                summary_syntax: '```mermaid\ngantt\n  task :a1, 1d\n```',
                syntax: '```mermaid\ngantt\n    title Project Timeline\n    dateFormat YYYY-MM-DD\n    section Planning\n    Requirements :a1, 2024-01-01, 30d\n    Design      :after a1, 20d\n```'
            },
            {
                label: 'Git Graph',
                summary_syntax: '```mermaid\ngitGraph\n  commit\n```',
                syntax: '```mermaid\ngitGraph\n   commit\n   commit\n   branch develop\n   checkout develop\n   commit\n   checkout main\n   merge develop\n```'
            }
        ]
    },
    {
        title: 'LaTeX Math',
        items: [
            { 
                label: 'Inline Math', 
                summary_syntax: '$equation$',
                syntax: 'Einstein\'s famous equation: $E = mc^2$ shows the relationship between mass and energy.\n\nWhen $n \\to \\infty$, the sequence converges.' 
            },
            { 
                label: 'Display Math', 
                summary_syntax: '$$\nequation\n$$',
                syntax: 'The Pythagorean theorem:\n\n$$a^2 + b^2 = c^2$$' 
            },
            { 
                label: 'Greek Letters', 
                summary_syntax: '$\\alpha, \\beta, \\gamma$',
                syntax: 'Common Greek letters: $\\alpha, \\beta, \\gamma, \\delta, \\theta, \\lambda, \\mu, \\pi, \\sigma, \\omega$\n\nUsed in equations: $\\Delta x = x_2 - x_1$' 
            },
            { 
                label: 'Subscript & Superscript', 
                summary_syntax: '$x_i^2$',
                syntax: 'Einstein\'s equation: $E = mc^2$\nSubscripts: $a_1, a_2, ..., a_n$\nBoth: $x_i^{2n}$' 
            },
            { 
                label: 'Fractions', 
                summary_syntax: '$\\frac{n}{d}$',
                syntax: 'The quadratic formula: $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$\n\nComplex fraction: $\\frac{\\sqrt{x^2 + y^2}}{\\alpha + \\beta}$' 
            },
            { 
                label: 'Summation', 
                summary_syntax: '$\\sum_{i=1}^n$',
                syntax: 'Sum formula:\n$$\\sum_{i=1}^n i = \\frac{n(n+1)}{2}$$\n\nInfinite series: $$\\sum_{n=0}^\\infty \\frac{1}{n!}$$' 
            },
            { 
                label: 'Integrals', 
                summary_syntax: '$\\int_a^b f(x)dx$',
                syntax: 'Gaussian integral:\n$$\\int_{-\\infty}^\\infty e^{-x^2} dx = \\sqrt{\\pi}$$\n\nFourier Transform:\n$$F(\\omega) = \\int_{-\\infty}^\\infty f(t)e^{-i\\omega t}dt$$' 
            },
            { 
                label: 'Limits', 
                summary_syntax: '$\\lim_{x \\to a}$',
                syntax: 'Basic limit:\n$$\\lim_{x \\to \\infty} \\frac{1}{x} = 0$$\n\nComplex limit:\n$$\\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$' 
            },
            { 
                label: 'Differential Equations', 
                summary_syntax: '$\\frac{d}{dx}, \\partial$',
                syntax: 'Schrödinger\'s Equation:\n$$i\\hbar\\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r},t) = \\left[-\\frac{\\hbar^2}{2m}\\nabla^2 + V(\\mathbf{r},t)\\right]\\Psi(\\mathbf{r},t)$$' 
            },
            { 
                label: 'Probability & Statistics', 
                summary_syntax: '$P(A|B)$',
                syntax: 'Normal distribution:\n$$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$$\n\nBayes\' theorem:\n$$P(A|B) = \\frac{P(B|A)P(A)}{P(B)}$$' 
            },
            { 
                label: 'Mathematical Symbols', 
                summary_syntax: '$\\in, \\subset, \\cup, \\cap$',
                syntax: 'Set notation: $A \\subset B$, $x \\in \\mathbb{R}$\nOperations: $A \\cup B$, $A \\cap B$\nLogic: $\\forall x \\in \\mathbb{R}, \\exists y$\nCalculus: $\\nabla$, $\\partial$, $\\oint$' 
            },
            {
                label: 'Special Functions',
                summary_syntax: '$\\sin x, \\log x$',
                syntax: 'Trigonometric: $\\sin x$, $\\cos x$, $\\tan x$\nLogarithmic: $\\log x$, $\\ln x$\nSpecial: $\\Gamma(x)$, $\\zeta(s)$\nEuler\'s identity: $$e^{i\\pi} + 1 = 0$$'
            }
        ]
    }
];

const Editor: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
    const [togglePosition, setTogglePosition] = useState<number>(40); // vh percentage
    const [openSections, setOpenSections] = useState<string[]>([]);  // 열린 섹션들을 추적
    const toggleRef = useRef<HTMLButtonElement>(null);
    const isDraggingRef = useRef<boolean>(false);
    const [content, setContent] = useState<string>(`## Hello World

\`\`\`java:Application.java
public class Application {
    public static void main(String[] args) {
        
    }
}
\`\`\`
`);
    const [previewItem, setPreviewItem] = useState<{
        syntax: string;
        position: { x: number; y: number };
    } | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDraggingRef.current && toggleRef.current) {
                const editorRect = toggleRef.current.closest('.editor-main')?.getBoundingClientRect();
                if (!editorRect) return;
                
                // 에디터 영역 내에서의 상대적 위치를 퍼센트로 계산
                const relativeY = e.clientY - editorRect.top;
                const percent = (relativeY / editorRect.height) * 100;
                
                // 위치 제한 (10% ~ 90%)
                setTogglePosition(Math.min(Math.max(percent, 10), 90));
            }
        };

        const handleMouseUp = () => {
            isDraggingRef.current = false;
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        isDraggingRef.current = true;
    };

    const insertMarkdown = (syntax: string) => {
        setContent(prev => prev + '\n' + syntax + '\n');
    };

    const toggleSection = (sectionTitle: string) => {
        setOpenSections(prev => 
            prev.includes(sectionTitle)
                ? prev.filter(title => title !== sectionTitle)
                : [...prev, sectionTitle]
        );
    };

    const handleItemHover = (e: React.MouseEvent, syntax: string) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const tooltipWidth = 400; // max-width from CSS
        const tooltipHeight = 300; // 예상 최대 높이
        const padding = 20; // 화면 가장자리와의 여백

        // 화면 오른쪽 끝에서 넘치는지 확인
        let xPos = rect.right + 10;
        if (xPos + tooltipWidth + padding > window.innerWidth) {
            xPos = rect.left - tooltipWidth - 10;
        }

        // 화면 아래쪽에서 넘치는지 확인하고, 위쪽에 공간이 있다면 위에 표시
        let yPos = rect.top;
        if (yPos + tooltipHeight + padding > window.innerHeight) {
            // 위쪽에 충분한 공간이 있는지 확인
            if (rect.top - tooltipHeight - padding > 0) {
                // 요소 위에 툴팁 표시
                yPos = rect.top - tooltipHeight - 10;
            } else {
                // 위쪽에도 공간이 부족하다면 화면 중앙에 맞춤
                yPos = Math.max(padding, window.innerHeight / 2 - tooltipHeight / 2);
            }
        }

        setPreviewItem({
            syntax,
            position: {
                x: xPos,
                y: yPos
            }
        });
    };

    return (
        <div className="editor-container">
            <div className="editor-header">
                <input
                    type="text"
                    className="title-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter article title..."
                />
                <select
                    className="category-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    aria-label="Select article category"
                >
                    <option value="">Select category...</option>
                    {TEMP_CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="editor-main">
                <div className={`markdown-tools ${isGuideOpen ? 'open' : ''}`}>
                    <button 
                        ref={toggleRef}
                        className="toggle-guide"
                        onClick={() => setIsGuideOpen(!isGuideOpen)}
                        onMouseDown={handleMouseDown}
                        aria-label={isGuideOpen ? 'Close guide' : 'Open guide'}
                        style={{ top: `${togglePosition}%` }}
                    >
                        {isGuideOpen ? '◀' : '▶'}
                    </button>
                    <div className="tools-header">
                        <h2>Markdown Guide</h2>
                    </div>
                    <div className="tools-content">
                        {MARKDOWN_GUIDE.map((section, idx) => (
                            <div key={idx} className="tool-section">
                                <div 
                                    className="section-header"
                                    onClick={() => toggleSection(section.title)}
                                >
                                    <h3>{section.title}</h3>
                                    <span className="toggle-icon">
                                        {openSections.includes(section.title) ? '▼' : '▶'}
                                    </span>
                                </div>
                                <div className={`tool-items ${openSections.includes(section.title) ? 'open' : ''}`}>
                                    {section.items.map((item, itemIdx) => (
                                        <div 
                                            key={itemIdx} 
                                            className="tool-item" 
                                            onClick={() => insertMarkdown(item.syntax)}
                                            onMouseEnter={(e) => handleItemHover(e, item.syntax)}
                                            onMouseLeave={() => setPreviewItem(null)}
                                        >
                                            <span className="label">{item.label}</span>
                                            <code className="syntax">{item.summary_syntax.split('\n')[0]}</code>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Split 
                    className="editor-content"
                    sizes={[50, 50]}
                    minSize={300}
                    gutterSize={10}
                    snapOffset={30}
                    dragInterval={1}
                >
                    <div className="editor-section source">
                        <div className="section-header">
                            <h2>Markdown Source</h2>
                        </div>
                        <CodeMirror
                            value={content}
                            onChange={(value) => setContent(value)}
                            height="100%"
                            theme={githubLight}
                            extensions={[
                                markdown({ 
                                    base: markdownLanguage,
                                    codeLanguages: languages
                                })
                            ]}
                            basicSetup={{
                                lineNumbers: true,
                                foldGutter: true,
                                dropCursor: true,
                                allowMultipleSelections: true,
                                indentOnInput: true,
                                bracketMatching: true,
                                closeBrackets: true,
                                autocompletion: true,
                                highlightActiveLine: true,
                                highlightSelectionMatches: true,
                                tabSize: 4,
                            }}
                        />
                    </div>
                    <div className="editor-section preview">
                        <div className="section-header">
                            <h2>Preview</h2>
                        </div>
                        <div className="preview-content article-content">
                            <MarkdownRenderer content={content} />
                        </div>
                    </div>
                </Split>
            </div>
            <div className="editor-footer">
                <div className="button-group">
                    <button className="save-draft">Save as Draft</button>
                    <button className="save">Save</button>
                </div>
            </div>
            {previewItem && (
                <div 
                    className="preview-tooltip"
                    style={{
                        position: 'fixed',
                        left: `${previewItem.position.x}px`,
                        top: `${previewItem.position.y}px`
                    }}
                >
                    <div className="article-content preview-content">
                        <MarkdownRenderer content={previewItem.syntax} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Editor;