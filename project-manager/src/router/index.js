import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/MainHome.vue'
import Projects from '../views/MainProjects.vue'
import ProjectForm from '../views/ProjectForm.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import Tasks from '../components/TaskList.vue'

const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
const isAdmin = localStorage.getItem('role') === 'admin'

const routes = [
    { path: '/', component: Home },
    {
        path: '/projects',
        component: Projects,
        beforeEnter: (to, from, next) => {
            if (!isAuthenticated) next('/')
            else next()
        }
    },
    {
        path: '/projects/new',
        component: ProjectForm,
        beforeEnter: (to, from, next) => {
            if (!isAuthenticated || !isAdmin) next('/')
            else next()
        }
    },
    {
        path: '/projects/:id',
        name: 'project-detail',
        component: ProjectDetail,
        props: true,
        children: [
            { path: 'tasks', component: Tasks },
            { path: 'edit', component: ProjectForm }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
