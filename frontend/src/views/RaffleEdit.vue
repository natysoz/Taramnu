<template>
    <section class="raffle-container">

        <div class="raffle-header">
            <div class="raffle-logos">
                <div>
                    <img src="https://res.cloudinary.com/dvvx6eoye/image/upload/v1563985479/logos/roo_big_ww3tdz.png">
                </div>
                <i class="fas fa-heart"></i>
                <div>
                    <img src="https://res.cloudinary.com/dvvx6eoye/image/upload/v1563985997/logos/tno_big_afaysr.png">
                </div>
            </div>
        </div>

        <div class="raffle-info">

            <div class="raffle-division">

                <div v-if="isUpload">
                    <img src="@/assets/img/raffles/loader.gif" alt="">
                </div>

                <div class="image-container" v-else>

                    <div class="image-container" v-if="previewImg">
                        <img :src=previewImg alt="not"/>
                    </div>

                    <div class="group" v-else>
                        <input type="file" id="imgPrevInput" multiple required @change="uploadImgPrev($event)"
                               style="display:none;">
                        <div>Upload Main Image</div>
                        <img src="@/assets/img/raffles/upload.svg" @click="clickImg"/>
                    </div>
                </div>


            </div>


            <div class="raffle-division">

                <div class="raffle-details">

                    <label>
                        <input class="item-title" placeholder="Product Name" contenteditable="true" maxlength="140">
                    </label>

                    <label>
                        <input class="item-subtitle" placeholder="Hamilton Beach (49976) FlexBrew Coffee Maker, Single Serve & Full Coffee
                            Pot, Compatible with Single-Serve Pods or Ground Coffee, Programmable, Black."
                               contenteditable="true">
                    </label>



                    <div class="tickets-info">

                        <label>Ticket Price:
                            <input type="number" placeholder="10" required v-model="raffle.ticket">
                        </label>

                        <div class="members">
                            <label>Max Participates:
                                <input type="number" placeholder="100" required v-model="raffle.maxMembers">
                            </label>
                            <div>Max Tickets</div>
                            <i class="fas fa-users"></i>
                        </div>
                    </div>


                    <div class="raffle-actions">
                        <button class="upper">Create Raffle</button>
                    </div>
                </div>

            </div>


        </div>

    </section>

</template>

<script>
    export default {
        data() {
            return {
                raffle: {
                    category: 'live',
                    title: 'Product Name',
                    subtitle: 'Enter Item Subtitle',
                    ticket: 10,
                    maxMembers: 100,
                    description: ['Product Specs can be any description you choose'],
                    by: 'Coding 2019',
                    to: 'Program INC',
                    price: 1000,
                    imgPrev: null,
                    imgs: []
                },
                isUpload: false
            };
        },
        async created() {
            const raffleId = this.$route.params.id;
            if (raffleId) {
                await this.$store.dispatch({
                    type: "getRaffleById",
                    id: raffleId
                });
                this.raffle = this.currRuffle
            }
        },
        computed: {
            currRuffle() {
                return this.$store.getters.getCurrItem;
            },
            targetPrice() {
                return this.raffle.ticket * this.raffle.maxMembers;
            },
            previewImg() {
                return this.raffle.imgPrev;
            }
        },
        methods: {
            async addRaffle() {
                let newRaffle = this.raffle;
                if (this.$route.params.id) {
                    await this.$store.dispatch({type: "editRaffle", newRaffle});
                } else await this.$store.dispatch({type: "addRaffle", newRaffle});
                this.$swal('Item Listed');

                await this.$store.dispatch({type: "loadRaffles"});
                setTimeout(() => {
                    window.scroll(0, 0);
                    this.$router.push("/raffle/browse")
                }, 1000);
            },
            uploadImgs(ev, str) {
                this.isUpload = false;

                const CLOUD_NAME = "dhift6bw6";
                const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

                let count = 0;
                for (let i = 0; i < ev.target.files.length; i++) {

                    const formData = new FormData();
                    formData.append("file", ev.target.files[i]);
                    formData.append("upload_preset", "xt3hvfjt");

                    fetch(UPLOAD_URL, {
                        method: "POST",
                        body: formData
                    })
                        .then(res => res.json())
                        .then(res => {

                            this.raffle.imgs.push(res.url);
                            count++;

                            if (count === ev.target.files.length) this.isUpload = true

                        })
                        .catch(err => console.error(error));
                }

            },
            uploadImgPrev(ev) {
                this.isUpload = true;

                const CLOUD_NAME = "dhift6bw6";
                const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

                const formData = new FormData();
                formData.append("file", ev.target.files[0]);
                formData.append("upload_preset", "xt3hvfjt");

                fetch(UPLOAD_URL, {
                    method: "POST",
                    body: formData
                })
                    .then(res => res.json())
                    .then(res => {

                        this.raffle.imgPrev = res.url;
                        this.raffle.imgs[0] = res.url;
                        this.isUpload = false

                    })
                    .catch(err => console.error(err));

            },
            clickImg() {
                document.getElementById('imgPrevInput').click()
            },
            clickImgs() {
                document.getElementById('imgsInput').click()
            }
        }
    };
</script>

<style lang="scss" scoped>


</style>
