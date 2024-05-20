import { FC, lazy, LazyExoticComponent, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import LoadingScreen from 'shared/components/LoadingScreen'
import LayoutV3 from 'layouts/layout/DashboardLayout'

const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )
}

// authentication
const Login = Loadable(
  lazy(() => import('./features/authentication/presentation/screens/login'))
)

const AuthCallback = Loadable(
  lazy(() => import('./features/authentication/presentation/screens/auth'))
)

// admin ecommerce
const TeamList = Loadable(lazy(() => import('./pages/teams')))

const TeamDetail = Loadable(lazy(() => import('./pages/teams/team-detail')))

const JobList = Loadable(lazy(() => import('./pages/jobs')))

const JobDetail = Loadable(lazy(() => import('./pages/jobs/job-detail')))

const CandiateList = Loadable(lazy(() => import('./pages/candidates/index')))

const CandiateDetail = Loadable(
  lazy(() => import('./pages/candidates/candidate-detail'))
)

const CandiateJobDetail = Loadable(
  lazy(() => import('./pages/candidatejob/candidate-job-detail'))
)

const HiringList = Loadable(lazy(() => import('./pages/hiring/index')))

const Calendars = Loadable(lazy(() => import('./pages/calendars/index')))

// 404/Error page
const Error = Loadable(lazy(() => import('./pages/404')))

const ActiveLayout = () => {
  return <LayoutV3 />
}

const routes = () => {
  return [
    ...authRoutes,
    {
      path: 'dashboard',
      element: <ActiveLayout />,
      children: dashboardRoutes,
    },
    {
      path: '*',
      element: <Error />,
    },
  ]
}

const authRoutes = [
  { path: '/', element: <Navigate to="/dashboard/teams" /> },
  { path: 'login', element: <Login /> },
  { path: '/auth/redirect', element: <AuthCallback /> },
]

const dashboardRoutes = [
  { path: 'teams', element: <TeamList /> },
  { path: 'team-detail/:id', element: <TeamDetail /> },
  { path: 'jobs', element: <JobList /> },
  { path: 'job-detail/:id', element: <JobDetail /> },
  { path: 'candidates', element: <CandiateList /> },
  { path: 'candidate-detail/:id', element: <CandiateDetail /> },
  { path: 'job-application-detail/:id', element: <CandiateJobDetail /> },
  { path: 'calendars', element: <Calendars /> },
  { path: 'hiring', element: <HiringList /> },
]

export default routes
