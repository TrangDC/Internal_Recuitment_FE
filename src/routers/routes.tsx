import { FC, lazy, LazyExoticComponent, ReactElement, Suspense } from 'react'
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
import DashboardLayout from 'layouts/layout/DashboardLayout'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import { checkPermissions } from 'features/authorization/domain/functions/functions'
import DoNotAllowPage from 'pages/403'
import ReportPage from 'pages/report'
import EmailPage from 'pages/email-template'

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

const UserPage = Loadable(lazy(() => import('../pages/user/index')))

const Calendars = Loadable(lazy(() => import('../pages/calendars/index')))

const SkillList = Loadable(lazy(() => import('../pages/skill/index')))

const JobPositionList = Loadable(
  lazy(() => import('../pages/job-position/index'))
)

const JobPositionDetail = Loadable(
  lazy(() => import('../pages/job-position/job-position-detail'))
)

const RoleTemplatePage = Loadable(
  lazy(() => import('../pages/role-template/index'))
)

const RecTeamDetailPage = Loadable(
  lazy(() => import('../pages/rec-team/rec-team-detail'))
)

const ApplicationPage = Loadable(
  lazy(() => import('../pages/application/index'))
)

const CreateCandidatePage = Loadable(
  lazy(() => import('../pages/candidates/create-candidate'))
)

const EditCandidatePage = Loadable(
  lazy(() => import('../pages/candidates/edit-candidate'))
)

// 404/Error page
const Error = Loadable(lazy(() => import('../pages/404')))

export const AppRoutes = () => {
  const { role } = useAuthorization()
  let skillPage: ReactElement | null = <DoNotAllowPage />
  let teamPage: ReactElement | null = <DoNotAllowPage />

  const skillView = checkPermissions({
    role,
    module: 'SKILLS',
    checkBy: {
      compare: 'hasAny',
      permissions: ['VIEW.everything', 'VIEW.ownedOnly', 'VIEW.teamOnly'],
    },
  })

  const skillTypeView = checkPermissions({
    role,
    module: 'SKILL_TYPES',
    checkBy: {
      compare: 'hasAny',
      permissions: ['VIEW.everything', 'VIEW.ownedOnly', 'VIEW.teamOnly'],
    },
  })

  const hiringTeamView = checkPermissions({
    role,
    module: 'HIRING_TEAMS',
    checkBy: {
      compare: 'hasAny',
      permissions: ['VIEW.everything', 'VIEW.ownedOnly', 'VIEW.teamOnly'],
    },
  })

  const recTeamView = checkPermissions({
    role,
    module: 'REC_TEAMS',
    checkBy: {
      compare: 'hasAny',
      permissions: ['VIEW.everything', 'VIEW.ownedOnly', 'VIEW.teamOnly'],
    },
  })
  if (skillTypeView || skillView) {
    skillPage = <DashboardLayout>{<SkillList />}</DashboardLayout>
  }

  if (hiringTeamView || recTeamView) {
    teamPage = <DashboardLayout>{<TeamList />}</DashboardLayout>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard/reports" replace />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedLayout>
              <Outlet />
            </ProtectedLayout>
          }
        >
          <Route index element={<Navigate to="/dashboard/reports" replace />} />
          <Route path="teams" element={teamPage} />
          <Route
            path="team-detail/:id"
            element={PermissionLayout({
              module: 'HIRING_TEAMS',
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
            path="users"
            element={PermissionLayout({
              module: 'USER',
              children: <UserPage />,
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
          <Route
            path="email-notification"
            element={PermissionLayout({
              module: 'EMAIL_TEMPLATE',
              children: <EmailPage />,
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
            path="job-position"
            element={PermissionLayout({
              module: 'JOB_POSITION',
              children: <JobPositionList />,
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
            path="job-position-detail/:id"
            element={PermissionLayout({
              module: 'JOB_POSITION',
              children: <JobPositionDetail />,
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
          <Route path="skill" element={skillPage} />
          <Route
            path="reports"
            element={PermissionLayout({
              module: 'REPORT',
              children: <ReportPage />,
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
            path="rec-team-detail/:id"
            element={PermissionLayout({
              module: 'REC_TEAMS',
              children: <RecTeamDetailPage />,
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
            path="application"
            element={PermissionLayout({
              module: 'REC_TEAMS',
              children: <ApplicationPage />,
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
            path="create-candidate"
            element={PermissionLayout({
              module: 'CANDIDATES',
              children: <CreateCandidatePage />,
              checkBy: {
                compare: 'hasAny',
                permissions: [
                  'CREATE.everything',
                  'CREATE.ownedOnly',
                  'CREATE.teamOnly',
                ],
              },
            })}
          />

          <Route
            path="edit-candidate/:id"
            element={PermissionLayout({
              module: 'CANDIDATES',
              children: <EditCandidatePage />,
              checkBy: {
                compare: 'hasAny',
                permissions: [
                  'EDIT.everything',
                  'EDIT.ownedOnly',
                  'EDIT.teamOnly',
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
