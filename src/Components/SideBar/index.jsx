import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiInbox,
  HiOutlineCalendar,
  HiTable,
  HiOutlineUserGroup,
  HiLogout,
  HiOutlineIdentification,
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
            <Sidebar.Item href="/Admin/Patient" icon={HiOutlineUserGroup}>
              Pacientes
            </Sidebar.Item>
            <Sidebar.Item href="/Admin/Dentist" icon={HiOutlineIdentification}>
              Dentistas
            </Sidebar.Item>
            <Sidebar.Item href="/Admin/Date " icon ={HiOutlineCalendar}>Citas</Sidebar.Item>
            <Sidebar.Item href="#" icon={HiChartPie}>
              Tratamientos
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiChartPie}>
              Procesos
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiInbox}>
              Historial Dental
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
