import Layout from '@/layout/Index.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/',
    children: [
      {
        path: '/',
        name: 'home',
        meta: {title: '首页', icon: 'index'},
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/test',
        name: 'test',
        meta: {title: '测试', icon: 'test'},
        component: () => import('@/views/test/Index.vue'),
      },
    ],
  },
];

export default routes;
