import { useEffect, useState } from "react";
import Navbar from "./nav/navBar";
import { NavItemProps } from "./nav/navItems";
import './header.scss';

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const navItems: NavItemProps[] = [
        // { id: 1, title: "Home", link: "/" },
        { id: 2, title: "About", link: "/about" },
        { id: 3, title: "Blog", link: "/blog" },
        { id: 4, title: "Projects", link: "/projects" },
        { id: 5, title: "Contact", link: "/contact" },
    ];

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <Navbar items={navItems} />
        </header>
    );
};

export default Header;
