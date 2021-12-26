import {IsUser,IsSuperuser} from './Guard'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from) => {
      return !IsUser();
      // return true
    },
    children: [
      { path: '', component: () => import('pages/Auth.vue') }
    ]
  },
  {
    path: '/dash',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from) => {

      console.log(to)
      console.log(from)

      console.log("Dash");
      return IsUser();
    },
    children: [
      { path: '', component: () => import('pages/Dashboard.vue') }
    ]
  },
  {
    path: '/SuperAdmin',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from) => {
      // console.log(IsSuperuser());
      return IsSuperuser();
    },
    children: [
      { path: '', component: () => import('pages/SuperAdmin.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
