<template>
    <v-container>
        <v-layout row wrap class="mb-2">
          <v-flex xs12 sm6 class="text-xs-center text-sm-right">
              <v-btn class="accent--text" large router to="/meetups">Explore Meetups</v-btn>
          </v-flex>
          <v-flex xs12 sm6 class="text-xs-center text-sm-left">
              <v-btn class="accent--text" large router to="/meetup/new">Organize Meetups</v-btn>
          </v-flex>
        </v-layout>
        <v-layout row class="mt-5 mb-5" v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular indeterminate class="primary--text"
                :width="3"
                :size="70"
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row class="mt-2" v-if="!loading">
            <v-flex xs12>
            <v-carousel style="cursor:pointer">
                <v-carousel-item 
                v-for="(item,i) in meetups" 
                :src="item.imageUrl" 
                :key="item.id"
                @click="loadMeetup(item.id)">
                <div class="title">
                    {{ item.title }}
                </div>
                </v-carousel-item>
            </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2">
          <v-flex xs12 class="text-xs-center">
              <p>Join our awesome meetups</p>
          </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default{
        computed:{
            meetups(){
                return this.$store.getters.featuredMeetups
            },
            loading(){
                return this.$store.getters.getLoading
            }
        },
        methods:{
            loadMeetup(id){
                this.$router.push("/meetups/"+id);
            }
        }
    }
</script>

<style scoped>
    .title{
        position:absolute;
        bottom: 50px;
        background-color: rgba(0,0,0,0.5);
        color: white;
        font-size: 2em;
        padding:20px;

    }
</style>
