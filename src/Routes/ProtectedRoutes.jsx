import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

    if (!token) {
        return <Navigate to="/LogIn" />;
    }

    return children;
};

export default ProtectedRoute;