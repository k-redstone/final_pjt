import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import SimlarMovieView from '@/views/SimilarMovieView.vue'
import MovieView from '@/views/MovieView.vue'
import CommunityView from '@/views/CommunityView.vue'
import CommunityPage from '@/pages/community/CommunityPage.vue'
import CommunityCreatePage from '@/pages/community/CommunityCreatePage.vue'
import CommunityEditPage from '@/pages/community/CommunityEditPage.vue'
import CommunityDetailPage from '@/pages/community/CommunityDetailPage.vue'
import MoviePage from '@/pages/movie/MoviePage.vue'
import MovieDetailPage from '@/pages/movie/MovieDetailPage.vue'
import MainLayout from '@/layout/MainLayout.vue'
import ProfileView from '@/views/ProfileView.vue'
import LandingView from '@/views/LandingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'landing',
          component: LandingView,
        },
        {
          path: '/login',
          name: 'login',
          component: LoginView,
        },
        {
          path: '/signUp',
          name: 'signUp',
          component: SignUpView,
        },
      ],
    },
    {
      path: '/content',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'recommend',
          name: 'recommend',
          component: SimlarMovieView,
        },
        {
          path: 'profile/:username',
          name: 'profile',
          component: ProfileView,
        },
        {
          path: 'community',
          component: CommunityView,
          children: [
            {
              path: '',
              name: 'community',
              component: CommunityPage,
            },
            {
              path: 'create',
              name: 'communityCreate',
              component: CommunityCreatePage,
            },
            {
              path: ':postId/edit',
              name: 'communityEdit',
              component: CommunityEditPage,
            },
            {
              path: ':postId',
              name: 'communityDetail',
              component: CommunityDetailPage,
            },
          ],
        },

        {
          path: 'movie',
          component: MovieView,
          children: [
            {
              path: '',
              name: 'movie',
              component: MoviePage,
            },
            {
              path: ':movieId',
              name: 'movieDetail',
              component: MovieDetailPage,
            },
          ],
        },
      ],
    },
  ],
})

import { useAuthStore } from '@/stores/auth'

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  if (!store.token && to.name !== 'landing' && to.name !== 'login' && to.name !== 'signUp') {
    alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.')
    next({ name: 'login' })
  } else if (
    store.token &&
    (to.name === 'landing' || to.name === 'login' || to.name === 'signUp')
  ) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
