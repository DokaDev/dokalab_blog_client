interface CategoryGroupProps {
    id: number;
    name: string;
    description: string;

    categories: CategoryProps[];
}

interface CategoryProps {
    id: number;
    name: string;
    description: string;
    postCount: number;
    className?: string;
}