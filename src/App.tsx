import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { MainLayout } from '@/layouts/MainLayout'
import { BattlePage } from '@/pages/BattlePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { BattleSkeleton } from '@/components/shared/BattleSkeleton'
import { ROUTES } from '@/constants/routes'

// The admin panel is code-split: visitors never download it.
const AdminPage = lazy(() =>
  import('@/pages/AdminPage').then((module) => ({ default: module.AdminPage })),
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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
