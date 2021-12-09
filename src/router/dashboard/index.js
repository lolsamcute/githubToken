export default [
  {
    path: '/dashboard',
    component: () => import('src/layouts/AuthLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: () => import('src/pages/Dashboard/Dashboard.vue'),
        name: 'dashboard',
      },
    ],
  },
];
