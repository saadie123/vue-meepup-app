import Home from "./components/Home.vue"
import Meetups from "./components/Meetup/Meetups.vue"
import CreateMeetup from "./components/Meetup/CreateMeetup.vue"
import SignIn from "./components/User/SignIn.vue"
import SignUp from "./components/User/SignUp.vue"
import Meetup from "./components/Meetup/Meetup.vue"

import AuthGuard from './auth-guard'


export const routes=[
    { path:'', name: "Home", component: Home },
    { path:'/meetups', name: "Meetups", component: Meetups },
    { path:'/meetup/new', name: "CreateMeetup", component: CreateMeetup,beforeEnter: AuthGuard},
    { path:'/meetups/:id',name:'Meetup',component: Meetup},
    { path:'/signup', name: "SignUp", component: SignUp },
    { path:'/signin', name: "SignIn", component: SignIn },
    { path: '*', redirect: '/' }
]