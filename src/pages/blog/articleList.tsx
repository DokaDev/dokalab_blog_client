import { useParams } from "react-router-dom";

const ArticleList: React.FC = () => {
    const { categoryId } = useParams();
    return (
        <div>
            [{categoryId}] 카테고리 컨텐츠입니다.
        </div>
    )
};

export default ArticleList;