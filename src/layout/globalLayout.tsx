import Header from "./header/header";
import Footer from "./footer/footer";
import './globalLayout.scss';

const GlobalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="global-layout">
            <Header />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default GlobalLayout;