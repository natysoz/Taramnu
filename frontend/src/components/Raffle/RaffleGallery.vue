<template>
        <div class="slider-gallery">
            <div v-for="raffle in raffles.slice(0,4)" :key="raffle._id">
                <raffle-gallery-item :raffle="raffle" :key="raffle._id"/>
            </div>
        </div>
</template>

<script>
    import RaffleGalleryItem from './RaffleGalleryItem'
    export default {
        name: "RaffleGallery",
        props: ['raffles'],
        components:{RaffleGalleryItem},
    }
</script>
<style scoped lang="scss">
    @import '../../styles/components/raffle-gallery';
</style>
