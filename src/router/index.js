import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: () => import('../views/LogIn.vue')
    },
    {
      path: '/BackMain',
      name: 'BackMain',
      component: () => import('../views/BackMain.vue')
    },
    {
      path: '/BackShow',
      name: 'BackShow',
      component: () => import('../views/BackShow.vue'),
    },
    {
      path: '/Quiz',
      name: 'Quiz',
      component: () => import('../components/Quiz.vue'),
    },
    {
      path: '/Que',
      name: 'Que',
      component: () => import('../components/Que.vue'),
    },
    {
      path: '/Answer/:id',
      name: 'Answer',
      component: () => import('../components/Answer.vue'),
    },
    {
      path: '/Statistics',
      name: 'Statistics',
      component: () => import('../components/Statistics.vue'),
    },
    {
      path: '/FrontMain',
      name: 'FrontMain',
      component: () => import('../views/FrontMain.vue')
    },
    {
      path: '/ansPage/:id',// :id變數
      name: 'ansPage',
      props:true,//允許接收變數
      component: () => import('../components/ansPage.vue')
    },
    {
      path: '/AnswerView/:id',
      name: 'AnswerView',
      component: () => import('../components/AnswerView.vue'),
    },
  ]
})

export default router
