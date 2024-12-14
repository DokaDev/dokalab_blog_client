import { usePageTitle } from "../../hooks/usePageTitle";

const Main: React.FC = () => {
    usePageTitle("Main Page");
    return <div>Main Page</div>;
};

export default Main;
