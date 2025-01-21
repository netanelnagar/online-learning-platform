import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/app/store";

interface IProtected {
    children?: React.ReactNode;
}
export const ProtectedRoute = ({ children }: IProtected) => {
    const { isAuthenticated } = useAppSelector(store => store.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return children;
}
export const AuthenticatedUser = ({ children }: IProtected) => {
    const { isAuthenticated } = useAppSelector(store => store.auth);

    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    return children;
}

export const AdminRoute = ({ children }: IProtected) => {
    const { user, isAuthenticated } = useAppSelector(store => store.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    if (user?.role !== "admin") {
        return <Navigate to="/" />
    }

    return children;
}