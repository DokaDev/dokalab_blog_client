import NavItem, { NavItemProps } from "./navItems";
import './navBar.scss';
import { siteConfig } from "../../../config/site";
import { Link } from 'react-router-dom';

interface NavbarProps {
    items: NavItemProps[];  
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">
                    <img src={siteConfig.logo} alt={siteConfig.title} />
                </Link>
            </div>
            <div className="nav-items">
                {items.map((item) => (
                    <NavItem key={item.id} {...item} />
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
