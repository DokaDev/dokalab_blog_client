import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import remarkEmoji from 'remark-emoji';
import remarkDirective from 'remark-directive';
import { useState, useEffect } from 'react';
import { visit } from 'unist-util-visit';
import { HiLightBulb } from "react-icons/hi";
import { IoInformationCircle } from "react-icons/io5";
import { BiSolidError } from "react-icons/bi";
import { MdDangerous } from "react-icons/md";
import { HiDownload } from "react-icons/hi";
import { HiDocument } from "react-icons/hi";
import 'katex/dist/katex.min.css';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import mermaid from 'mermaid';
import './markdownRenderer.scss';

// mermaid 초기 설정
mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    securityLevel: 'loose',
});

// 커스텀 directive 처리
function remarkDirectiveProcessor() {
    return (tree: any) => {
        visit(tree, (node: any) => {
            if (
                node.type === 'containerDirective' ||
                node.type === 'leafDirective' ||
                node.type === 'textDirective'
            ) {
                const data = node.data || (node.data = {});
                const attributes = node.attributes || {};
                
                // details directive 처리
                if (node.name === 'details') {
                    data.hName = 'div';
                    data.hProperties = {
                        ...attributes,
                        className: 'details-wrapper',
                        'data-summary': attributes.summary || 'Details'
                    };
                }
                // callout directive 처리
                else if (['tip', 'info', 'warning', 'danger'].includes(node.name)) {
                    data.hName = 'div';
                    data.hProperties = {
                        ...attributes,
                        className: `callout callout-${node.name}`
                    };
                }
            }
        });
    };
}

// 이미지를 포함한 paragraph를 div로 변환하는 플러그인
function remarkImagesDiv() {
    return (tree: any) => {
        visit(tree, (node: any) => {
            if (
                node.type === 'paragraph' &&
                node.children.some((child: any) => child.type === 'image')
            ) {
                node.type = 'div';
            }
        });
    };
}

