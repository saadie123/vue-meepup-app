<template>
  <v-dialog width="350px" persistent v-model="registerDialog">
      <v-btn class='accent white--text' slot="activator">
          {{ userIsRegistered ? "Unregister" : "Register" }}
      </v-btn>
      <v-card>
          <v-container>
              <v-layout row wrap>
                  <v-flex xs12>
                      <v-card-title>
                        <h1 class="headline primary--text" v-if="userIsRegistered">Unregister From Meetup</h1>
                        <h1 class="headline primary--text" v-else>Register For Meetup</h1>
                      </v-card-title>
                  </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout row wrap>
                  <v-flex xs12>
                      <v-card-text>You can always change your decision later on. </v-card-text> 
                  </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout row wrap>
                  <v-flex xs12>
                      <v-card-actions>
                          <v-btn flat class="accent--text" @click="registerDialog=false">Cancel</v-btn>
                          <v-btn flat class="accent--text" @click="onAgree">Confirm</v-btn>
                      </v-card-actions>
                  </v-flex>
              </v-layout>
          </v-container>
      </v-card>
  </v-dialog>
</template>
<script>
    export default{
        data(){
            return {
                registerDialog: false
            }
        },
        props:['meetupId'],
       computed:{
           userIsRegistered(){
               return this.$store.getters.getUser.registeredMeetups.findIndex((meetupId)=>{
                   return meetupId===this.meetupId
               }) >=0
           }
       },
       methods:{
           onAgree(){
               if(this.userIsRegistered){
                   this.$store.dispatch('unregisterUserFromMeetup',this.meetupId)
               }else{
                   this.$store.dispatch('registerUserForMeetup',this.meetupId)
               }
           }
       }
    }
</script>
