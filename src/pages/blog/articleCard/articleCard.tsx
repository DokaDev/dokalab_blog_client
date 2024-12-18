import './articleCard.scss';
import { TagProps, ArticleCategoryProps } from '../types';
import { Link, NavLink } from 'react-router-dom';

export interface ArticleCardProps {
    id: number;
    title: string;
    description: string;
    date: string;
    readTime: string;
    tags: TagProps[];
    category: ArticleCategoryProps;
    showCategory?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
    id,
    title,
    description,
    date,
    readTime,
    tags,
    category,
    showCategory = false
}) => {
    return (
        <Link to={`/blog/article/${id}`} className="article-card-link">
            <article className="article-card">
                {showCategory && (
                    <Link 
                        to={`/blog/category/${category.id}`} 
                        className="article-category"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {category.name}
                    </Link>
                )}
                <div className="article-meta">
                    <span className="article-date">{date}</span>
                    <span className="article-read-time">{readTime}</span>
                </div>
                <h2 className="article-title">{title}</h2>
                <p className="article-description">{description}</p>
                <div className="article-tags">
                    {tags.map(tag => (
                        <NavLink 
                            key={tag.id} 
                            to={`/blog/tag/${tag.id}`}
                            className={({ isActive }) => 
                                `tag ${isActive ? 'active' : ''}`
                            }
                            onClick={(e) => e.stopPropagation()}
                        >
                            {tag.name}
                        </NavLink>
                    ))}
                </div>
            </article>
        </Link>
    );
};

export default ArticleCard; 