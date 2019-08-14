import authService from "../services/authService.js";
import userService from "../services/userService";


export default {
    state: {
        currUser: userService.loadUserSession(),
    },

    getters: {
        currUser: state => state.currUser,
    },

    mutations: {
        logout: state => state.currUser = null,
        setUser: (state, user) => state.currUser = user,
    },

    actions: {
        async loadUsers({commit}) {
            const users = await userService.query();
            commit('loadUsers', users)
        },
        async doLogin({commit}, payload) {
            const user = await authService.login(payload);
            commit('setUser', user)
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        },
        async doLogout({commit}) {
            await authService.logout();
            commit('logout')
            sessionStorage.clear();
        },
        async doSignUp({commit}, payload) {
            try {
                const user = await authService.signup(payload);
                commit('setUser', user)
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
            } catch (err) {
                throw err
            }
        },
        async getUserById({commit}, id) {
            try {
                return await userService.getUserById(id);
            } catch (err) {
                throw err
            }

        }
    }
}
