import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const ProtectedRoute = ({ children } : Props) => {
    const user = useAuthStore((state) => state.user);

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}

export default ProtectedRoute;