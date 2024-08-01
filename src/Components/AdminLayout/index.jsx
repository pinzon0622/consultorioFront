import AdminSidebar from "../SideBar";


const AdminLayout = ({ children }) => {
    return (
        <div className="flex flex-col md:flex-row  w-full min-h-screen m-0">
            <section className="w-full md:w-64">
                <AdminSidebar />
            </section>
            <div className="flex-grow ">
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;