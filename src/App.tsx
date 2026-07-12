import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { MainLayout } from '@/layouts/MainLayout'
import { BattlePage } from '@/pages/BattlePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { BattleSkeleton } from '@/components/shared/BattleSkeleton'
import { ROUTES } from '@/constants/routes'

// The admin panel and privacy page are code-split: visitors never download
// them unless they navigate there.
const AdminPage = lazy(() =>
  import('@/pages/AdminPage').then((module) => ({ default: module.AdminPage })),
)
const PrivacyPage = lazy(() =>
  import('@/pages/PrivacyPage').then((module) => ({ default: module.PrivacyPage })),
)

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.home} element={<BattlePage />} />
        <Route
          path={ROUTES.admin}
          element={
            <Suspense fallback={<BattleSkeleton />}>
              <AdminPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.privacy}
          element={
            <Suspense fallback={<BattleSkeleton />}>
              <PrivacyPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
