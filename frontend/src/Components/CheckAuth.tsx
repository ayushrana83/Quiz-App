import React, { ReactNode } from 'react';
import { useUser } from '../Context/UserContext';
import { Navigate } from 'react-router-dom'; // If using React Router

interface AuthProps {
    children: ReactNode;
}

const CheckAuth: React.FC<AuthProps> = ({ children }) => {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/login" replace />; // Redirect unauthenticated users
    }

    return <>{children}</>;
};

export default CheckAuth;
