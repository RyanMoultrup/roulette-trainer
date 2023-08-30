<template>
  <slide-panel :show="show">
    <div class="slider-panel h-full">
      <header class="p-5 bg-green-500 bg-gradient-to-r from-accent-150 via-green-700 to-green-800">
        <div>
          <span class="font-lobster text-3xl text-gray-300"><font-awesome-icon icon="fa-solid fa-chess-knight" /> Flat Bet Strategy</span>
        </div>
      </header>
      <section class="p-5 text-gray-400 h-full bg-gradient-to-tr from-0% from-accent-150 via-35% via-green-800 to-green-800">
        <h2 class="mb-4 text-2xl">Understanding the Flat Bet System</h2>
        <p>Certainly, flat betting in roulette is as straightforward as betting strategies come. In essence, you decide on a type of bet and a stake that you're comfortable with, and then you stick with them for every spin of the wheel. Unlike more complicated systems like the Martingale or the Fibonacci, there's no need to adjust your bet depending on whether you win or lose.</p>
        <p>When you start, you'll first choose the kind of bet you want to make. Roulette offers a variety of options, from betting on a single number to wagering on broader categories like red or black, odd or even. After picking your type of bet, you'll set the amount you want to wager. This is your stake, and it will remain the same throughout your time playing. Once the wheel spins, you place your bet and wait for the outcome. Win or lose, you will then make the same bet with the same stake on the next spin, and so on.</p>
        <p>One of the most appealing aspects of flat betting is its simplicity, which makes it an ideal choice for beginners. It's also relatively low-risk; because you're not increasing your stake after a loss or win, you don't run the risk of suddenly finding yourself in a situation where you're betting more money than you're comfortable with. This makes for easier bankroll management as well—you know exactly how much you're putting on the line because the amount doesn't change.</p>
        <p>However, the straightforwardness that makes flat betting easy to understand and low-risk is the same factor that makes it unlikely to yield huge profits. Your wins will be consistent, but they'll also be relatively small. And because you're not changing your bet when you lose, there's no strategy inherent to flat betting that helps you recover those losses. Most importantly, just like with any other betting system, flat betting does not give you an edge over the house. The casino's statistical advantage remains.</p>
        <p>If you're new to roulette, it's important to familiarize yourself with the types of bets and their respective payouts. Remember that the house always has an edge and that you should only gamble with money you're prepared to lose. And, as is the case with all forms of gambling, make sure you're primarily in it for the fun of the game.</p>
        <p>In summary, flat betting is a straightforward, low-risk way to engage with roulette. While it won't net you large winnings, it also minimizes the risk of large losses, offering a sustainable and straightforward way to enjoy the game.</p>
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
