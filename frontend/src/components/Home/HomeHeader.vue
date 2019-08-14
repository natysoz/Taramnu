<template>
    <header>
        <the-main-nav />
        <div class="header-title">
            <div class="main-title">
                <h2>We Reinvented Donating</h2>
                <span>Buy cheap. Make a Difference.</span>
            </div>
        </div>
    </header>
</template>

<script>
    import TheMainNav from '../../components/Navigators/TheMainNav'

    export default {
        name: "TheHeader",
        components:{TheMainNav},
        methods:{
            goBrowse(){this.$router.push('/raffle/browse')},
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/components/home-header";
</style>
