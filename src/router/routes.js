const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
    ],
  },

  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: '', component: () => import('src/modules/dashboard/pages/DashboardPage.vue') },
      { path: '/letters', component: () => import('src/modules/letters/pages/LettersPage.vue') },
      { path: '/audit', component: () => import('src/modules/admin/pages/AuditLogsPage.vue') },
      { path: '/users', component: () => import('src/modules/admin/pages/UsersPage.vue') },
      { path: '/branches', component: () => import('src/modules/admin/pages/BranchesPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
