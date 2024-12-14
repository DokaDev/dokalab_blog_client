import MainRoute from "./routes/mainRoute";

interface AppProps {
    title?: string;
}

const App: React.FC<AppProps> = ({ title = "Default Title" }) => {
    return (
        <MainRoute />
    );
};

export default App;
