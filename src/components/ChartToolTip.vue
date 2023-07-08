<template>
  <span><strong>Round ${i.data.key}</strong></span><br>
  <div class="flex-shrink-0 h-6 w-6 ">
    <span class="${color} h-6 w-6 rounded-full text-white text-center inline-block">${i.data.value.hit}</span>
  </div>
  <span><strong>Bets:</strong> ${i.data.value.betCount}</span><br><br>
  <span><strong>Total Won:</strong> $${i.data.value.won}</span><br>
  <span><strong>Winnings:</strong> $${i.data.value.won - i.data.value.loss}</span><br><hr>
  <span><strong>Total Bets:</strong> ${i.data.value.cumBets}</span><br>
  <span><strong>Win Percent:</strong> ${this._calculateWinPercentage(i)}%</span><br>
  <span><strong>Loss Percent:</strong> ${this._calculateLossPercentage(i)}%</span>
</template>