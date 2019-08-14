<template>
    <div class="filter-container">
        <div class="box">
            <span>Category:</span>
            <div>
                <select v-model="filterBy.category" @change="filter">
                    <option value="">All</option>
                    <option value="tech">Tech</option>
                    <option value="vacation">Vacations</option>
                    <option value="shows">Shows</option>
                    <option value="home">Home</option>
                </select>
                <i class="fas fa-chevron-down"></i>
            </div>
        </div>

        <div class="box">
            <span>Sort By:</span>
            <div>
                <select v-model="sortVal" @change="sort">
                    <option value="lowToHigh">Price low to high</option>
                    <option value="highToLow">Price high to low</option>
                    <option value="views">Views</option>
                </select>
                <i class="fas fa-chevron-down"></i>
            </div>
        </div>

        <div class="group">
            <input type="text" required @input="filter" v-model="filterBy.txt">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Search</label>
        </div>

        <div class="group">
            <input type="number" required @input="filter" v-model="filterBy.price">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Max Price</label>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RaffleFilters",
        data() {
            return {
                filterBy: {
                    txt: '',
                    price: null,
                    category: null,
                },
                sortVal: null
            }
        },
        methods: {
            filter() {
                this.$store.dispatch({type: 'filter', filter: this.filterBy})
            },
            sort() {
                this.$store.commit('sort', this.sortVal);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../styles/components/raffle-filters";
</style>
