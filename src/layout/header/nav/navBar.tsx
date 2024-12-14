import NavItem, { NavItemProps } from "./navItems";
import './navBar.scss';
import { siteConfig } from "../../../config/site";

interface NavbarProps {
    items: NavItemProps[];  
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
    return (
        <nav className="navbar">
            <div className="logo">
                {/* <a href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748', textDecoration: 'none' }}>
                    Blog
                </a> */}
                <img src={siteConfig.logo} alt={siteConfig.title} />
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
