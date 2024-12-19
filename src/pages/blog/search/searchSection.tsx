import './searchSection.scss';

interface SearchSectionProps {
    onSearch: (searchType: string, query: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const searchType = (form.querySelector('select') as HTMLSelectElement).value;
        const query = (form.querySelector('input') as HTMLInputElement).value;
        onSearch(searchType, query);
    };

    return (
        <form className="search-section" onSubmit={handleSubmit}>
            <select defaultValue="title" aria-label="Search type">
                <option value="content">Content</option>
                <option value="title">Title</option>
                <option value="both">Title & Content</option>
            </select>
            <div className="search-input-wrapper">
                <input 
                    type="text" 
                    placeholder="Search articles..."
                />
            </div>
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchSection; 