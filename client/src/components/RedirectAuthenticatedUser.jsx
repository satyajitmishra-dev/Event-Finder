import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated && user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RedirectAuthenticatedUser;
