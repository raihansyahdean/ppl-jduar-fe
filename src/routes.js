import HelloWorld from './components/HelloWorld.vue'
import ReadyPage from './components/ReadyPage.vue'

const routes = [
    {path: '/', component: HelloWorld},
    {path: '/ready', component: ReadyPage}
]

export default routes;