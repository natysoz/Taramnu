<template>
    <section>
            <TheSubNav/>
            <router-view/>
    </section>
</template>

<script>
    import TheSubNav from '../components/Navigators/TheSubNav'

    export default {
        name: "RaffleApp",
        components:{TheSubNav},
        computed:{
            raffles(){
                return this.$store.getters.getRaffles;
            }
        }
    }
</script>
