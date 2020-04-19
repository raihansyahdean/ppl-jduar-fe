import HomePage from "./components/HomePage.vue";
import IdentificationSuccessPage from './components/IdentificationSuccessPage.vue'
import IdentificationFailPage from './components/IdentificationFailPage.vue'
import RegistrationReadyPage from './components/RegistrationReadyPage.vue'
import RegistrationInstructionPage from './components/RegistrationInstructionPage.vue'
import RegistrationPasscodePage from './components/RegistrationPasscodePage.vue'
import RegistrationSuccessPage from './components/RegistrationSuccessPage.vue'
import RegistrationFailPage from './components/RegistrationFailPage.vue'
import NotFoundPage from './components/NotFoundPage.vue'

const routes = [
    {path: '*', component: NotFoundPage},
    {path: '/', component: HomePage},
    {path: '/identification/fail', component: IdentificationFailPage},
    {path: '/identification/success', component: IdentificationSuccessPage},
    {path: '/registration/ready', component: RegistrationReadyPage},
    {path: '/registration/start', component: RegistrationInstructionPage},
    {path: '/registration/passcode', component: RegistrationPasscodePage},
    {path: '/registration/fail', component: RegistrationFailPage},
    {path: '/registration/success', component: RegistrationSuccessPage}
]

export default routes;