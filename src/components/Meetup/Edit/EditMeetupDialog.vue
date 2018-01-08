<template>
  <v-dialog width="350px" persistent v-model="editDialog">
      <v-btn fab class='accent white--text' slot="activator">
          <v-icon>edit</v-icon>
      </v-btn>
      <v-card>
          <v-container>
              <v-layout row wrap>
                  <v-flex xs12>
                      <v-card-title>
                        <h1 class="headline primary--text">Edit Meetup</h1>
                      </v-card-title>
                  </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout row wrap>
                  <v-flex xs12>
                      <v-card-text>
                        <v-text-field
                            v-model="editedTitle"
                            label="Title"
                            required
                            ></v-text-field>
                            <v-text-field
                            v-model="editedDescription"
                            label="Description"
                            multi-line
                            required
                            ></v-text-field>
                      </v-card-text> 
                  </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout row wrap>
                  <v-flex xs12>
                      <v-card-actions>
                          <v-btn flat class="accent--text" @click="editDialog=false">Cancel</v-btn>
                          <v-btn flat class="accent--text" @click="onSaveChanges">Save</v-btn>
                      </v-card-actions>
                  </v-flex>
              </v-layout>
          </v-container>
      </v-card>
  </v-dialog>
</template>
<script>
    export default{
        props:['meetup'],
        data(){
            return {
                editDialog:false,
                editedTitle:this.meetup.title,
                editedDescription:this.meetup.description
            }
        },
        methods:{
            onSaveChanges(){
                if(this.editedTitle.trim() === '' || this.editedDescription.trim()===''){
                    return
                }
                this.editDialog=false
                this.$store.dispatch('updateMeetupData',{
                    id:this.meetup.id,
                    title:this.editedTitle,
                    description:this.editedDescription
                    })
            }
        }
    }
</script>
