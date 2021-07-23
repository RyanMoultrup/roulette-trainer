<!-- Secondary column (hidden on smaller screens) -->
<template>
  <aside class="hidden flex-shrink-0 overflow-x-auto lg:block lg:flex-shrink-0 lg:order-last">
    <div class="relative flex flex-col w-full border-l border-gray-200 bg-gray-100">
      <div class="">
        <div class="flex flex-col">
          <div class="overflow-x-auto">
            <div class="align-middle inline-block min-w-full">
              <div class="shadow overflow-hidden border-b border-gray-200">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                  <tr>
                    <th scope="col"
                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Round
                    </th>
                    <th scope="col"
                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bets
                    </th>
                    <th scope="col"
                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Outcome
                    </th>
                  </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-2 py-1 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-6 w-6 ">
                          <span class="h-6 w-6 rounded-full bg-red-700 p-1 text-white">13</span>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Spin 1
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Bet $200</div>
                      <div class="text-xs text-gray-500">4 bets</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        <span
                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Won
                        </span> $100
                      </div>
                      <div class="text-sm text-gray-500">
                        <span
                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Lost
                        </span> $100
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td class="px-2 py-1 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-6 w-6 ">
                          <span class="h-6 w-6 rounded-full bg-gray-700 p-1 text-white">24</span>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Spin 2
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Bet $200</div>
                      <div class="text-xs text-gray-500">4 Bets</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Won
                                </span> $0
                      </div>
                      <div class="text-sm text-gray-500">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Lost
                                </span> $200
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="px-2 py-1 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-6 w-6 ">
                          <span class="h-6 w-6 rounded-full bg-red-700 p-1 text-white">30</span>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Round: 1
                          </div>
                          <div class="text-sm text-gray-500">
                            Bets: 4
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Total Bet Amt</div>
                      <div class="text-sm text-gray-500">$200</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Won
                                </span> $100
                      </div>
                      <div class="text-sm text-gray-500">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Lost
                                </span> $100
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td class="px-2 py-1 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-6 w-6 ">
                          <span class="h-6 w-6 rounded-full bg-gray-700 p-1 text-white">14</span>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Round: 2
                          </div>
                          <div class="text-sm text-gray-500">
                            Bets: 4
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Total Bet Amt</div>
                      <div class="text-sm text-gray-500">$200</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Won
                                </span> $0
                      </div>
                      <div class="text-sm text-gray-500">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Lost
                                </span> $200
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="px-2 py-1 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-6 w-6 ">
                          <span class="h-6 w-6 rounded-full bg-gray-700 p-1 text-white">26</span>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Round: 2
                          </div>
                          <div class="text-sm text-gray-500">
                            Bets: 4
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Total Bet Amt</div>
                      <div class="text-sm text-gray-500">$200</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Won
                                </span> $0
                      </div>
                      <div class="text-sm text-gray-500">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Lost
                                </span> $200
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td class="px-2 py-1 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-6 w-6 ">
                          <span class="h-6 w-6 rounded-full bg-red-700 p-1 text-white">13</span>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Spin 1
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Bet $200</div>
                      <div class="text-xs text-gray-500">4 bets</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Won
                                </span> $100
                      </div>
                      <div class="text-sm text-gray-500">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Lost
                                </span> $100
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td class="px-2 py-1 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-6 w-6 ">
                          <span class="h-6 w-6 rounded-full bg-gray-700 p-1 text-white">24</span>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Spin 2
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Bet $200</div>
                      <div class="text-xs text-gray-500">4 Bets</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Won
                                </span> $0
                      </div>
                      <div class="text-sm text-gray-500">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Lost
                                </span> $200
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="px-2 py-1 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-6 w-6 ">
                          <span class="h-6 w-6 rounded-full bg-red-700 p-1 text-white">30</span>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Round: 1
                          </div>
                          <div class="text-sm text-gray-500">
                            Bets: 4
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Total Bet Amt</div>
                      <div class="text-sm text-gray-500">$200</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Won
                                </span> $100
                      </div>
                      <div class="text-sm text-gray-500">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Lost
                                </span> $100
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td class="px-2 py-1 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-6 w-6 ">
                          <span class="h-6 w-6 rounded-full bg-gray-700 p-1 text-white">14</span>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Round: 2
                          </div>
                          <div class="text-sm text-gray-500">
                            Bets: 4
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Total Bet Amt</div>
                      <div class="text-sm text-gray-500">$200</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Won
                                </span> $0
                      </div>
                      <div class="text-sm text-gray-500">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Lost
                                </span> $200
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="px-2 py-1 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-6 w-6 ">
                          <span class="h-6 w-6 rounded-full bg-gray-700 p-1 text-white">26</span>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Round: 2
                          </div>
                          <div class="text-sm text-gray-500">
                            Bets: 4
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Total Bet Amt</div>
                      <div class="text-sm text-gray-500">$200</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Won
                                </span> $0
                      </div>
                      <div class="text-sm text-gray-500">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Lost
                                </span> $200
                      </div>
                    </td>
                  </tr>
                  <!-- More people... -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style>
export default {

}
</style>