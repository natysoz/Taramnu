<template>
    <section>
        <the-sub-nav/>
        <div class="section-header">
            <h2>About us</h2>
        </div>
        <page-separator/>

        <div class="who-weare">
            <div class="user">
                <div>Natanel Soussana</div>
                <p>Hello my name is Natanel Soussana . i Was 3D artist over the past 10 years and now Im looking to
                    learn
                    some new skills in the field of Front end and Back end Development the main langs that make me so
                    interest working in this industry are HTML5 CSS3 JavaScript Angular React and NodeJS , i already
                    know
                    how to program Games with Unity3d && C#
                </p>
            </div>

            <div class="user">
                <div>Ido Ronen</div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>
    </section>
</template>

<script>
    import TheSubNav from '../components/Navigators/TheSubNav'
    import PageSeparator from '../components/General/PageSeparator'

    export default {
        name: 'about',
        created() {
        },
        methods: {},
        components: {TheSubNav, PageSeparator}
    };
</script>

<style lang="scss" scoped>
    @import "../styles/components/about-page.scss";
</style>
