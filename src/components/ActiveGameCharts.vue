<template>
  <section class="charts bg-opacity-0 mx-4 mb-2">
    <div class="relative hits-card card-bg-border bg-green-700" ref="hitsChart">
      <chart-placeholder
          icon="fa-solid fa-chart-column"
          title="Numbers Hit Each Round"
          :show-placeholder="showPlaceholder"
      />
      <div id="hits-chart" class="p-4 h-full" ref="hitsChart"></div>
    </div>
    <div class="relative win-loss-bank-card card-bg-border bg-green-700">
      <chart-placeholder
        icon="fa-solid fa-chart-area"
        title="Wins Losses & Bank"
        :show-placeholder="showPlaceholder"
      />
      <div id="win-loss-chart" class="p-4 h-full" ref="winLossBankChart"></div>
    </div>
    <div class="relative win-loss-card card-bg-border bg-green-700">
      <chart-placeholder
          icon="fa-solid fa-chart-pie"
          title="Won & Lost"
          :show-placeholder="showPlaceholder"
      />
      <div id="win-loss-row-chart" class="p-4 h-full w-full" ref="winLossPieChart"></div>
    </div>
  </section>
</template>

<script>
import { redrawAll } from "dc";
import { mapGetters } from "vuex";
import HitsChart from "@/lib/charts/HitsChart.js";
import WinLossChart from "@/lib/charts/WinLossChart.js";
import WinLossBankChart from "@/lib/charts/WinLossBankChart.js";
import ChartPlaceholder from "@/components/charts/ChartPlaceholder.vue";
// import { useResizeObserver} from "@vueuse/core";
// import { debounce } from "@/lib/Utils";

export default {
  components: { ChartPlaceholder },
  data () {
    return {
      showPlaceholder: true
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

    function convertRemToPixels(rem) {
      return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    const outcomes = this.getOutcomes();

    const winLossBankChart = new WinLossBankChart();
    const winLossBankRef = this.$refs.winLossBankChart;
    winLossBankChart
        .parentHeight(winLossBankRef.clientHeight - 20)
        .parentWidth(winLossBankRef.clientWidth - 20)
        .render(outcomes);

    const winLossChart = new WinLossChart();
    winLossChart
        .parentHeight(this.$refs.winLossPieChart.clientHeight - 30)
        .parentWidth(this.$refs.winLossPieChart.clientWidth - 30)
        .render(outcomes);


    const hitsChart = new HitsChart();
    hitsChart
        .parentHeight(this.$refs.hitsChart.clientHeight - 30)
        .parentWidth(this.$refs.hitsChart.clientWidth - 40)
        .render(outcomes);

    // useResizeObserver(this.$refs.winLossBankChart, entry => {
    //   console.log('screen is resizing');
    //   const debouncer = debounce(() => {
    //     console.log('resized:::', entry);
    //     const { width, height } = entry[0].contentRect
    //
    //     console.log('width:::', width);
    //     console.log('width:::', width - convertRemToPixels(0.75) - 1);
    //     winLossBankChart.rescale(
    //         width - convertRemToPixels(0.75) - 1,
    //         height - convertRemToPixels(0.75) - 1
    //     );
    //   }, 1000);
    //   debouncer(entry);
    // })
  }
}
</script>
