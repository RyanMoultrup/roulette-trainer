<template>
  <div class="flex flex-col rounded">
    <div class="flex flex-row items-center bg-green-500 justify-center p-4">
      <div class="flex-shrink-0 h-8 w-8 ">
        <span class="${colorClass} h-8 w-8 pt-1 rounded-full text-white text-center inline-block">${i.data.value.hit}</span>
      </div>
      <span class="font-lobster text-3xl ml-2">Round ${i.data.key}</span><br>
    </div>

    <div class="px-5 pb-5 flex flex-row bg-gradient-to-tr from-green-700 via-green-800 to-green-800 border border-green-800 shadow">
      <div class="px-4 border-r border-r-green-700">
        <div class="font-lobster text-2xl text-green-500">This Round</div>
        <span class="mb-3"><strong>Bets:</strong> ${i.data.value.betCount}</span>

        <div class="flex flex-col border-b border-b-green-600">
          <div class="flex flex-row justify-between">
            <span style="color: #D49228;" class="mr-2 font-bold">${outcome.name}</span>
            <span class="mr-2 font-bold"><span class="font-normal">bet</span> $${outcome.bet}</span>
            <span class="mr-1 lowercase">${outcome.outcome}</span>
            <span class="font-bold">$${outcome.outcome === 'Won' ? outcome.won : outcome.loss}</span>
          </div>
        </div>

        <span class="font-lobster text-2xl">Total Won $${totalWon}</span>
      </div>
      <div class="border-l border-l-green-900 px-4 pb-4">
        <div class="flex flex-row items-end">
          <div class="flex flex-col">
            <div class="font-lobster text-2xl text-green-500">All Rounds</div>
            <span class="mb-3"><strong>Total Bets:</strong> ${i.data.value.cumBets}</span>
            <span><strong>Total Won:</strong> $${i.data.value.won}</span>
            <span><strong>Total Lost:</strong> $${i.data.value.loss}</span>
            <span class="mb-2"><strong>Winnings:</strong> $${i.data.value.won - i.data.value.loss}</span>
          </div>
          <div>
            <div id="tip-pie" class="text-gray-200 mt-2" style="height: 112px;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>