import HelloWorld from './components/HelloWorld.vue'
import ReadyPage from './components/ReadyPage.vue'
import InstructionPage from './components/InstructionPage.vue'

const routes = [
    {path: '/', component: HelloWorld},
    {path: '/ready', component: ReadyPage},
    {path: '/start', component: InstructionPage}
]

export default routes;