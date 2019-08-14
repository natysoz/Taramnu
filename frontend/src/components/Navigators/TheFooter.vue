<template>
        <div class="page-container">
            <page-separator/>

            <div class="the-social">
                <div><span>Join us on Social media!</span></div>
                <div class="social-container">
                    <div class="round-button"><i class="fab fa-facebook-f"></i></div>
                    <div class="round-button"><i class="fab fa-twitter"></i></div>
                    <div class="round-button"><i class="fab fa-linkedin-in"></i></div>
                    <div class="round-button"><i class="fab fa-pinterest-p"></i></div>
                </div>
            </div>

            <div class="safety-container">
                <div class="payments">© NSIR 2019
                    <span>Secure payment:</span>
                    <span class="payment-pp"><i class="fab fa-cc-visa"></i></span>
                    <span class="payment-pp"><i class="fab fa-cc-paypal"></i></span>
                </div>
            </div>
        </div>
</template>

<script>
    import PageSeparator from '../General/PageSeparator'
    export default {
        name: "TheFooter",
        components:{PageSeparator}
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/components/the-footer';

</style>
