public class SampleCategoryModel {
    // 정렬된 카테고리 목록
    private List<Category> categories;
}

class Category {
    private Long categoryId;
    private String categoryName;
    private Boolean isSubCategory;
}