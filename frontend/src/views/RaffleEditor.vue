<template>
    <section class="form">
        <br>

        <div class="box">
            <span>Category:</span>
            <div class="select-cont">
                <select v-model="raffle.category">
                    <option value="home">Home</option>
                    <option value="vacation">Vacation</option>
                    <option value="shows">Shows</option>
                    <option value="tech">Tech</option>
                </select>
                <i class="fas fa-chevron-down"></i>
            </div>
        </div>

        <div class="group">
            <input type="text" required v-model="raffle.title">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Title</label>
        </div>

        <div class="group">
            <input type="text" required v-model="raffle.subtitle">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Subtitle</label>
        </div>

        <div class="group">
            <input type="number" required v-model="raffle.ticket">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Ticket Price</label>
        </div>

        <div class="group">
            <input type="number" required v-model="raffle.maxMembers">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Max Members</label>
        </div>

        <div class="group">
            <input type="text" required v-model="raffle.description[0]">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Description</label>
        </div>

        <div class="group">
            <input type="number" required v-model="raffle.price">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Price</label>
        </div>

        <div class="group">
            <input type="file" id="imgPrevInput" multiple required @change="uploadImgPrev($event)"
                   style="display:none;">
            <div>Upload Main Image</div>
            <img src="@/assets/img/raffles/upload.svg" @click="clickImg"/>
        </div>

        <div class="group">
            <input type="file" id="imgsInput" multiple required @change="uploadImgs($event)" style="display:none;">
            <div>Upload Images</div>
            <img src="@/assets/img/raffles/upload.svg" @click="clickImgs"/>
        </div>

        <button @click="addRaffle" v-if="this.isUpload" class="submit">Submit</button>
        <img src="@/assets/img/raffles/loader.gif" v-else>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                raffle: {
                    category: null,
                    title: null,
                    subtitle: null,
                    ticket: null,
                    maxMembers: null,
                    description: [],
                    by: 'Coding 2019',
                    to: 'Program INC',
                    price: null,
                    imgPrev: null,
                    imgs: []
                },
                isUpload: true
            };
        },
        async created() {
            const raffleId = this.$route.params.id
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
                    window.scroll(0, 0)
                    this.$router.push("/raffle/browse")
                }, 1000);
            },
            uploadImgs(ev, str) {
                this.isUpload = false

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
                        .catch(err => this.$swal('Your connection is slow',err));
                }
            },
            uploadImgPrev(ev) {
                this.isUpload = false

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
                        this.isUpload = true

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
    @import "../styles/components/raffle-editor";
</style>
