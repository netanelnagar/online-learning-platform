import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

interface IProtected {
    children?: React.ReactNode;
}
export const ProtectedRoute = ({ children }: IProtected) => {
    const { isAuthenticated } = useSelector(store => store.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return children;
}
export const AuthenticatedUser = ({ children }: IProtected) => {
    const { isAuthenticated } = useSelector(store => store.auth);

    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    return children;
}

export const AdminRoute = ({ children }: IProtected) => {
    const { user, isAuthenticated } = useSelector(store => store.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    if (user?.role !== "instructor") {
        return <Navigate to="/" />
    }

    return children;
}