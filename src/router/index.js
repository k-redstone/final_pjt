import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import SimlarMovieView from '@/views/SimilarMovieView.vue'
import MovieView from '@/views/MovieView.vue'
import CommunityView from '@/views/CommunityView.vue'
import CommunityPage from '@/pages/community/CommunityPage.vue'
import CommunityDetailPage from '@/pages/community/CommunityDetailPage.vue'
import MoviePage from '@/pages/movie/MoviePage.vue'
import MovieDetailPage from '@/pages/movie/MovieDetailPage.vue'
import MainLayout from '@/layout/MainLayout.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/profile/:username',
          name: 'profile',
          component: ProfileView,
        },
        {
          path: '/recommend',
          name: 'recommend',
          component: SimlarMovieView,
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
        {
          path: '/community',
          component: CommunityView,
          children: [
            {
              path: '',
              name: 'community',
              component: CommunityPage,
            },
            {
              path: ':postId',
              name: 'communityDetail',
              component: CommunityDetailPage,
            },
          ],
        },

        {
          path: '/movie',
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

export default router
