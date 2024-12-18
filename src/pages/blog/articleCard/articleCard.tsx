import './articleCard.scss';
import { TagProps, CategoryProps } from '../types';
import { Link } from 'react-router-dom';

export interface ArticleCardProps {
    id: number;
    title: string;
    description: string;
    date: string;
    readTime: string;
    tags: TagProps[];
    category: CategoryProps;
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
                        to={`/blog/${category.id}`} 
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
                        <Link 
                            key={tag.id} 
                            to={`/blog/tag/${tag.id}`}
                            className="tag"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {tag.name}
                        </Link>
                    ))}
                </div>
            </article>
        </Link>
    );
};

export default ArticleCard; 