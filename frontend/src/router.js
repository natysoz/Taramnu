import Vue from 'vue'
import Router from 'vue-router'

//Routes
import Home from './views/Home'
import Login from './views/Login'
import About from './views/About'
import How from './views/HowItWorks'
import RaffleApp from './views/RaffleApp'
import RaffleBrowse from './components/Raffle/RaffleBrowse'
import RaffleEditor from './views/RaffleEditor'
import RaffleDetails from './views/RaffleItem'
import EasySlider from 'vue-easy-slider'

Vue.use(EasySlider)

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', name: 'home', component: Home},
        {path: '/login/', name: 'login', component: Login},
        {path: '/login/:id', name: 'loginFromItem', component: Login},
        {path: '/about', name: 'about', component: About},
        {path: '/how', name: 'how', component: How},

        {
            path: '/raffle', name: 'raffleApp', component: RaffleApp,
            children: [
                {path: '/raffle/browse', name: 'raffleBrowser', component: RaffleBrowse},
                {path: '/raffle/create', name: 'raffleEdit', component: RaffleEditor},
                {path: '/raffle/:id', name: 'raffleDetails', component: RaffleDetails},
            ]
        },
    ]
})
