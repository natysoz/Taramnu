<template v-if="this.raffle">
    <section class="raffle-container">

        <div class="raffle-header">
            <div class="raffle-logos">
                <div>
                    <img :src="raffle.busLogo_big">
                </div>
                <i class="fas fa-heart"></i>
                <div>
                    <img :src="raffle.asocLogo_big">
                </div>
            </div>
        </div>

        <div class="raffle-info">

            <div class="raffle-division">
                <slider class="my-slider" animation="fade" :autoplay="false" height="385px">
                    <slider-item
                            v-for="(img, index) in raffle.imgs"
                            :key="index">
                        <img :src="img">
                    </slider-item>
                </slider>
            </div>

            <div class="raffle-division">

                <!-- RAFFLE RUNNING!-->
                <div class="raffle-details" v-if="!completedRaffle">
                    <div class="item-title">{{raffle.title}}</div>
                    <p class="item-subtitle">{{raffle.subtitle}}</p>
                    <div class="tickets-info">
                        <div class="ticket-left"
                             :style="{color:ticketColor}">
                            <span>{{ticketStatus}}</span>
                            <span v-if="(ticketsLeft>0)"> {{ticketsLeft}} </span>
                            <span> TICKETS LEFT </span>
                        </div>

                        <div class="members">
                            <div v-if="raffle.members">{{raffle.members.length}}/{{raffle.maxMembers}}</div>
                            <div v-else>0/{{raffle.maxMembers}}</div>
                            <i class="fas fa-users"></i>
                        </div>
                    </div>

                    <div class="progress">
                        <div class="finished" :style="{width:getWidth ,backgroundColor: ticketColor}"></div>
                    </div>

                    <div class="raffle-actions">
                        <button class="upper" v-if="!this.joined" @click="onJoin">Buy Ticket $({{raffle.ticket}})
                        </button>
                        <button class="upper" v-else>Pending</button>
                    </div>
                </div>

                <!-- RAFFLE ENDS!-->
                <div class="raffle-ended" v-else>
                    <div class="winner-info">
                        <h2>Raffle Ended</h2>
                        <h3>
                            <i class="fas fa-trophy"></i>
                            <h4><span>{{raffle.winnerName}}</span> pay (${{raffle.ticket}}) and Won</h4>
                        </h3>
                        <div>
                            <div class="item-title">{{raffle.title}} (${{raffle.price}})</div>
                        </div>
                    </div>

                    <div class="separator"></div>


                    <div class="total-donations">
                        <div class="donated">
                            <span>${{totalDonated}} Donated</span>
                            <i class="fas fa-hand-holding-usd"></i>
                            <img :src="raffle.asocLogo_big">
                        </div>

                    </div>
                </div>

            </div>


        </div>

        <div class="item-technical">
            <page-separator msg="Technical information"/>
            <div class="desc-container">
                <div class="item-subtitle" v-for="(desc,idx) in raffle.description" :key="idx">
                    <p>{{desc}}</p>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
    import PageSeparator from '../components/General/PageSeparator'
    import {Slider, SliderItem} from 'vue-easy-slider'

    export default {
        name: "RaffleDetails",
        components: {PageSeparator, Slider, SliderItem},
        data() {
            return {
                raffle: false,
                user: null,
                joined: false,
                ratio: 0,
                completed: false,
                winner: null,
                pooling: null,
                expired:0,
                time:0,
            }
        },


        async created() {
            //WORKING test for pooling with interval we can kill Interval on Component DESTROY or DEACTIVATED
            //or we can use websocket, open chat for each item that users enter , and update this chat users
            //with the current status of the item
            this.pollData(2000)
            this.time = Date.now()
            this.expired = this.time + (75 * 1000)

            await this.$store.dispatch({type: "getRaffleById", id: this.$route.params.id});
            this.raffle = this.$store.getters.getCurrItem;

            if (this.raffle.winner) {
                this.checkForWinner();
            }

            if (this.$store.getters.currUser) {
                this.user = this.$store.getters.currUser;
                const members = this.raffle.members;
                const idx = members.findIndex(member => member._id === this.user._id);
                if (idx !== -1) this.joined = true;
            }

        },
        computed: {
            ticketsLeft() {
                if (this.raffle.members) {
                    return this.raffle.maxMembers - this.raffle.members.length;
                }
            },
            ticketColor() {
                if (this.ticketsLeft < 6) return '#ff5a5f'
                if (this.ticketsLeft >= 6 && this.ticketsLeft <= 10) return '#ffad42'
                else return '#1ccc9b'
            },
            ticketStatus() {
                if (this.ticketsLeft < 6 && this.ticketsLeft > 0) return ' ONLY '
                else if (this.ticketsLeft >= 6 && this.ticketsLeft <= 10) return ' HURRY UP '
                else if (this.ticketsLeft <= 0 ) return ' NO '

                else return ''
            },
            getBusLogo() {
                return `${this.raffle.busLogo}`
            },
            getAsocLogo() {
                return `${this.raffle.asocLogo}`
            },
            getImg() {
                return `${this.raffle.imgPrev}`
            },
            getWidth() {
                if (this.raffle.members)
                    this.ratio = this.ticketsLeft / this.raffle.maxMembers * 100;
                return `${this.ratio}%`
            },
            completedRaffle() {
                return this.completed;
            },
            raffleWinner() {
                return this.winner;
            },
            totalDonated() {
                return (this.raffle.ticket * this.raffle.maxMembers)
            },

        },

        methods: {
            pollData(speed) {
                this.pooling = setInterval(this.checkWinnerState, speed);
            },

            checkWinnerState: async function () {
                console.log('POOLING')
                await this.$store.dispatch({type: "getRaffleById", id: this.$route.params.id})
                this.raffle = this.$store.getters.getCurrItem;
                if (this.expired <= Date.now()) clearInterval(this.pooling)
                if (this.raffle.winner ) {
                    clearInterval(this.pooling)
                    this.checkForWinner();
                }
            },

            async onJoin() {
                if (this.user) {
                    await this.$store.dispatch({type: "getRaffleById", id: this.$route.params.id})
                    this.raffle = this.$store.getters.getCurrItem;
                    if (this.raffle.members.length >= this.raffle.maxMembers) return;
                    await this.$store.dispatch({type: "doJoin", user: this.user})
                    this.raffle = this.$store.getters.getCurrItem;
                    this.joined = true;
                } else {
                    window.scroll(0, 0)
                    this.$router.push(`/login/${this.$route.params.id}`)
                }
            },
            async checkForWinner() {
                this.completed = true;
                clearInterval(this.polling)
                try {
                    const winnerId = this.raffle.winner
                    const winner = await this.$store.dispatch('getUserById', winnerId)
                    this.winner = winner.name
                } catch (e) {
                    this.$swal('Your connection is slow')
                }
            }
        },

        beforeDestroy() {
            clearInterval(this.pooling)
        },

    }
</script>

<style lang="scss" scoped>
    @import "../styles/components/raffle-item";

</style>
