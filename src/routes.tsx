import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";
import LoadingScreen from "shared/components/LoadingScreen";
import LayoutV3 from "layouts/layout/DashboardLayout";

const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};


// authentication
const Login = Loadable(lazy(() => import("./features/authentication/presentation/pages/login")));

// admin ecommerce
const TeamList = Loadable(
  lazy(() => import("./features/teams/presentation/pages/teams-list"))
);


// 404/Error page
const Error = Loadable(lazy(() => import("./pages/404")));

const ActiveLayout = () => {
  return <LayoutV3 />;
};

const routes = () => {
  return [
    ...authRoutes,
    {
      path: "dashboard",
      element: <ActiveLayout />,
      children: dashboardRoutes,
    },
    {
      path: "*",
      element: <Error />,
    },
  ];
};

const authRoutes = [
  { path: "/", element: <Navigate to="/dashboard" /> },
  { path: "login", element: <Login /> },
];

const dashboardRoutes = [
  { path: "teams", element: <TeamList /> },
];

export default routes;
