<template>
    <div class="flex-row-center">
        <div class="flex-left">
            <div class="brand-logo">
                <router-link to="/">
                    <img class="logo" src="../../assets/img/logo.svg" width="32" height="32"/>
                    <h1>TARAMNU</h1>
                </router-link>
            </div>
        </div>
        <div class="bars" @click="openMenu"><i class="fas fa-bars"></i></div>

        <div class="col flex-right">
            <li class="profile-area">
                <router-link to="/raffle/browse/" exact class="col bar-item">
                    <div>Raffles</div>
                </router-link>
                <router-link v-if="currUser" to="/raffle/create/" exact class="col bar-item">
                    <div>Add Raffle</div>
                </router-link>
                <router-link to="/about" class="col bar-item">
                    <div>About</div>
                </router-link>
                <router-link to="/how" class="col bar-item">
                    <div>FAQ</div>
                </router-link>
                <router-link v-if="currUser" to="/login/" class="col bar-item">
                    <div>Dashboard</div>
                </router-link>
                <router-link v-if="!currUser" to="/login/" class="col bar-item">
                    <div>Sign up</div>
                </router-link>
            </li>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "TheSubNav",
        computed: {
            ...mapState(['menu', 'doLogout']),
            currUser() {
                return this.$store.getters.currUser
            }

        },
        methods: {
            toggleSearch() {
                this.toggleSearchMode = !this.toggleSearchMode;
            },
            logout() {
                this.$store.dispatch('doLogout')
            },
            openMenu() {
                this.$store.dispatch('toggleMobileMenu')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/components/_sub-navigator";
</style>
