<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3 class="mb-4">
                <h1 class="primary--text">Create New Meetup</h1>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="onCreateMeetup">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                            label="Title"
                            v-model="title"
                            required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                            v-model="location"
                            label="Location"
                            required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn raised @click="onPickFile">
                                Upload Image 
                                <v-icon right dark>cloud_upload</v-icon>
                            </v-btn>
                            <input type="file" 
                            style="display:none" 
                            ref="fileInput" 
                            accept="image/*"
                            @change="onFileChange">
                            <!-- <v-text-field
                            v-model="imageUrl"
                            label="Image URL"
                            required
                            ></v-text-field> -->
                        </v-flex>
                    </v-layout>
                    <v-layout row v-if="imageUrl">
                        <v-flex xs12 sm6 offset-sm3>
                           <img :src="imageUrl" height="200">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                            v-model="description"
                            label="Description"
                            multi-line
                            required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mb-3">
                        <v-flex xs12 sm6 offset-sm3>
                            <h2>Choose a Date and Time</h2>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3 class="mb-3">
                            <v-date-picker v-model="date"></v-date-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3 class="mb-3">
                            <v-time-picker v-model="time" format="24hr"></v-time-picker>
                            
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn class="primary" 
                            :disabled="!formIsValid"
                            type="submit">Create Meetup</v-btn>
                        </v-flex>
                    </v-layout>                 
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default{
        data(){
            return {
                title: '',
                location: '',
                imageUrl: '',
                description: '',
                date: '',
                time: new Date(),
                image: null
            }
        },
        computed:{
            formIsValid(){
                return this.title!=="" && this.location!=="" && this.imageUrl!=="" &&this.description!==""
            },
            submitableDateAndTime(){
                const date= new Date(this.date)
                if(typeof this.time==="string"){
                    const hours = this.time.match(/^(\d+)/)[1]
                    const minutes = this.time.match(/:(\d+)/)[1]
                    date.setHours(hours)
                    date.setMinutes(minutes)
                } else{
                    date.setHours(this.time.getHours())
                    date.setMinutes(this.time.getMinutes())
                }
                
                return date
            }
        },
        methods:{
            onCreateMeetup(){
                if(!this.formIsValid){
                    return
                }
                if(!this.image){
                    return
                }
                const newMeetup={
                    title:this.title,
                    location:this.location,
                    image:this.image,
                    description:this.description,
                    date:this.submitableDateAndTime
                }
                this.$store.dispatch("createMeetup",newMeetup)
                this.$router.push('/meetups')
            },
            onPickFile(){
                this.$refs.fileInput.click()
            },
            onFileChange(event){
                const files=event.target.files
                let filename=files[0].name
                if(filename.lastIndexOf('.') <= 0){
                    return aler("Please add a valid file")
                }
                const fileReader=new FileReader()
                fileReader.addEventListener('load',()=>{
                    this.imageUrl=fileReader.result
                })
                fileReader.readAsDataURL(files[0])
                this.image = files[0]
            }
        }
    }
</script>