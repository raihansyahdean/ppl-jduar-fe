import HomePage from "./components/HomePage.vue"
import CashierRegistrationPage from "./components/CashierRegistrationPage.vue"
import CashierLoginPage from "./components/CashierLoginPage.vue"
import IdentificationReadyPage from './components/IdentificationReadyPage.vue'
import IdentificationInstructionPage from "./components/IdentificationInstructionPage.vue"
import IdentificationPasscodePage from "./components/IdentificationPasscodePage.vue"
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
    {path: '/', component: HomePage, meta: { requiresAuth: true }},
    {path: '/cashier/registration', component: CashierRegistrationPage, meta: {hideForAuth: true}},
    {path: '/cashier/login', component: CashierLoginPage, meta: {hideForAuth: true}},
    {path: '/identification/ready', component: IdentificationReadyPage, meta: { requiresAuth: true }},
    {path: '/identification/start', component: IdentificationInstructionPage, meta: { requiresAuth: true }},
    {path: '/identification/passcode', component: IdentificationPasscodePage, meta: { requiresAuth: true }},
    {path: '/identification/fail', component: IdentificationFailPage, meta: { requiresAuth: true }},
    {path: '/identification/success', component: IdentificationSuccessPage, meta: { requiresAuth: true }},
    {path: '/registration/ready', component: RegistrationReadyPage, meta: { requiresAuth: true }},
    {path: '/registration/start', component: RegistrationInstructionPage, meta: { requiresAuth: true }},
    {path: '/registration/passcode', component: RegistrationPasscodePage, meta: { requiresAuth: true }},
    {path: '/registration/fail', component: RegistrationFailPage, meta: { requiresAuth: true }},
    {path: '/registration/success', component: RegistrationSuccessPage, meta: { requiresAuth: true }},
]

export default routes;