<template>
    <div class="section-header">
        <h2>{{msg}}</h2>
    </div>
</template>

<script>
    export default {
        name: "RaffleSectionHeader",
        props:['msg']
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/components/raffle-header";
</style>
