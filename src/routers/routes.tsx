import { FC, lazy, LazyExoticComponent, Suspense } from 'react'
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import LoadingScreen from 'shared/components/LoadingScreen'
import PublicLayout from 'features/authentication/presentation/page-sections/PublicLayout'
import ProtectedLayout from 'features/authentication/presentation/page-sections/ProtectedLayout'
import { PermissionLayout } from 'features/authorization/presentation/screen-sections/PermissionLayout'

const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )
}

// authentication
const LoginPage = Loadable(lazy(() => import('../pages/auth/login')))

const AuthCallbackPage = Loadable(
  lazy(() => import('../pages/auth/authCallBack'))
)

// admin ecommerce
const TeamList = Loadable(lazy(() => import('../pages/teams')))

const TeamDetail = Loadable(lazy(() => import('../pages/teams/team-detail')))

const JobList = Loadable(lazy(() => import('../pages/jobs')))

const JobDetail = Loadable(lazy(() => import('../pages/jobs/job-detail')))

const CandidateList = Loadable(lazy(() => import('../pages/candidates/index')))

const CandidateDetail = Loadable(
  lazy(() => import('../pages/candidates/candidate-detail'))
)

const CandidateJobDetail = Loadable(
  lazy(() => import('../pages/candidatejob/candidate-job-detail'))
)

const HiringList = Loadable(lazy(() => import('../pages/hiring/index')))

const SettingList = Loadable(lazy(() => import('../pages/setting/index')))

const Calendars = Loadable(lazy(() => import('../pages/calendars/index')))

const SkillList = Loadable(lazy(() => import('../pages/skill/index')))

const RoleTemplatePage = Loadable(
  lazy(() => import('../pages/role-template/index'))
)

// 404/Error page
const Error = Loadable(lazy(() => import('../pages/404')))

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/teams" replace />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedLayout>
              <Outlet />
            </ProtectedLayout>
          }
        >
          <Route index element={<Navigate to="/dashboard/teams" replace />} />
          <Route
            path="teams"
            element={PermissionLayout({
              module: 'TEAMS',
              children: <TeamList />,
              checkBy: {
                compare: 'hasAny',
                permissions: [
                  'VIEW.everything',
                  'VIEW.teamOnly',
                  'VIEW.ownedOnly',
                ],
              },
            })}
          />
          <Route
            path="team-detail/:id"
            element={PermissionLayout({
              module: 'TEAMS',
              children: <TeamDetail />,
              checkBy: {
                compare: 'hasAny',
                permissions: [
                  'VIEW.everything',
                  'VIEW.teamOnly',
                  'VIEW.ownedOnly',
                ],
              },
            })}
          />
          <Route
            path="jobs"
            element={PermissionLayout({
              module: 'JOBS',
              children: <JobList />,
              checkBy: {
                compare: 'hasAny',
                permissions: [
                  'VIEW.everything',
                  'VIEW.teamOnly',
                  'VIEW.ownedOnly',
                ],
              },
            })}
          />
          <Route
            path="job-detail/:id"
            element={PermissionLayout({
              module: 'JOBS',
              children: <JobDetail />,
              checkBy: {
                compare: 'hasAny',
                permissions: [
                  'VIEW.everything',
                  'VIEW.teamOnly',
                  'VIEW.ownedOnly',
                ],
              },
            })}
          />
          <Route
            path="candidates"
            element={PermissionLayout({
              module: 'CANDIDATES',
              children: <CandidateList />,
              checkBy: {
                compare: 'hasAny',
                permissions: [
                  'VIEW.everything',
                  'VIEW.teamOnly',
                  'VIEW.ownedOnly',
                ],
              },
            })}
          />
          <Route
            path="candidate-detail/:id"
            element={PermissionLayout({
              module: 'CANDIDATES',
              children: <CandidateDetail />,
              checkBy: {
                compare: 'hasAny',
                permissions: [
                  'VIEW.everything',
                  'VIEW.teamOnly',
                  'VIEW.ownedOnly',
                ],
              },
            })}
          />
          <Route
            path="job-application-detail/:id"
            element={PermissionLayout({
              module: 'CANDIDATE_JOBS',
              children: <CandidateJobDetail />,
              checkBy: {
                compare: 'hasAny',
                permissions: [
                  'VIEW.everything',
                  'VIEW.teamOnly',
                  'VIEW.ownedOnly',
                ],
              },
            })}
          />
          <Route
            path="calendars"
            element={PermissionLayout({
              module: 'INTERVIEWS',
              children: <Calendars />,
              checkBy: {
                compare: 'hasAny',
                permissions: [
                  'VIEW.everything',
                  'VIEW.teamOnly',
                  'VIEW.ownedOnly',
                ],
              },
            })}
          />
          <Route
            path="hiring"
            element={PermissionLayout({
              module: 'HIRING_TEAMS',
              children: <HiringList />,
              checkBy: {
                compare: 'hasAny',
                permissions: [
                  'VIEW.everything',
                  'VIEW.teamOnly',
                  'VIEW.ownedOnly',
                ],
              },
            })}
          />
          <Route
            path="role-template"
            element={PermissionLayout({
              module: 'ROLES_TEMPLATE',
              children: <RoleTemplatePage />,
              checkBy: {
                compare: 'hasAny',
                permissions: [
                  'VIEW.everything',
                  'VIEW.teamOnly',
                  'VIEW.ownedOnly',
                ],
              },
            })}
          />
          {/* <Route path="hiring" element={<HiringList />} />
          <Route path="role-template" element={<RoleTemplatePage />} /> */}
          <Route
            path="skill"
            element={PermissionLayout({
              module: 'SKILLS',
              children: <SkillList />,
              checkBy: {
                compare: 'hasAny',
                permissions: [
                  'VIEW.everything',
                  'VIEW.teamOnly',
                  'VIEW.ownedOnly',
                ],
              },
            })}
          />
        </Route>
        <Route
          path="/auth"
          element={
            <PublicLayout>
              <Outlet />
            </PublicLayout>
          }
        >
          <Route path="login" element={<LoginPage />} />
          <Route path="redirect" element={<AuthCallbackPage />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}