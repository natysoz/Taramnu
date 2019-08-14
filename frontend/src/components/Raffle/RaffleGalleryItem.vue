<template>
    <div class="card-container">
        <div class="image-container">
            <div class="tringle">${{raffle.price}}</div>
            <img alt="error" @click="buyTicket" class="raffle-image" :src="raffle.imgPrev">
        </div>
        <div class="raffle-head">
            <div class="brand">
                <img :src="raffle.busLogo">
                <i class="fas fa-heart"></i>
                <img :src="raffle.asocLogo">
            </div>
        </div>
        <div class="separator"></div>
        <!--RUNNING RAFFLE!-->
        <div v-if="!completedRaffle">
            <div class="raffle-info">
                <div class="title">{{raffle.title}}</div>

                <div class="ticket-left">
                    <div>{{ticketsLeft}}</div>
                    <div class="rotate">
                        <i class="fas fa-ticket-alt"></i>
                    </div>
                    <div>left</div>
                </div>

                <button @click="buyTicket" v-if="!completedRaffle">
                    Ticket <span>(${{raffle.ticket}})</span>
                </button>
            </div>

        </div>
        <!--ENDED RAFFLE!-->
        <div v-else>
            <div class="raffle-info">
                <h2>Raffle Ended</h2>
                <h3>
                    <i class="fas fa-trophy"></i>
                    <h4><span>{{raffle.winnerName}}</span> payed (${{raffle.ticket}}) and Won</h4>
                </h3>

                <div class="title-end">{{raffle.title}}</div>
                <div class="separator"></div>

                <div class="total-donations">
                    <div class="donated">
                        <span>Total Donations</span>
                    </div>
                    <span>${{totalDonated}}</span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RaffleGalleryItem",
        props: ['raffle'],

        created() {
            if (this.raffle.winner) {
                this.completed = true;
                this.checkForWinner();
            }
        },

        data() {
            return {
                completed: false,
                winner: null,
            }
        },
        computed: {
            getUrl() {
                return `/raffle/${this.raffle._id}`
            },
            ticketsLeft() {
                return this.raffle.maxMembers - this.raffle.members.length;
            },
            ticketColor() {
                if (this.ticketsLeft < 10) return 'red'
                if (this.ticketsLeft > 10 && this.ticketsLeft < 20) return 'orange'
                else return '#1ccc9b'
            },
            ticketStatus() {
                if (this.ticketsLeft < 10) return 'ONLY'
                if (this.ticketsLeft > 10 && this.ticketsLeft < 20) return 'HURRY UP'
                else return ''
            },
            completedRaffle() {
                return this.completed
            },
            totalDonated() {
                return (this.raffle.ticket * this.raffle.maxMembers)
            },
            raffleWinner() {
                return this.winner;
            }


        },
        methods: {
            buyTicket() {
                window.scrollTo(0, 0);
                this.$router.push(this.getUrl);
            },
            async checkForWinner() {
                try {
                    const winnerId = this.raffle.winner
                    const winner = await this.$store.dispatch('getUserById', winnerId)
                    this.winner = winner.name
                } catch (e) {
                    this.$swal('Problem Loading Winner Name');
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../../styles/components/gallery-item';
</style>
