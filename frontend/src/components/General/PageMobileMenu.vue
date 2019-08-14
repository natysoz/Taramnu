<template>
    <section class="mobile-menu">
        <div class="menu-padding">
            <div @click="openMenu" class="close"><i class="fas fa-times-circle"></i></div>
            <div class="menu-logo">
                <i class="fas fa-hands-helping"></i>
            </div>
            <page-separator class="home-separator" msg=""/>
            <router-link @click.native="openMenu" to="/">Home</router-link>
            <router-link @click.native="openMenu" to="/raffle/browse">Browse Raffles</router-link>
            <router-link @click.native="openMenu" v-if="currUser" to="/raffle/create">Add Raffle</router-link>
            <router-link @click.native="openMenu" to="/how">FAQ</router-link>
            <page-separator class="home-separator" msg=""/>
            <router-link @click.native="openMenu" to="/about">About us</router-link>
            <router-link v-if="!currUser" @click.native="openMenu" to="/login/">Sign up</router-link>
            <router-link @click.native="openMenu" v-if="currUser" to="/login">Dashboard</router-link>
        </div>

    </section>
</template>

<script>
    import PageSeparator from './PageSeparator'
    import {mapGetters} from 'vuex'

    export default {
        name: "PageMobileMenu",
        components: {PageSeparator},
        computed: {
            ...mapGetters(['currUser']),
        },
        methods: {
            async openMenu() {
                await this.$store.dispatch('toggleMobileMenu')
                window.scrollTo({top: 0, behavior: 'smooth'})
            },
            async logout() {
                try {
                    await this.$store.dispatch('doLogout')
                    window.scrollTo({top: 0, behavior: 'smooth'})
                } catch (e) {
                    this.$swal('Please Try Again')
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../styles/components/mobile-navigator";
</style>
