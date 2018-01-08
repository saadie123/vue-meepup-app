import * as firebase from 'firebase'

export default {
    state: {
        loadedMeetups: [],
        featuredMeetups:[]
    },
    mutations: {
        createMeetup(state,payload){
            state.loadedMeetups.push(payload)
        },
        updateMeetup(state,payload){
            const meetup=state.loadedMeetups.find((meetup)=>{
                return meetup.id===payload.id
            })
            if(payload.title){
                meetup.title=payload.title
            }
            if(payload.description){
                meetup.description=payload.description
            }
            if(payload.date){
                meetup.date=payload.date
            }
        },
        setLoadedMeetups(state,payload){
            state.loadedMeetups=payload
        },
        setFeaturedMeetups(state,payload){
            state.featuredMeetups=payload
        }
    },
    actions: {
        loadMeetups({commit}){
            commit('setLoading',true)
            firebase.database().ref("meetups").once('value')
            .then((data)=>{
                const meetups=[]
                const obj = data.val()
                for(let key in obj){
                    meetups.push({
                        id:key,
                        title:obj[key].title,
                        description:obj[key].description,
                        imageUrl:obj[key].imageUrl,
                        location:obj[key].location,
                        date:obj[key].date,
                        creatorId:obj[key].creatorId
                    })   
                }
                commit('setLoadedMeetups',meetups)
                commit('setFeaturedMeetups',meetups.slice(0,5))
                commit('setLoading',false)
            })
            .catch((error)=>{
                commit('setLoading',false)
            })
        },
        createMeetup({commit,getters},payload){
            const meetup={
                title:payload.title,
                location:payload.location,
                description:payload.description,
                date:payload.date.toISOString(),
                creatorId:getters.getUser.id
            }
            let imageUrl
            let key
            firebase.database().ref('meetups').push(meetup)
            .then((response)=>{
                key= response.key
                return key
            })
            .then((key)=>{
                const filename=payload.image.name
                const ext =filename.slice(filename.lastIndexOf('.'))
               return firebase.storage().ref('meetups/'+key+'.'+ext).put(payload.image)
            })
            .then((fileData)=>{
                imageUrl=fileData.metadata.downloadURLs[0]
                return firebase.database().ref('meetups').child(key).update({imageUrl:imageUrl})
            })
            .then((data)=>{
                commit("createMeetup",{
                    ...meetup,
                    imageUrl:imageUrl,
                    id:key
                })
            })
            .catch((error)=>{
                console.log(error)
            })
            // Push data to firebase and store it
            
        },
        updateMeetupData({commit},payload){
            commit('setLoading',true)
            const updateObj={}
            if(payload.title){
                updateObj.title=payload.title
            }
            if(payload.description){
                updateObj.description=payload.description
            }
            firebase.database().ref('meetups').child(payload.id).update(updateObj)
            .then((data)=>{
                commit('setLoading',false)
                commit('updateMeetup',payload)
            })
            .catch((error)=>{
                console.log(error)
                commit('setLoading',false)
            })
        }
    },
    getters: {
        loadedMeetups(state){
            return state.loadedMeetups.sort((meetupA,meetupB)=>{
                return meetupA.date > meetupB.date;
            })
        },
        featuredMeetups(state){
           return state.featuredMeetups

        },
        loadedMeetup(state){
            return (meetupId)=>{
                return state.loadedMeetups.find((meetup)=>{
                    return meetup.id==meetupId
                })
            }
        },
    }
}

