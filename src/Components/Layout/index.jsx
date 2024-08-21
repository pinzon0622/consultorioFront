import NavBar from "../NavBar";
import FooterComponent from "../Footer";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col w-full min-h-screen m-0 ">
            <NavBar />
            {children}
            <FooterComponent />
        </div>
    );
};

export default Layout;