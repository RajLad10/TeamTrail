
import { Navigate } from "react-router-dom";
import { RouteConstants } from '../routes/RouteConstants'
import { useMemo } from "react";
import Loader from "./loaders/loader";

const RedirectToLogin = () => {
  const URL = useMemo(() => {
    return RouteConstants.login;
  }, []);

  if (!URL) return <Loader />;

  return <Navigate to={URL} />;
}

export default RedirectToLogin