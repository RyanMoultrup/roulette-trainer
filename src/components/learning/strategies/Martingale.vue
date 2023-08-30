<template>
  <slide-panel :show="show">
    <div class="slider-panel h-full">
        <header class="p-5 bg-green-500 bg-gradient-to-r from-accent-150 via-green-700 to-green-800">
          <div>
            <span class="font-lobster text-3xl text-gray-300"><font-awesome-icon icon="fa-solid fa-chess-knight" /> Martingale Strategy</span>
          </div>
        </header>
        <section class="p-5 text-gray-400 h-full bg-gradient-to-tr from-0% from-accent-150 via-35% via-green-800 to-green-800">
          <h2 class="mb-4 text-2xl">Understanding the Martingale System</h2>
          <p>the Martingale System – it's one of the most well-known and straightforward strategies in the world of gambling, often associated with the elegant roulette tables. At its core, it is based on a simple principle: doubling your bet after each loss. But let's dive a bit deeper.</p>
          <p>Imagine you're standing at a roulette table, and you place a bet of $1 on black. The wheel spins, and unfortunately, it lands on red. According to the Martingale System, on your next spin, you should double your bet to $2. If you lose again, you double your bet once more to $4. This doubling continues until you eventually win.</p>
          <p>Now, why would anyone follow such a strategy? Here's the logic: the first time you win after a series of losses, you will recover all your previous losses and gain a profit equal to your original bet. In our example, even if you've lost three times in a row (losing $1, then $2, then $4), a win on the fourth bet of $8 would recover all those losses and still give you a $1 profit.</p>
          <p>Sounds promising, right? But, and this is a big "but," there are substantial risks involved. While the Martingale System seems to offer a way to eventually recover losses, you must have a considerable bankroll to support the doubling, especially during extended losing streaks. Additionally, most casinos have table limits, which means after several consecutive losses, you might hit the table's maximum bet and won't be allowed to double anymore. If that happens, the system breaks down, and you won't recover your losses.</p>
          <p>In terms of rewards, it's a mixed bag. Yes, when you eventually win, you will cover your losses. However, the risks are significant, especially considering that a long streak of losses can deplete your funds rapidly.</p>
          <p>The beauty of the Martingale, in the eyes of many gamblers, is its simplicity. There are no complex calculations or sequences to remember; you're simply doubling your bet after each loss. This ease of understanding is perhaps why it's so popular among both novice and seasoned players.</p>
          <p>In summary, the Martingale System offers a straightforward approach to betting with the potential to recover losses. However, the high risk involved means it's essential to approach this strategy with caution, a solid understanding of its limitations, and a well-defined budget.</p>
        </section>
    </div>
  </slide-panel>
</template>
<script>
import SlidePanel from "@/components/ui/SlidePanel.vue"

export default {
  components: { SlidePanel },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: '100%'
    }
  }
}
</script>

<style scoped>
.slider-panel {
  -webkit-box-shadow: -8px 0px 51px 8px rgba(0,0,0,0.58);
  -moz-box-shadow: -8px 0px 51px 8px rgba(0,0,0,0.58);
  box-shadow: -8px 0px 51px 8px rgba(0,0,0,0.58);
}

p { margin-bottom: 2em}
</style>
