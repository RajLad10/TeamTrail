import { Suspense } from "react";
// import { useSelector } from "react-redux";
import { Route, Routes as ReactRouterDomRoutes, Navigate } from "react-router-dom";
import routesConfig from "./routes.config";
import Layout from "../layout";
import Loader from "../components/loaders/loader";
import { useSelector } from "react-redux";
import { RouteConstants } from "./RouteConstants";

const Common = route => (
  <Suspense fallback={<Loader />}>
    <route.component />
  </Suspense>
);

const Private = route => {
  const { component: Component } = route;

  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
};

const Public = route => {
  const { component: Component } = route;
  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  )
}

const createNestedRoutes = (routes, RouteType) => {
  return routes.map((route, i) => {
    if (!route.component) {
      throw new Error("Component must be required....");
    }
    if (route.children) {
      return (
        <Route path={route.path} key={i} element={<RouteType {...route} />}>
          {createNestedRoutes(route.children, RouteType)}
        </Route>
      );
    } else {
      return (
        <Route
          key={i}
          index={route.index}
          path={route.path}
          element={<RouteType {...route} />}
        />
      );
    }
  });
};

const Routes = () => {
  const { isAuthorize } = useSelector(state => state.auth);
  const { common, private: privateRoutes, public: publicRoutes } = routesConfig;
  return (
    <ReactRouterDomRoutes>
      {isAuthorize ? (
        <>
          <Route path="/" element={<Layout />}>
            {createNestedRoutes(common, Common)}
            {createNestedRoutes(privateRoutes, Private)}
          </Route>
          <Route path="/*" element={<Navigate to=
          {RouteConstants.home} replace />} />
        </>
      ) : (
        <>
          {createNestedRoutes(publicRoutes, Public)}
          <Route path="/*" element={<Navigate to={RouteConstants.login} replace />} />
        </>
      )}
    </ReactRouterDomRoutes>
  );
};

export default Routes;
