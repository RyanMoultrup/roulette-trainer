<template>
  <slide-panel :show="show">
    <div class="slider-panel h-full">
      <header class="p-5 bg-green-500 bg-gradient-to-r from-accent-150 via-green-700 to-green-800">
        <div>
          <span class="font-lobster text-3xl text-gray-300"><font-awesome-icon icon="fa-solid fa-chess-knight" /> Paroli Strategy</span>
        </div>
      </header>
      <section class="p-5 text-gray-400 h-full bg-gradient-to-tr from-0% from-accent-150 via-35% via-green-800 to-green-800">
        <h2 class="mb-4 text-2xl">Understanding the Paroli System</h2>
        <p>The Paroli system, often called the Reverse Martingale, is a betting strategy frequently used in games like roulette. Unlike systems that encourage raising the stake after a loss, the Paroli system advocates doubling your bet after each win. The objective is to take advantage of winning streaks, rather than attempting to recover losses.</p>
        <p>In practice, you start by picking a base stake, the initial amount you're comfortable betting. You'll also decide beforehand how many wins in a row you'll aim for before resetting back to your base stake. When you begin, you place your base stake on your chosen bet—be it a single number, red or black, odd or even, or any other bet in roulette. If you lose, you continue with the same base stake for the next round. However, if you win, you double your bet for the next spin. You continue to double your bet after each win until you reach your predetermined number of consecutive wins, at which point you go back to your original base stake and start the process over.</p>
        <p>The allure of the Paroli system is that it aims to maximize the benefit of winning streaks, while minimizing losses. If you win several bets in a row, you're using the casino's money to increase your bets, which could result in more substantial wins. If you're losing, however, your losses are limited to your base stake, making it a medium-risk strategy.</p>
        <p>On the flip side, the Paroli system doesn't guarantee anything. Winning streaks can be rare, and because the house edge remains, you're not actually changing the statistical outcome of the game. You're also running the risk of losing your winnings from the previous bets if your winning streak comes to an end.</p>
        <p>If you're new to roulette and considering the Paroli system, it's important to know your own comfort level for risk. Be sure to set both a base stake that you're comfortable with and a realistic number of consecutive wins to aim for. Remember that the casino has a built-in advantage and that no betting strategy can change that fact. Like with all forms of gambling, your primary goal should be to enjoy the game.</p>
        <p>In summary, the Paroli system is a medium-risk, medium-reward strategy that aims to capitalize on winning streaks. While it doesn't negate the house edge, it does offer a structured approach to betting that can make the game of roulette more engaging. And because it limits losses to a base stake while potentially multiplying wins during a hot streak, it can add an extra layer of excitement to the game.</p>
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
