<template>
    <section>
        <home-header/>
        <div class="page-container">
            <page-loader v-if="!isFetch"/>
            <div v-if="isFetch">
                <page-separator msg="Last Winners"/>
                <raffle-gallery :raffles="ended"/>
                <page-separator msg="Home Stuff"/>
                <raffle-gallery :raffles="home"/>
                <page-separator msg="Prestige Vacations"/>
                <raffle-gallery :raffles="tours"/>
                <page-separator msg="Shows"/>
                <raffle-gallery :raffles="shows"/>
                <page-separator msg="Electronics"/>
                <raffle-gallery :raffles="tech"/>
                <page-separator msg="Why do we care?"/>
                <home-reason/>
            </div>
        </div>
    </section>
</template>

<script>
    import HomeHeader from '../components/Home/HomeHeader';
    import PageSeparator from '../components/General/PageSeparator'
    import HomeReason from '../components/Home/HomeReason';
    import RaffleGallery from '../components/Raffle/RaffleGallery'
    import PageLoader from '../components/General/PageLoader'

    export default {
        name: 'home',
        data() {
            return {
                isLogged: false, isBusiness: false, isFetch: false,
                popularRaffles: [], tours: [], shows: [], tech: [], home: [], ended: []
            };
        },
        async created() {

            try {
                await this.$store.dispatch({type: "loadRaffles"});
                this.tours = this.filterBy(this.raffles, 'vacation');
                this.shows = this.filterBy(this.raffles, 'shows');
                this.tech = this.filterBy(this.raffles, 'tech');
                this.home = this.filterBy(this.raffles, 'home');
                this.ended = this.endedRaffles(this.raffles);
                this.isFetch = true;
            } catch (err) {
                this.$swal('Please Fix your net connection');
            }
        },
        computed: {
            raffles() {
                return this.$store.getters.getRaffles;
            }
        },
        methods: {
            filterBy: (raffles, category) => raffles.filter(raffle => raffle.category === category),
            endedRaffles: raffles => raffles.filter(raffle => raffle.winner)
        },
        components: {HomeReason, HomeHeader, PageSeparator, RaffleGallery, PageLoader}
    };
</script>

<style scoped lang="scss">
    @import '../styles/components/home-page';
</style>
