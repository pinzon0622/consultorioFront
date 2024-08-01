import NavBar from "../NavBar";
import FooterComponent from "../Footer";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col  bg-custom-bg w-full min-h-screen m-0 fixed">
            <NavBar />
            {children}
            <FooterComponent />
        </div>
    );
};

export default Layout;