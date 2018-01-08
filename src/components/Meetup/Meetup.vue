<template>
    <v-container>
        <v-layout row wrap class="mt-5 mb-5" v-if="isLoading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular indeterminate class="primary--text"
                :width="3"
                :size="70"
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-else>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h6 class="primary--text headline">{{ meetup.title }}</h6>
                        <template v-if="true">
                            <v-spacer></v-spacer>
                            <app-edit-meetup-dialog v-if="userIsCreator" :meetup="meetup"></app-edit-meetup-dialog>
                        </template>
                    </v-card-title>
                    <v-card-media 
                    :src="meetup.imageUrl" 
                    height="400px">
                    </v-card-media>
                    <v-card-text>
                        <div class="primary--text">{{ meetup.date | date }} - {{ meetup.location }}</div>
                        <div class="mt-3">{{ meetup.description }}</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <app-register-meetup-dialog v-if="userIsAuthenticated && !userIsCreator" :meetupId="meetup.id"></app-register-meetup-dialog> 
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
        data(){
            return {
                id:this.$route.params.id
            }
        },
        computed:{
            meetup(){
                return this.$store.getters.loadedMeetup(this.id)
            },
            userIsAuthenticated(){
                return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
            },
            userIsCreator(){
                if(!this.userIsAuthenticated){
                    return false
                }
                return this.$store.getters.getUser.id === this.meetup.creatorId
            },
            isLoading(){
                return this.$store.getters.getLoading
            }
        },
    }
</script>