export interface Category {
    id: number;
    name: string;
    postCount: number;
    isSubCategory: boolean;
    parentId?: number;
    // order: number;
}

export interface CategoryAndPost {
    id: number;
    name: string;
    parentName?: string;
    posts: Post[];
}

export interface Post {
    postId: number;
    postTitle: string;
    summary: string;
    postDate: string;
}

// 필요한 경우 카테고리 관련 추가 타입들도 여기서 정의할 수 있습니다
export interface CategoryResponse {
    categories: Category[];
}

// API 요청 시 사용할 수 있는 타입들
export interface CreateCategoryRequest {
    name: string;
    isSubCategory: boolean;
    parentId?: number;
    order: number;
}

export interface UpdateCategoryRequest {
    name?: string;
    isSubCategory?: boolean;
    parentId?: number;
    order?: number;
} 