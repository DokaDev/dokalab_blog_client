import { NavLink } from 'react-router-dom';
import './navItem.scss';

export interface NavItemProps {
    id?: number;
    title: string;
    link: string;
}

const NavItem: React.FC<NavItemProps> = ({ title, link }) => {
    return (
        <div className="nav-item">
            <NavLink 
                to={link}
                className={({ isActive }) => isActive ? 'active' : ''}
            >
                {title}
            </NavLink>
        </div>
    );
};

export default NavItem;