// Details 컴포넌트
const Details = ({ children, summary = 'Details' }: { children: React.ReactNode; summary?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className={`details-container ${isOpen ? 'open' : ''}`}>
            <div 
                className="details-summary"
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg 
                    className="details-arrow" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16"
                >
                    <path d="M6 12l4-4-4-4" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
                <span>{summary}</span>
            </div>
            <div className="details-content">
                {children}
            </div>
        </div>
    );
};

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <ReactMarkdown
            remarkPlugins={[
                remarkGfm,
                remarkEmoji,
                remarkDirective,
                remarkDirectiveProcessor,
                remarkMath
            ]}
            rehypePlugins={[
                rehypeKatex
            ]}
            components={{
                code({node, inline, className, children, ...props}) {
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

                    // mermaid 다이어그램 처리
                    if (match?.[1] === 'mermaid') {
                        const [mermaidSvg, setMermaidSvg] = useState<string>('');
                        const showCode = match?.[2]?.includes('!code');
                        
                        useEffect(() => {
                            if (!showCode) {
                                const renderDiagram = async () => {
                                    try {
                                        const { svg } = await mermaid.render(
                                            'mermaid-' + Math.random().toString(36).substr(2, 9),
                                            String(children).trim()
                                        );
                                        setMermaidSvg(svg);
                                    } catch (error) {
                                        console.error('Mermaid rendering failed:', error);
                                    }
                                };
                                
                                renderDiagram();
                            }
                        }, [children, showCode]);

                        if (showCode) {
                            return (
                                <div className="code-block-container">
                                    <div className="code-block-header">
                                        <div className="header-left">
                                            <div className="window-controls">
                                                <span className="control close"></span>
                                                <span className="control minimize"></span>
                                                <span className="control maximize"></span>
                                            </div>
                                            <button 
                                                className={`copy-button ${copied ? 'copied' : ''}`}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(String(children).trim())
                                                        .then(() => {
                                                            setCopied(true);
                                                            setTimeout(() => setCopied(false), 2000);
                                                        });
                                                }}
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
                                            <div className="file-name">Mermaid Source Code</div>
                                            <div className="language-label">mermaid</div>
                                        </div>
                                    </div>
                                    <SyntaxHighlighter
                                        style={oneLight}
                                        language="mermaid"
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
                                        {...props}
                                    >
                                        {String(children).trim()}
                                    </SyntaxHighlighter>
                                </div>
                            );
                        }

                        return (
                            <div className="mermaid-diagram">
                                <div className="diagram-header">
                                    <div className="window-controls">
                                        <span className="control close"></span>
                                        <span className="control minimize"></span>
                                        <span className="control maximize"></span>
                                    </div>
                                    <div className="diagram-title">
                                        Mermaid Diagram
                                    </div>
                                </div>
                                <div className="diagram-content"
                                    dangerouslySetInnerHTML={{ __html: mermaidSvg }}
                                />
                            </div>
                        );
                    }

                    // 기존 코드 블록 처리
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
                tip: ({node, children, className, ...props}) => (
                    <div className={`callout ${className}`} {...props}>
                        <div className="callout-icon">
                            <HiLightBulb size={20} />
                        </div>
                        <div className="callout-content">{children}</div>
                    </div>
                ),
                info: ({node, children, className, ...props}) => (
                    <div className={`callout ${className}`} {...props}>
                        <div className="callout-icon">
                            <IoInformationCircle size={20} />
                        </div>
                        <div className="callout-content">{children}</div>
                    </div>
                ),
                warning: ({node, children, className, ...props}) => (
                    <div className={`callout ${className}`} {...props}>
                        <div className="callout-icon">
                            <BiSolidError size={20} />
                        </div>
                        <div className="callout-content">{children}</div>
                    </div>
                ),
                danger: ({node, children, className, ...props}) => (
                    <div className={`callout ${className}`} {...props}>
                        <div className="callout-icon">
                            <MdDangerous size={20} />
                        </div>
                        <div className="callout-content">{children}</div>
                    </div>
                ),
                a: ({node, children, href, ...props}) => {
                    const text = String(children);
                    
                    const downloadMatch = text.match(/^!download\s+(.+)$/);
                    const docsMatch = text.match(/^!docs\s+(.+)$/);
                    const userMatch = text.match(/^!user\s+(.+)$/);
                    
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

                    if (docsMatch) {
                        return (
                            <a 
                                href={href} 
                                className="docs-link" 
                                target="_blank"
                                rel="noopener noreferrer"
                                {...props}
                            >
                                <HiDocument className="docs-icon" />
                                <span>{docsMatch[1]}</span>
                            </a>
                        );
                    }

                    if (userMatch && href) {
                        let domain;
                        try {
                            domain = new URL(href).hostname;
                        } catch (e) {
                            domain = href;
                        }

                        return (
                            <a 
                                href={href} 
                                className="user-link" 
                                target="_blank"
                                rel="noopener noreferrer"
                                {...props}
                            >
                                <img 
                                    src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
                                    alt=""
                                    className="favicon-icon"
                                />
                                <span>{userMatch[1]}</span>
                            </a>
                        );
                    }
                    
                    return (
                        <a href={href} {...props}>
                            {children}
                        </a>
                    );
                },
                img: ({node, ...props}) => {
                    const altText = props.alt || '';
                    
                    const widthMatch = altText.match(/!width=(\d+)\s*/);
                    const hasShadow = altText.includes('!shadow');
                    const alignMatch = altText.match(/!align=(left|center|right)\s*/);
                    const hideCaption = altText.includes('!nocap');
                    
                    const cleanAltText = altText
                        .replace(/!width=\d+\s*/, '')
                        .replace(/!align=(left|center|right)\s*/, '')
                        .replace('!shadow', '')
                        .replace('!nocap', '')
                        .trim();
                    
                    const image = (
                        <img
                            {...props}
                            alt={cleanAltText}
                            className={`${hasShadow ? 'shadow' : ''} ${alignMatch ? `align-${alignMatch[1]}` : ''}`}
                            style={{
                                ...(widthMatch && { width: `${widthMatch[1]}px` })
                            }}
                        />
                    );

                    if (!cleanAltText || hideCaption) {
                        return (
                            <span className={`image-wrapper ${alignMatch ? `align-${alignMatch[1]}` : ''}`}>
                                {image}
                            </span>
                        );
                    }

                    return (
                        <span className={`image-wrapper ${alignMatch ? `align-${alignMatch[1]}` : ''}`}>
                            {image}
                            <span className="image-caption">{cleanAltText}</span>
                        </span>
                    );
                },
                div: ({node, children, ...props}) => {
                    if (props.className === 'details-wrapper') {
                        return (
                            <Details summary={props['data-summary']}>
                                {children}
                            </Details>
                        );
                    }
                    
                    if (props.className?.startsWith('callout callout-')) {
                        const type = props.className.replace('callout callout-', '');
                        const icons = {
                            tip: <HiLightBulb className="callout-icon" />,
                            info: <IoInformationCircle className="callout-icon" />,
                            warning: <BiSolidError className="callout-icon" />,
                            danger: <MdDangerous className="callout-icon" />
                        };

                        return (
                            <div className={props.className}>
                                {icons[type as keyof typeof icons]}
                                <div className="callout-content">
                                    {children}
                                </div>
                            </div>
                        );
                    }

                    return <div {...props}>{children}</div>;
                },
            }}
        >
            {content}
        </ReactMarkdown>
    );
};

export default MarkdownRenderer;
