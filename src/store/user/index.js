import * as firebase from 'firebase'

export default {
    state: {
        user: null
    },
    mutations: {
        registerUserForMeetup(state,payload){
            const id=payload.id
            if(state.user.registeredMeetups.findIndex(meetup=>meetup.id === id) >=0){
                return
            }
            state.user.registeredMeetups.push(id)
            state.user.fbKeys[id]=payload.fbKey
        },
        unregisterUserFromMeetup(state,payload){
            const registeredMeetups = state.user.registeredMeetups
            registeredMeetups.splice(registeredMeetups.findIndex(meetup=>meetup.id===payload,1))
            Reflect.deleteProperty(state.user.fbKeys,payload)
        },
        setUser(state,payload){
            state.user=payload
        }
    },
    actions: {
        registerUserForMeetup({commit,getters},payload){
            commit('setLoading',true)
            const user=getters.getUser
            firebase.database().ref('/users/'+user.id).child('/registerations/').push(payload)
            .then((data)=>{
                commit('setLoading',false)
                commit('registerUserForMeetup',{id:payload, fbKey:data.key})
            })
            .catch((error)=>{
                console.log(error)
                commit('setLoading',false)
            })
        },
        unregisterUserFromMeetup({commit,getters},payload){
            commit('setLoading',true)
            const user = getters.getUser
            if(!user.fbKeys)
            {
                return
            }
            const fbKey=user.fbKeys[payload]
            firebase.database().ref('/users/' + user.id + '/registerations').child(fbKey).remove()
            .then(()=>{
                commit('setLoading',false)
                commit('unregisterUserFromMeetup',payload)
            })
            .catch(error=>{
                console.log(error)
                commit('setLoading',false)
            })
        },
        signUpUser({commit},payload){
            commit('setLoading',true)
            commit('clearError',null)
            firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
            .then((user)=>{
                commit('setLoading',false)
                const newUser={
                    id: user.uid,
                    registeredMeetups:[],
                    fbKeys:{}
                }
                commit('setUser',newUser)
            })
            .catch(error=>{
                commit('setLoading',false)
                commit('setError',error)
            })
        },
        signInUser({commit},payload){
            commit('setLoading',true)
            commit('clearError',null)
            firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
            .then((user)=>{
                commit('setLoading',false)
                const newUser={
                    id: user.uid,
                    registeredMeetups:[],
                    fbKeys:{}
                }
                commit('setUser',newUser)              
            })
            .catch(error=>{
                commit('setLoading',false)
                commit('setError',error)
            })
        },
        autoSignIn({commit},payload){
            commit('setUser',{id: payload.uid,
                registeredMeetups:[],
                fbKeys:{}
            })
        },
        fetchUserData({commit,getters}){
            commit('setLoading',true)
            firebase.database().ref('/users/'+getters.getUser.id+'/registerations/').once('value')
            .then(data=>{
                const values=data.val()
                let registeredMeetups=[]
                let swappedValues={}
                for(let key in values){
                    registeredMeetups.push(values[key])
                    swappedValues[values[key]] = key
                }
                const updatedUser={
                    id: getters.getUser.id,
                    registeredMeetups: registeredMeetups,
                    fbKeys: swappedValues
                }
                commit('setLoading',false)
                commit('setUser',updatedUser)
            })
            .catch(error=>{
                console.log(error)
                commit('setLoading',false)
            })
        },
        logOut({commit}){
            firebase.auth().signOut()
            commit('setUser',null)
        },
    },
    getters: {
        getUser(state){
            return state.user
        }
    }
}