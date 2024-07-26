const Layout = ({ children }) => {
    return (
        <div className="flex flex-col  bg-custom-bg w-full min-h-screen m-0 fixed">
            {children}
        </div>
    );
};

export default Layout;