import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
  const token = window.localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/LogIn" />;
    }
    return children;
};

export default ProtectedRoute;