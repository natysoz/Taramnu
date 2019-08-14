<template>
    <div class="separate">
        <h2>{{msg}}</h2>
        <div class="sep"></div>
    </div>
</template>

<script>
    export default {
        name: "TitleSeparator",
        props:['msg']
    }
</script>

<style scoped lang="scss">
    @import "../../styles/components/page-separator";
</style>
