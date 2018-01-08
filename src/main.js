import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VueRouter  from 'vue-router'
import {routes} from './routes'
import {store} from './store/index'
import dateFilter from './filters/date'
import Alert from './components/Shared/Alert.vue'
import EditMeetupDialog from './components/Meetup/Edit/EditMeetupDialog.vue'
import RegisterMeetupDialog from './components/Meetup/Registeration/RegisterMeetupDialog.vue'


Vue.use(Vuetify,{
  theme: {
    primary: '#E91E63',
    secondary: '#009688',
    accent: '#03A9F4',
    error: '#b71c1c'
  }
})

Vue.use(VueRouter);
const router=new VueRouter({
  routes:routes,
  mode:"history"
})
Vue.filter('date',dateFilter)
Vue.component('app-alert',Alert)
Vue.component('app-edit-meetup-dialog',EditMeetupDialog)
Vue.component('app-register-meetup-dialog',RegisterMeetupDialog)

new Vue({
  el: '#app',
  router:router,
  store,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: "AIzaSyCsvxh_95TGwjAufuDMXqSX2iFchPhZHEE",
      authDomain: "meetup-app-80e4c.firebaseapp.com",
      databaseURL: "https://meetup-app-80e4c.firebaseio.com",
      projectId: "meetup-app-80e4c",
      storageBucket: "meetup-app-80e4c.appspot.com"
    })
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.$store.dispatch('autoSignIn',user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch("loadMeetups")
  }
})
