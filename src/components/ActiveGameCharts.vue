<template>
  <section class="charts bg-opacity-0 mx-4 mt-4 mb-2">
<!--    <div class="hits-chart relative hits-card card-bg-border bg-green-700 overflow-hidden">-->
<!--      <chart-placeholder-->
<!--          icon="fa-solid fa-chart-column"-->
<!--          title="Numbers Hit Each Round"-->
<!--          :show-placeholder="showPlaceholder"-->
<!--      />-->
<!--      <div id="hits-chart" class="p-4 h-full" ref="hitsChart"></div>-->
<!--    </div>-->
    <base-card class="hits-cart this-round">
      <this-round-display class="relative overflow-hidden z-0 h-full" />
    </base-card>

    <base-card>
      <div class="relative win-loss-bank-card overflow-hidden flex flex-col gap-3">
        <display-stats />
        <win-loss-bank-chart class="justify-self-center" />
      </div>
    </base-card>
  </section>
</template>

<script>
import { redrawAll } from "dc";
import { mapGetters } from "vuex";
import DisplayStats from "@/components/DisplayStats.vue";
import BaseCard from "@/components/ui/Base/BaseCard.vue";
import WinLossBankChart from "@/components/charts/WinLossBankChart.vue";
import ThisRoundDisplay from "@/components/display/ThisRoundDisplay.vue";

export default {
  components: { BaseCard, ThisRoundDisplay, DisplayStats, WinLossBankChart },
  data () {
    return {
      showPlaceholder: true,
    }
  },
  methods: {
    ...mapGetters('simulation', ['getOutcomes']),
    ...mapGetters('strategy', ['getStrategy'])
  },
  mounted () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'simulation/addOutcome') {
        this.showPlaceholder = false;
        redrawAll();
      }
    })

    // const outcomes = this.getOutcomes();

    // const winLossBankChart = new WinLossBankChart();
    // const winLossBankRef = this.$refs.winLossBankChart;
    // winLossBankChart
    //     // .parentHeight(winLossBankRef.clientHeight - 20)
    //     // .parentWidth(winLossBankRef.clientWidth - 20)
    //     .parentHeight(125)
    //     .parentWidth(null)
    //     .render(outcomes);

    // const winLossChart = new WinLossChart();
    // winLossChart
    //     // .parentHeight(this.$refs.winLossPieChart.clientHeight - 30)
    //     // .parentWidth(this.$refs.winLossPieChart.clientWidth - 30)
    //     .parentHeight(100)
    //     .parentWidth(null)
    //     .render(outcomes);


    // const hitsChart = new HitsChart();
    // hitsChart
    //     .parentHeight(this.$refs.hitsChart.clientHeight - 30)
    //     .parentWidth(this.$refs.hitsChart.clientWidth - 40)
    //     .render(outcomes);

    // const debounceChartResize = chart => debounce(([{ contentRect: { width, height }}]) => chart.rescale(width, height), 300)

    // useResizeObserver(this.$refs.winLossBankChart, debounceChartResize(winLossBankChart));
    // useResizeObserver(this.$refs.hitsChart, debounceChartResize(hitsChart));
    // useResizeObserver(this.$refs.winLossPieChart, debounceChartResize(winLossChart));
  }
}
</script>
