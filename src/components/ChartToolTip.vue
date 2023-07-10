<template>
  <div class="flex flex-col">
    <div class="flex flex-row bg-green-500 justify-between">
      <div class="flex-shrink-0 h-6 w-6 ">
        <span class="${colorClass} h-6 w-6 rounded-full text-white text-center inline-block">${i.data.value.hit}</span>
      </div>
      <span><strong>Round ${i.data.key}</strong></span><br>
    </div>
    <div>
      <span><strong>Bets:</strong> ${i.data.value.betCount}</span><br><br>
      <span><strong>Total Won:</strong> $${i.data.value.won}</span><br>
      <span><strong>Winnings:</strong> $${i.data.value.won - i.data.value.loss}</span><br><hr>
      <span><strong>Total Bets:</strong> ${i.data.value.cumBets}</span><br>
      <span><strong>Win Percent:</strong> ${this._calculateWinPercentage(i.data.value)}%</span><br>
      <span><strong>Loss Percent:</strong> ${this._calculateLossPercentage(i.data.value)}%</span>
    </div>
  </div>
</template>
<script setup>
</script>