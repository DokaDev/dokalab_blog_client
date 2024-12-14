import { siteConfig } from '../../config/site';
import { FaGithub, FaYoutube } from 'react-icons/fa';
// import { SiBloglovin } from 'react-icons/si';
import './footer.scss';
import { MdEmail } from 'react-icons/md';

const Footer: React.FC = () => {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-left">
                    <div className="footer-logo">
                        <img src="/logo.svg" alt={siteConfig.title} />
                    </div>
                    <p className="footer-description">
                        The blog is about the technology of the developer.<br/>
                        It is an archive of various topics such as AI, web, mobile, and data.
                    </p>
                </div>
                <div className="footer-right">
                    <div className="site-links">
                        <a href="/about">About</a>
                        <a href="/posts">Blog</a>
                        <a href="/projects">Projects</a>
                        <a href="/contact">Contact</a>
                    </div>
                    <div className="social-links">
                        <a href="https://github.com/dokadev" target="_blank" rel="noopener noreferrer">
                            <FaGithub size={24} />
                        </a>
                        {/* <a href="https://velog.io/@doka33" target="_blank" rel="noopener noreferrer">
                            <SiBloglovin size={24} />
                        </a> */}
                        <a href="mailto:awesome_devnet@outlook.com" target="_blank" rel="noopener noreferrer">
                            <MdEmail size={24} />
                        </a>
                        <a href="https://youtube.com/@dokadev" target="_blank" rel="noopener noreferrer">
                            <FaYoutube size={24} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} {siteConfig.title}</p>
            </div>
        </footer>
    );
};

export default Footer;
