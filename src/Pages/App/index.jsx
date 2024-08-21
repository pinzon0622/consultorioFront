import { useRoutes, BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../Home";
import NotFound from "../NotFound";
import About from "../About";
import Contact from "../Contact";
import Services from "../Services";
import LogIn from "../LogIn";
import Layout from "../../Components/Layout";

import AdminLayout from "../../Components/AdminLayout";
import Admin from "../Admin";
import Patient from "../Patient";
import Dentist from "../Dentist";
import Date from "../Date";
import DentalHistory from "../DentalHistory";
import Process from "../Process";


import { AuthProvider } from "../../Contexts/AuthContext";
import ProtectedRoute from "../../Routes/ProtectedRoutes";

const MainRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/About", element: <About /> },
    { path: "/Contact", element: <Contact /> },
    { path: "/Services", element: <Services /> },
    { path: "/LogIn", element: <LogIn /> },
    { path: "/*", element: <NotFound /> },
  ]);
  return routes;
};

const AdminRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Admin /> },
    { path: "Patient", element: <Patient /> },
    { path: "Dentist", element: <Dentist /> },
    { path: "Date", element: <Date /> },
    { path: "History", element: <DentalHistory /> },
    { path: "Process", element: <Process /> },
  ]);
  return routes;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/Admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminRoutes />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/*"
            element={
              <Layout>
                <MainRoutes />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
