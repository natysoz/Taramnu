<template>
    <section>
        <TheSubNav/>
        <div class="page-container">
            <div class="title">
                <h1>How It Works?</h1>
            </div>
            <page-separator/>
            <div class="page-cont">
                <div class="row">
                    <h2>Pay for a ticket</h2>
                    <div><img src="../assets/img/how/1.jpg" alt=""></div>
                </div>
                <div class="row">
                    <h2>Get in a raffle</h2>
                    <div><img src="../assets/img/how/RaffleBowl.jpg" alt=""></div>
                </div>
                <div class="row">
                    <h2>Your money goes to charity</h2>
                    <div class="image-container"><img src="../assets/img/how/3.jpg" alt=""></div>
                </div>
                <div class="title">
                    <h1>You won? Great!</h1>
                </div>
                <div class="row-last">
                    <h3>Didnt? You made the world a better place :)</h3>
                    <div><img src="../assets/img/header/header_sip.jpg" alt=""></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import TheSubNav from '../components/Navigators/TheSubNav'
    import PageSeparator from '../components/General/PageSeparator'

    export default {
        name: "Contact",
        components: {
            TheSubNav, PageSeparator
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/components/faq-page";
</style>
