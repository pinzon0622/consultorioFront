const Layout = ({ children }) => {
    return (
        <div className="flex flex-col  bg-custom-bg w-full h-svh">
            {children}
        </div>
    );
};

export default Layout;