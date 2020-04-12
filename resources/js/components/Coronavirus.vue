<template>
    <div class="cov">
        <h2 class="cov-title"><b>Coronavirus!</b></h2>

        <div class="cov-card cov-blue">
            <h5 class="cov-card-title">Confirmed:</h5>
            <p class="cov-card-value">{{ confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</p>
        </div>
        <div class="cov-card cov-green">
            <h5 class="cov-card-title">Recovered:</h5>
            <p class="cov-card-value">{{ recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</p>
        </div>
        <div class="cov-card cov-red">
            <h5 class="cov-card-title">Deaths:</h5>
            <p class="cov-card-value">{{ deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</p>
        </div>

        <!-- <strong>Confirmed:</strong><br>
        <h2>{{ confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</h2><br>
        
        <strong>Recovered:</strong><br>
        <h2>{{ recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</h2><br>
        
        <strong>Deaths:</strong><br>
        <h2>{{ deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</h2><br> -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                confirmed: 0,
                recovered: 0,
                deaths: 0,
            }
        },
        async mounted() {
            const stats = await axios.get('https://api.coronatracker.com/v3/stats/worldometer/totalTrendingCases?limit=1');

            this.confirmed = stats.data[0].totalConfirmed;
            this.recovered = stats.data[0].totalRecovered;
            this.deaths = stats.data[0].totalDeaths;
        }
    }
</script>
