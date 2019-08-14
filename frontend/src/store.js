import Vue from 'vue'
import Vuex from 'vuex'
import raffleStore from '../src/modules/raffleStore.js'
import userStore from '../src/modules/userStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        menu:false,
    },
    getters: {
        menu: (state) => state.menu
    },
    mutations: {
        toggleMenu: (state) => state.menu = !state.menu
    },
    actions: {
        toggleMobileMenu:({commit}) => commit('toggleMenu')},
    modules: {
        raffleStore,
        userStore
    }
})
