import { Navigate } from "react-router-dom";

export const LogoutProtector = ({ children, user }) => {
  return user ? <Navigate to={"/admin/sections"} /> : children;
};
