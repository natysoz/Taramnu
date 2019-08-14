<template>
    <section>
        <the-sub-nav/>
        <div class="login-container">

            <!-- {{currUser}} -->
            <div class="head-container">
                <div class="menu-logo">
                    <i class="fas fa-hands-helping"></i>
                </div>
                <h1>TARAMNU</h1>
                <h2>"Leave the world a little better than you found it"</h2>
                <span>-Robert Baden Powell</span>
            </div>

            <div class="login">

                <div class="connected" v-if="currUser">
                    <div class="logged">
                        <span>Hello {{currUser.name}}</span>
                        <button class="join-btn" @click="logout">Log out</button>
                    </div>
                </div>

                <div v-else>
                    <div class="login-area">
                        <div class="forms">
                            <!--Sign up !-->
                            <div v-if="!logBtn">
                                <form @submit.prevent="signUp">
                                    <div>
                                        <input autocomplete="off" type="text"
                                               placeholder="Enter Unique Name"
                                               v-model="user.name" required>
                                    </div>
                                    <div>
                                        <button class="submit" type="submit">Sign up</button>
                                    </div>
                                </form>
                            </div>

                            <!--Login !-->
                            <div v-if="logBtn">
                                <form @submit.prevent="loginSubmit">
                                    <input autocomplete="off" type="email" placeholder="E-Mail" v-model="email">
                                    <input autocomplete="off" type="password" placeholder="Password" v-model="password">
                                    <div>{{showErr}}</div>
                                    <button class="submit" type="submit">Login</button>
                                </form>
                            </div>


                        </div>
                    </div>

                    <div class="buttons-container">
                        <div v-if="logBtn">
                            <div>{{showErr}}</div>
                            <h2>Don't have an account?</h2>
                            <div @click="toggleSign" class="create">Create account</div>
                        </div>

                        <div v-if="!logBtn">
                            <div>{{showErr}}</div>
                            <h2>Already have an account?</h2>
                            <div @click="toggleSign" class="create">Log in</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>


    </section>
</template>
<script>
    import TheSubNav from '../components/Navigators/TheSubNav'
    import PageSeparator from '../components/General/PageSeparator'

    export default {

        mounted() {
            if (this.$route.params.id === 's') {
                this.register = false
            }
        },
        data() {
            return {
                register: false,
                connectionStatus: '',
                email: '',
                password: '',
                user: {
                    name: '',
                    password: '',
                    surname: '',
                    isBusiness: false,
                    picture: '',
                    email: '',
                    phone: '',
                    address: '',
                    about: '',
                },
                newUser: null
            }
        },
        computed: {
            currUser() {
                if (this.$store.getters.currUser) {
                    this.newUser = this.$store.getters.currUser
                }
                return this.$store.getters.currUser;
            },
            users() {
                return this.$store.getters.getUsers;
            },
            showErr() {
                return this.connectionStatus;
            },
            logBtn() {
                return this.register
            }

        },
        methods: {
            async loginSubmit() {
                try {
                    await this.$store.dispatch('doLogin', {email: this.email, password: this.password})
                    await this.$swal('Lets Go!');

                    this.$emit('logged', this.newUser);

                    if (this.$route.params.id) {
                        setTimeout(() => {
                            window.scrollTo(0, 0);
                            this.$router.push(`/raffle/${this.$route.params.id}`)
                        }, 300);
                    } else setTimeout(() => {
                        window.scrollTo(0, 0);
                        this.$router.push('/')
                    }, 300);
                } catch (err) {
                    this.connectionStatus = 'wrong Credentials';
                }
            },
            async signUp() {
                try {
                    await this.$store.dispatch('doSignUp', this.user)
                    await this.$swal('Sign Up Success!')
                    this.$emit('logged', this.newUser);
                    if (this.$route.params.id) {
                        setTimeout(() => {
                            window.scrollTo(0, 0);
                            this.$router.push(`/raffle/${this.$route.params.id}`)
                        }, 300);
                    } else setTimeout(() => {
                        window.scrollTo(0, 0);
                        this.$router.push('/')
                    }, 300);
                } catch (err) {
                    this.$swal('Error while Sign-up please try again')
                }
            },
            toggleSign() {
                this.register = !this.register;
            },

            async logout() {
                await this.$store.dispatch('doLogout')
            },
        },
        components: {
            TheSubNav, PageSeparator
        }
    }
</script>

<style scoped lang="scss">
    @import '../styles/components/login';
</style>
