import HomePage from "./components/HomePage.vue";

import ReadyPage from './components/ReadyPage.vue'
import InstructionPage from './components/InstructionPage.vue'
import RegistrationSuccessPage from './components/RegistrationSuccessPage.vue'
import RegistrationFailPage from './components/RegistrationFailPage.vue'
import NotFoundPage from './components/NotFoundPage.vue'

const routes = [
    {path: '/ready', component: ReadyPage},
    {path: '/start', component: InstructionPage},
    {path: '/', component: HomePage},
    {path: '/failRegis', component: RegistrationFailPage},
    {path: '/successRegis', component: RegistrationSuccessPage},
    {path: '*', component: NotFoundPage},
]

export default routes;