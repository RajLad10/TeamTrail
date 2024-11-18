import { useMemo } from "react";
import { Navigate } from "react-router-dom";
import Loader from "./loaders/loader";

const RedirectToHome = () => {
  // const location = useLocation();

  const URL = useMemo(() => {
    return "/";
  }, []);

  if (!URL) return <Loader />;

  return <Navigate to={URL} />;
};

export default RedirectToHome;
