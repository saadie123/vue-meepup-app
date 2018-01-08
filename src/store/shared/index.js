export default {
    state: {
        loading:false,
        error:null
    },
    mutations: {
        setLoading(state,payload){
            state.loading=payload
        },
        setError(state,payload){
            state.error=payload
        },
        clearError(state,payload){
            state.error=payload
        },
    },
    actions: {
        clearError({commit}){
            commit('clearError')
        }
    },
    getters: {
        getLoading(state){
            return state.loading
        },
        getError(state){
            return state.error
        }
    }
}

