import { createRouter, createWebHistory } from 'vue-router';
import AuthLayout from '@/layouts/AuthLayout.vue';
import ReportIssue from '@/views/ReportIssue.vue';
import ChatSupport from '@/views/ChatSupport.vue';
import FAQ from '@/views/FAQ.vue';

const routes = [
  {
    path: '/',
    component: AuthLayout,
    children: [
      { path: '', redirect: '/report-issue' },
      { path: 'report-issue', component: ReportIssue },
      { path: 'chat-support', component: ChatSupport },
      { path: 'faq', component: FAQ },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
