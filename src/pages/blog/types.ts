export interface TagProps {
    id: number;
    name: string;
}

export interface CategoryProps {
    id: number;
    name: string;
    description: string;
    postCount: number;
    className?: string;
}

export interface ArticleCategoryProps {
    id: number;
    name: string;
    group: {
        id: number;
        name: string;
    }
} 