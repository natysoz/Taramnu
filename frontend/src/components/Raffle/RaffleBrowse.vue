<template>
    <div>
        <raffle-header msg="Browsing Raffles"/>
        <page-loader v-if="!isFetching"/>
        <div class="browsing" v-if="isFetching">
            <raffle-filters class="raffle-filter-container"/>
            <raffle-list class="raffle-list-container" :raffles="raffles"/>
        </div>
    </div>
</template>

<script>

    import RaffleList from '../Raffle/RaffleList'
    import RaffleFilters from '../Raffle/RaffleFilters'
    import RaffleHeader from '../Raffle/RaffleHeader'
    import PageLoader from '../../components/General/PageLoader'

    export default {
        name: "RaffleBrowse",
        components: {RaffleList, RaffleFilters, RaffleHeader, PageLoader},
        computed: {
            raffles() {
                return this.$store.getters.getRaffles;
            },
            isFetching(){
                return !!this.raffles;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/components/raffle-browse";
</style>
