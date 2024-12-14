import { usePageTitle } from "../../hooks/usePageTitle.ts";

const About: React.FC = () => {
    usePageTitle("About");
    return <div>About Page</div>;
};

export default About;