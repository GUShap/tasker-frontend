<script>
// CommitChart.js
import { Doughnut } from 'vue-chartjs'
 
export default {
  extends: Doughnut,
  prop :[],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.toyLabels,
      datasets: [
        {
          label: 'Amount of Toys',
          backgroundColor: ['#79f479','#f47979','#7979f4'] ,
          data: this.counts
        }
      ]
    })
  },
data () {
    return {
        toyLabels:["On wheels", "Box game", "Art"],
        counts : [23,30,40]
    }
}

}
</script>

<style scoped>

</style>