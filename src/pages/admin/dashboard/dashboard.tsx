import { Link } from 'react-router-dom';
import './dashboard.scss';

const Dashboard: React.FC = () => {
    return (
        <div className="admin-dashboard">
            <header className="dashboard-header">
                <h1>Admin Dashboard</h1>
            </header>
            <div className="dashboard-content">
                <div className="action-cards">
                    <Link to="/admin/article/edit/new" className="action-card">
                        <div className="card-icon">✏️</div>
                        <h2>New Article</h2>
                        <p>Write a new blog article</p>
                    </Link>
                    <div className="action-card">
                        <div className="card-icon">📚</div>
                        <h2>Articles</h2>
                        <p>Manage existing articles</p>
                    </div>
                    <div className="action-card">
                        <div className="card-icon">🏷️</div>
                        <h2>Categories</h2>
                        <p>Manage categories and tags</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 