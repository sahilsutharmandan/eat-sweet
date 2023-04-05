export default {
    namespaced: true,
    state() {
        return {
            greetings: ''
        }
    },
    mutations: {
        UPDATE_GREETING(state, payload) {
            state.greetings = payload
        }
    },
    actions: {
        SetGreeting(context) {
            const currentTime = new Date().getHours()
            if (0 <= currentTime && currentTime <= 12) {
                context.commit('UPDATE_GREETING', 'Good Morning')
            } else if (13 <= currentTime && currentTime <= 16) {
                context.commit('UPDATE_GREETING', 'Good Afternoon')
            } else if (17 <= currentTime && currentTime <= 20) {
                context.commit('UPDATE_GREETING', 'Good Evening')
            } else {

                context.commit('UPDATE_GREETING', 'Good Night')
            }
        }
    },
    getters: {
        greeting(state) {
            return state.greetings
        }
    }
}