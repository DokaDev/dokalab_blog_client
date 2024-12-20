import Editor from "./editor/editor";
import Dashboard from "./dashboard/dashboard";
import AdminLayout from "./adminLayout";
import { Route, Routes } from "react-router-dom";

const AdminRoute: React.FC = () => {
    return (
        <AdminLayout
            contentNode={
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/article/edit/:id" element={<Editor />} />
                </Routes>
            }
        />
    );
}

export default AdminRoute;