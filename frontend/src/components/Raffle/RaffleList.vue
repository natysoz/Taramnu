<template>
    <div class="raffle-list">
        <raffle-gallery-item v-for="raffle in raffles" :raffle="raffle" :key="raffle._id" />
    </div>
</template>

<script>
import RaffleGalleryItem from './RaffleGalleryItem'
    export default {
        name: "RaffleList",
        props:['raffles'],
        components:{RaffleGalleryItem}
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/components/raffle-list";
</style>
