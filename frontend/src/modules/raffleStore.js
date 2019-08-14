import raffleService from "../services/raffleService.js";

export default {
    state: {
        raffles: [],
        currItem: null
    },
    getters: {

        getRaffles: state => state.raffles,

        getCurrItem: state => state.currItem,
    },

    mutations: {
        loadRaffles: (state, raffles) => state.raffles = raffles.sort((a, b) => {
            return b.created - a.created
        }),

        addRaffle: (state, newRaffle) => state.raffles.unshift(newRaffle),

        updateFiltered: (state, filtered) => state.raffles = filtered,

        setRaffleById: (state, raffle) => state.currItem = raffle,

        //doJoin: (state, userId) => state.currItem.members.push({id: userId}),

        delRaffle: (state, id) => state.raffles.splice(state.raffles.findIndex(raffle => raffle._id === id), 1),

        getRaffleById: (state, id) => state.currItem = state.raffles.find((raffle) => raffle._id === id),

        editRaffle: (state, newRaffle) => {
            state.raffles.splice(state.raffles.findIndex(raffle => raffle._id === newRaffle._id), 1, newRaffle)
        },

        sort: (state, val) => {
            if (val === 'lowToHigh')
                state.raffles = state.raffles.sort((a, b) => {
                    return a.ticket - b.ticket
                })
            if (val === 'highToLow')
                state.raffles = state.raffles.sort((a, b) => {
                    return b.ticket - a.ticket
                })
            if (val === 'views')
                state.raffles = state.raffles.sort((a, b) => {
                    return b.views - a.views
                })
        }
    },
    actions: {
        async loadRaffles({commit}) {
            const raffles = await raffleService.query()
            commit('loadRaffles', raffles)
        },
        async delRaffle({commit}, {id}) {
            await raffleService.del(id)
            commit('delRaffle', id)
        },
        async addRaffle(context, {newRaffle}) {
            const user = context.getters.currUser
            newRaffle.owner = user._id
            await raffleService.add(newRaffle)
            context.commit('addRaffle', newRaffle)
        },
        async editRaffle({commit}, {newRaffle}) {
            await raffleService.add(newRaffle)
            commit('editRaffle', newRaffle)
        },
        async getRaffleById({commit}, {id}) {
            const raffle = await raffleService.getRaffleById(id)
            commit('setRaffleById', raffle)
        },
        async doJoin(context, {user}) {
            await raffleService.join(user, context.state.currItem._id)
                //context.commit('doJoin', user._id)
        },
        async filter({commit}, {filter}) {
            const filtered = await raffleService.filter(filter)
            commit('updateFiltered', filtered)
        }
    }
}
