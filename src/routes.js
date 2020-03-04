import HomePage from "./components/HomePage.vue";

import ReadyPage from './components/ReadyPage.vue'
import InstructionPage from './components/InstructionPage.vue'

const routes = [
    {path: '/ready', component: ReadyPage},
    {path: '/start', component: InstructionPage},
    {path:'/', component: HomePage},
]

export default routes;