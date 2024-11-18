
import { RouteConstants } from "./RouteConstants";
import { Home, Login, OtpVerification, RedirectToHome } from "./RouterImport";

const routesConfig = {
  common: [],
  private: [
    {
      path: RouteConstants.home,
      component:Home,
    },
    { path: "/*", component: RedirectToHome },
  ],
  public: [
    {
      path: RouteConstants.login,
      component: Login,
    },
    {
      path: RouteConstants.verifyOtp,
      component: OtpVerification,
    },
  ],
};

export default routesConfig;
