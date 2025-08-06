import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  isAuth: boolean;
  redirectPath: string;
}

const ProtectedRoute = ({
  children,
  isAuth,
  redirectPath,
}: ProtectedRouteProps): JSX.Element => {
  if (!isAuth) {
    return <Navigate to={redirectPath} />;
  }
  return children;
};
export default ProtectedRoute;
