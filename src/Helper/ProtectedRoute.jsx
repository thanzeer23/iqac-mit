import { Navigate } from "react-router-dom";

export const ProtectedRouter = ({ children, user }) => {
  return user ? children : <Navigate to={"/admin/login"} />;
};
