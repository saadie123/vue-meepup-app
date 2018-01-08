<template>
  <v-app>
    <v-navigation-drawer temporary fixed v-model="drawer">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-list-tile-action>
            <v-icon left>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated"
        @click="onLogOut">
          <v-list-tile-action>
            <v-icon left>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Logout
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon @click.native.stop="drawer=!drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">
        <router-link to="/" tag="span" style="cursor:pointer">Meetup App</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat @click="onLogOut" v-if="userIsAuthenticated">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <transition name="slide" mode="out-in" appear>
        <router-view></router-view>
      </transition>
    </main>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
      }
    },
    computed:{
      menuItems(){
        let menu= [{ icon: "face", title: "Sign Up", link: "/signup" },
          { icon: "lock_open", title: "Sign In", link: "/signin" }]
        if(this.userIsAuthenticated){
          menu=[{ icon: "supervisor_account", title: "View Meetups", link: "/meetups" },
          { icon: "room", title: "Organize Meetups", link: "/meetup/new" }]
        }
        return menu
      },
      userIsAuthenticated(){
        return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
      }
    },
    methods:{
      onLogOut(){
        this.$store.dispatch('logOut')
        this.$router.push('/')
      }
    }
  }
</script>
<style scoped>
  .list li {
    transition: all 0.5s;
  }

  .list li:hover {
    background-color: #e4e4e4;
    cursor: pointer;
  }


  .slide-enter-active{
    animation: slideIn 300ms ease-out forwards;
  }
  .slide-leave-active{
    animation: slideOut 300ms ease-out forwards;
  }

  @keyframes slideIn {
    from {
       transform: translateX(-30px);
       opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
       transform: translateX(0);
       opacity: 1;
    }
    to {
      transform: translateX(30px);
      opacity: 0;
    }
  }
</style>


