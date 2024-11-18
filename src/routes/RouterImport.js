import lazy from "../utils/lazy.js"

export const RedirectToHome = lazy(() =>
  import("../components/RedirectToHome")
);

export const Home = lazy(() =>
  import("../modules/home/pages/index")
);

export const Login = lazy(() => 
  import("../modules/authentication/Login.jsx"));

export const OtpVerification = lazy(() => 
  import("../modules/authentication/OtpVerification.jsx"));