<template>
    <v-container>
        <v-layout row v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed="onDismissed" :message="error.message"></app-alert>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <h1 class="headline primary--text mb-3">Sign Up</h1>
                            <form @submit.prevent="onSignUp">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                        label="Email"
                                        required
                                        v-model="email"
                                        type="email"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                        label="Password"
                                        required
                                        v-model="password"
                                        type="password"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                        label="Confirm Password"
                                        required
                                        v-model="confirmPassword"
                                        type="password"
                                        :rules="[checkPassword]"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                       <v-btn class="primary" type="submit" :disabled="loading" :loading="loading">
                                           Sign Up
                                           <span slot="loader" class="custom-loader">
                                               <v-icon light>cached</v-icon>
                                           </span>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
        data(){
            return {
                email:'',
                password:'',
                confirmPassword:''
            }
        },
        computed:{
            checkPassword(){
                return this.password!==this.confirmPassword ? 'Password does not match' : ''
            },
            user(){
                return this.$store.getters.getUser
            },
            error(){
                return this.$store.getters.getError
            },
            loading(){
                return this.$store.getters.getLoading
            }
        },
        watch:{
            user(value){
                if (value!==null && value !== undefined){
                    this.$router.push('/')
                }
            }
        },
        methods:{
            onSignUp(){
                this.$store.dispatch("signUpUser",{ email: this.email,password: this.password })
            },
            onDismissed(){
                this.$store.dispatch('clearError',null)
            }
        }
    }
</script>
<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>