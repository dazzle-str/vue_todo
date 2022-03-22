import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Todo from '../views/Todo.vue'
import Data from '../views/Data.vue'
import Mine from '../views/Mine.vue'
import Time from '../views/Time.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/todo',
    children: [
      { path: '/todo', component: Todo },
      { path: '/data', component: Data },
      { path: '/mine', component: Mine }
    ]
  },
  { path: '/time/:id/:time', component: Time, props: true }
]

const router = new VueRouter({
  routes
})

export default router
