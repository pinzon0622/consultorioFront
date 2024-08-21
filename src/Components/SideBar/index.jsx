import { Sidebar } from "flowbite-react";
import {
  HiOutlineCog,
  HiOutlineChartBar,
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiLogout,
  HiOutlineIdentification,
  HiOutlineClipboardList
} from "react-icons/hi";

import { useAuth } from "../../Contexts/AuthContext";
import logo from "../../assets/logo.png";

const AdminSidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="h-screen">
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        className="fixed left-0 h-full border-r-2"
      >
        <Sidebar.Items className="relative h-full flex flex-col">
          <Sidebar.Logo href="/Admin" img={logo} imgAlt="Logo">
            Consultorio
          </Sidebar.Logo>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/Admin" icon={HiOutlineChartBar}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="/Admin/Patient" icon={HiOutlineUserGroup}>
              Pacientes
            </Sidebar.Item>
            <Sidebar.Item href="/Admin/Dentist" icon={HiOutlineIdentification}>
              Dentistas
            </Sidebar.Item>
            <Sidebar.Item href="/Admin/Date " icon ={HiOutlineCalendar}>Citas</Sidebar.Item>
            <Sidebar.Item href="/Admin/History" icon={HiOutlineClipboardList}>
              Historial Dental
            </Sidebar.Item>
            <Sidebar.Item href="/Admin/Process" icon={HiOutlineCog}>
              Procesos
            </Sidebar.Item>
            <Sidebar.Item href="" icon={HiLogout} onClick={logout}>
              Cerrar Sesión
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default AdminSidebar;
