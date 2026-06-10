import { Navigate } from "react-router-dom";
import { useAuth } from '../context/Authcontext'

const ProtectedRoute = ({ children, adminOnly },) => {
    const { user } = useAuth()


    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (adminOnly === true) {
        return user.isAdmin === true ? children : <Navigate to="/" />
    }

    return children
}

export default ProtectedRoute