import './adminLayout.scss';

interface AdminLayoutProps {
    contentNode: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ contentNode }) => {
    return (
        <div className="admin-layout">
            {contentNode}
        </div>
    );
};

export default AdminLayout;
