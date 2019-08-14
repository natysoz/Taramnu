<template>
    <div id="app">
        <page-mobile-menu v-if="mobileMenu"/>
        <router-view @logged="onLogged"/>
        <the-footer/>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import TheMainNav from "./components/Navigators/TheMainNav";
    import TheFooter from "./components/Navigators/TheFooter";
    import PageMobileMenu from './components/General/PageMobileMenu'
    import io from 'socket.io-client'

    const BASE_URL = (process.env.NODE_ENV === 'production') ? '' : 'http://localhost:3000';
    const socket = io(BASE_URL);

    export default {
        components: {
            TheMainNav, TheFooter, PageMobileMenu
        },
        async created() {
            try {
                if (this.currUser) {
                    socket.emit('updateMe', this.currUser)
                }

                socket.on('alertResult', (object) => {
                    if (object.res === 'won') this.$swal(
                        {type: 'success',
                        title: `Congratulations ${object.name}`,
                        text: 'You are the winner!'});
                    else this.$swal(`${object.name} , You lost :(`);
                })
            } catch (err) {
                console.log('cannot get data from mongo: ', err);
            }
            await this.$store.dispatch({type: "loadRaffles"});
        },
        computed: {
            ...mapState(['menu', 'doLogout', 'user']),
            currUser() {
                return this.$store.getters.currUser
            },
            mobileMenu() {
                return this.$store.getters.menu
            }
        },
        methods: {
            async onLogged(user) {
                try {
                    await socket.emit('updateMe', user);
                } catch (e) {
                    console.log('There was a problem with your internet connection')
                }
            },
            async openMenu() {
                await this.$store.dispatch('toggleMobileMenu')
                window.scrollTo({top: 0, behavior: 'smooth'});
            },
            async logout() {
                try {
                    await this.$store.dispatch('doLogout')
                    window.scrollTo({top: 0, behavior: 'smooth'});
                } catch (e) {
                    this.$swal('Please Try Again')
                }
            }
        }
    }
</script>

<style lang="scss">
    * {margin: 0;padding: 0;}
</style>
