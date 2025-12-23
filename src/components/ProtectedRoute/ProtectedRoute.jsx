import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, isCheckingAuth, children }) => {
	if (isCheckingAuth) return;

	return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
