<template>
  <div style="min-height: 768px;">
    <div class="h-screen overflow-hidden bg-gray-100 flex flex-col">
      <!-- Top nav-->
      <header class="flex-shrink-0 relative h-16 bg-white flex items-center">
        <!-- Logo area -->
        <div class="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
          <a href="#"
             class="flex items-center justify-center h-16 w-16 bg-green-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600 md:w-20">
            <img class="h-14 w-auto" src="@/assets/american-roulette.png"
                 alt="Workflow">
          </a>
        </div>

        <!-- Picker area -->
        <div class="mx-auto md:hidden">
          <div class="relative">
            <label for="inbox-select" class="sr-only">Choose inbox</label>
            <select id="inbox-select"
                    class="rounded-md border-0 bg-none pl-3 pr-8 text-base font-medium text-gray-900 focus:ring-2 focus:ring-indigo-600">
              <option>Open</option>
              <option>Archive</option>
              <option>Customers</option>
              <option>Flagged</option>
              <option>Spam</option>
              <option>Drafts</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-2">
              <svg class="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                   fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Menu button area -->
        <div class="absolute inset-y-0 right-0 pr-4 flex items-center sm:pr-6 md:hidden">
          <!-- Mobile menu button -->
          <button type="button"
                  class="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <!-- Desktop nav area -->
        <div class="hidden md:min-w-0 md:flex-1 md:flex md:items-center md:justify-between">
          <div class="min-w-0 flex-1">
            <!--                    <div class="max-w-2xl relative text-gray-400 focus-within:text-gray-500">-->
            <!--                        <label for="search" class="sr-only">Search</label>-->
            <!--                        <input id="search" type="search" placeholder="Search"-->
            <!--                               class="block w-full border-transparent pl-12 placeholder-gray-500 focus:border-transparent sm:text-sm focus:ring-0">-->
            <!--                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">-->
            <!--                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"-->
            <!--                                 fill="currentColor" aria-hidden="true">-->
            <!--                                <path fill-rule="evenodd"-->
            <!--                                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"-->
            <!--                                      clip-rule="evenodd"></path>-->
            <!--                            </svg>-->
            <!--                        </div>-->
            <!--                    </div>-->
          </div>
          <div class="ml-10 pr-4 flex-shrink-0 flex items-center space-x-10">
            <nav aria-label="Global" class="flex space-x-10">
              <a href="#" class="text-sm font-medium text-gray-900">Inboxes</a>
              <a href="#" class="text-sm font-medium text-gray-900">Reporting</a>
              <a href="#" class="text-sm font-medium text-gray-900">Settings</a>
            </nav>
            <div class="flex items-center space-x-8">
                        <span class="inline-flex">
                          <a href="#" class="-mx-1 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500">
                            <span class="sr-only">View notifications</span>
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor" aria-hidden="true">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                            </svg>
                          </a>
                        </span>

              <div class="relative inline-block text-left">
                <button type="button"
                        class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                        id="menu-1" aria-expanded="false" aria-haspopup="true">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full"
                       src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                       alt="">
                </button>


                <transition enter-active-class="transition ease-out duration-100"
                            enter-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95">
                  <div
                      class="hidden origin-top-right absolute z-30 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu" aria-orientation="vertical" aria-labelledby="menu-1">
                    <div class="py-1" role="none">
                      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                         role="menuitem">
                        Your Profile
                      </a>
                      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                         role="menuitem">
                        Sign Out
                      </a>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile menu, show/hide this `div` based on menu open/closed state -->
        <div class="fixed inset-0 z-40 md:hidden">
          <transition enter-active-class="transition-opacity ease-linear duration-300" enter-class="opacity-0"
                      enter-to-class="opacity-100"
                      leave-active-class="transition-opacity ease-linear duration-300" leave-class="opacity-100"
                      leave-to-class="opacity-0">
            <div class="hidden sm:block sm:fixed sm:inset-0 md:hidden" aria-hidden="true">
              <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
            </div>
          </transition>


          <transition enter-active-class="transition ease-out duration-150 sm:ease-in-out sm:duration-300"
                      enter-class="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
                      enter-to-class="transform opacity-100 scale-100  sm:translate-x-0 sm:scale-100 sm:opacity-100"
                      leave-active-class="transition ease-in duration-150 sm:ease-in-out sm:duration-300"
                      leave-class="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
                      leave-to-class="transform opacity-0 scale-110  sm:translate-x-full sm:scale-100 sm:opacity-100">
            <nav
                class="fixed z-40 inset-0 h-full w-full bg-white sm:inset-y-0 sm:left-auto sm:right-0 sm:max-w-sm sm:w-full sm:shadow-lg md:hidden"
                aria-label="Global">
              <div class="h-16 flex items-center justify-between px-4 sm:px-6">
                <a href="#">
                  <img class="block h-8 w-auto"
                       src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&amp;shade=500"
                       alt="Workflow">
                </a>
                <button type="button"
                        class="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        aria-expanded="false">
                  <span class="sr-only">Open main menu</span>
                  <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div class="mt-2 max-w-8xl mx-auto px-4 sm:px-6">
                <div class="relative text-gray-400 focus-within:text-gray-500">
                  <label for="search" class="sr-only">Search all inboxes</label>
                  <input id="search" type="search" placeholder="Search all inboxes"
                         class="block w-full border-gray-300 rounded-md pl-10 placeholder-gray-500 focus:border-indigo-600 focus:ring-indigo-600">
                  <div class="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                         fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="max-w-8xl mx-auto py-3 px-2 sm:px-4">

                <a href="#"
                   class="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100">Inboxes</a>

                <a href="#"
                   class="block rounded-md py-2 pl-5 pr-3 text-base font-medium text-gray-500 hover:bg-gray-100">Technical
                  Support</a>

                <a href="#"
                   class="block rounded-md py-2 pl-5 pr-3 text-base font-medium text-gray-500 hover:bg-gray-100">Sales</a>

                <a href="#"
                   class="block rounded-md py-2 pl-5 pr-3 text-base font-medium text-gray-500 hover:bg-gray-100">General</a>


                <a href="#"
                   class="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100">Reporting</a>


                <a href="#"
                   class="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100">Settings</a>


              </div>
              <div class="border-t border-gray-200 pt-4 pb-3">
                <div class="max-w-8xl mx-auto px-4 flex items-center sm:px-6">
                  <div class="flex-shrink-0">
                    <img class="h-10 w-10 rounded-full"
                         src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                         alt="">
                  </div>
                  <div class="ml-3 min-w-0 flex-1">
                    <div class="text-base font-medium text-gray-800 truncate">Whitney Francis</div>
                    <div class="text-sm font-medium text-gray-500 truncate">whitneyfrancis@example.com
                    </div>
                  </div>
                  <a href="#"
                     class="ml-auto flex-shrink-0 bg-white p-2 text-gray-400 hover:text-gray-500">
                    <span class="sr-only">View notifications</span>
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                  </a>
                </div>
                <div class="mt-3 max-w-8xl mx-auto px-2 space-y-1 sm:px-4">

                  <a href="#"
                     class="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50">Your
                    Profile</a>

                  <a href="#"
                     class="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50">Sign
                    out</a>

                </div>
              </div>
            </nav>
          </transition>

        </div>
      </header>

      <!-- Bottom section -->
      <div class="min-h-0 flex-1 flex overflow-auto">
        <!-- Narrow sidebar-->
        <nav aria-label="Sidebar" class="hidden md:block md:flex-shrink-0 md:bg-gray-800 md:overflow-y-auto">
          <div class="relative w-20 flex flex-col p-3 space-y-3">

            <a href="#"
               class="bg-gray-900 text-white flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg">
              <span class="sr-only">Open</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
              </svg>
            </a>

            <a href="#"
               class="text-gray-400 hover:bg-gray-700 flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg">
              <span class="sr-only">Archive</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
              </svg>
            </a>

            <a href="#"
               class="text-gray-400 hover:bg-gray-700 flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg">
              <span class="sr-only">Customers</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </a>

            <a href="#"
               class="text-gray-400 hover:bg-gray-700 flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg">
              <span class="sr-only">Flagged</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
              </svg>
            </a>

            <a href="#"
               class="text-gray-400 hover:bg-gray-700 flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg">
              <span class="sr-only">Spam</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
              </svg>
            </a>

            <a href="#"
               class="text-gray-400 hover:bg-gray-700 flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg">
              <span class="sr-only">Drafts</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </a>

          </div>
        </nav>

        <!-- Main area -->
        <main class="min-w-0 flex-1 border-t border-gray-200 lg:flex">
          <section class="flex flex-col w-full">
            <!-- Primary column -->
            <display-stats></display-stats>

            <section class="flex flex-row justify-around items-center bg-gray-700 bg-opacity-0 pt-4 pb-4">
              <div id="hits-chart"></div>
              <div id="win-loss-chart"></div>
              <br>
              <div id="win-loss-row-chart" class="flex-shrink"></div>
            </section>

            <betting-table @runSimulation="play"></betting-table>
          </section>

          <spins-table></spins-table>
        </main>
      </div>
    </div>
  </div>
</template>

<script>

import SpinsTable from "@/components/SpinsTable";
import BettingTable from "@/components/BettingTable";
import DisplayStats from "@/components/DisplayStats";

import crossfilter from 'crossfilter2';
// import * as dc from 'dc';
// import { bets } from './lib/table/bets'; // get
import spots from './lib/table/spots';
import formatter from './lib/formatter';
import spin from './lib/table/wheel';
import HitsChart from './lib/charts/HitsChart';
import WinLossChart from "./lib/charts/WinLossChart";
import WinLossBankChart from './lib/charts/WinLossBankChart';
// import init from './lib/table/table';

export default {
  name: 'App',
  components: { SpinsTable, BettingTable, DisplayStats },
  data () {
    return {
      won: 0,
      loss: 0,
      bank: 10000,
      rounds: 5,
      canResetBank: false,
      outcomes: [],
      roundOutcome: [],
      print: false,
      myBets: [],
      lastRun: 0,
      strategies: {
        basic: {
          bet (amt) {
            return amt;
          }
        }
      }
    }
  },
  methods: {
    updateBank (amt) {
      this.bank = +this.bank + +amt;
    },
    placeBet (amt) {
      this.bank = +this.bank - +amt;
    },
    resetBank () {
      this.bank = 1000;
    },
    runSimulation (value) {
      console.log('runSimulation', value);

      this.myBets = value;

      // const Martingale = function (options) {
      //   console.log('options', options);
      //   console.log('options.limit', options.limit);
      //
      //   let limit = options.limit || 0;
      //   let tries = 0;
      //   let lastBet = 0;
      //   let maxBetOutside = options.maxBetOutside || 0;
      //   let reverse = options.reverse || false;
      //   let grand = options.grand || false;
      //
      //   let wonLast = () => {
      //     return wonLastRound;
      //   };
      //
      //   let double = (bet) => {
      //     return bet * 2;
      //   };
      //
      //   let hasLimit = () => {
      //     return limit > 0;
      //   };
      //
      //   let overLimit = () => {
      //     return tries >= limit
      //   };
      //
      //   let overTableLimit = () => {
      //     return double(lastBet) > maxBetOutside;
      //   };
      //
      //   let bet = (amt) => {
      //     // console.log('Tries --- ', tries);
      //     // console.log('limit --- ', limit);
      //     if (!wonLast()) {
      //       // console.log('We lost-----');
      //       // console.log('overTableLimit', overTableLimit());
      //       if ((hasLimit() && overLimit()) || overTableLimit()) {
      //         // console.log('We are over limit---');
      //         tries = 0;
      //         lastBet = amt;
      //         return amt;
      //       }
      //
      //       if (roundOutcome.length === 0 ) {
      //         // console.log('We are doubling bet---');
      //         lastBet = double(lastBet);
      //         tries++;
      //       }
      //
      //       return lastBet;
      //     }
      //     // console.log('We won---');
      //     tries = 0;
      //     lastBet = amt;
      //     return amt;
      //   };
      //
      //   return {
      //     bet
      //   };
      // };

// keep doubling bet after a loss
// double bet for x times only
// peroni method
// martingale - quite after tries

      // let lastRun = 0;

      // let outcomes = []

// let outcomes = [];
//     let wonLastRound = true;
//       let roundOutcome = [];

      // this.myBets = get();

      console.log('myBets', this.myBets);

      return new Promise((resolve) => {
        console.log('Simulation is running');
        console.log('lastRun', this.lastRun);

        // const spins = [1, 3, 4, 6, 7, 9, 10, 11, 12, 14, 15, 17, 16, 18, 17];

        let j;
        for (let i = this.lastRun; i<(this.rounds+this.lastRun); i++) {
          let hit = spin();

          // let hit = spins[i];

          if (print) {
            console.log(`+++++ Round ${i+1} hit on: `, hit);
          }
          // let color = spots[hit].color;
          // let type = (hit % 2 === 0) ? 'even' : 'odd';
          // let winLose = (hit % 2 === 0) ? 'Win' : 'Lose'

          // console.log(`${winLose} - ${type}`);
          // console.log(`${color} / ${type}`);
          // if (hit === 37) {
          //     console.log('Zero');
          // }

          let canBet = this.myBets.every(bet => {
            let winnings;
            // let betAmt = this.strategies.basic.bet(bet[1]);
            let betAmt = bet.get();

            console.log('betAmt', betAmt);

            // updateBank(bet[1] * -1);
            if (this.bank < betAmt) {
              // console.log('bank', bank);
              // console.log('bet', bet[1]);
              console.log(`Rounds stopped at ${i+this.lastRun} because you ran out of money`);
              return false;
            }

            this.placeBet(betAmt);

            if (print) {
              console.log('Bet: ', betAmt);
            }

            // if (bet.length === 3) {
            // winnings = bet[0](hit, betAmt, bet[2]);
            winnings = bet.collect(hit);
            // } else {
            //     winnings = bet[0](hit, betAmt);
            // }

            console.log('winnings::++', winnings);

            // console.log(`return on ${bet[0].name}`, winnings);
            if (winnings) {
              if (print) {
                console.log('You Win');
              }
              this.won += winnings - betAmt;
              this.updateBank(winnings);
              // outcomes.unshift({'win': true, 'amt': winnings});
              this.roundOutcome.push(true);
              this.outcomes.push({
                wonRound: 1,
                lostRound: 0,
                won: winnings - betAmt,
                loss: 0,
                bet: betAmt,
                hit: hit,
                color: spots[hit].color,
                even: hit % 2 === 0,
                bank: this.bank,
                round: i+1,
                outcome: 'Won'
              })
              // wonLastRound = true;
            } else {
              if (print) {
                console.log('You Lose');
              }
              this.loss += betAmt;
              this.roundOutcome.push(false);
              this.outcomes.push({
                wonRound: 0,
                lostRound: 1,
                won: 0,
                loss: betAmt,
                bet: betAmt,
                hit: hit,
                color: spots[hit].color,
                even: hit % 2 === 0,
                bank: this.bank,
                round: i+1,
                outcome: 'Lost'
              })
              // wonLastRound = false;
              // outcomes.unshift({'win': false, 'amt': betAmt});
              // if (outcomes.length >= 5) {
              //     outcomes.pop();
              // }
            }

            if (print) {
              console.log('bank: ', this.bank);
              console.log('--------------------');
            }

            return true;
          });

          if (print) {
            console.log('====================');
          }

          // console.log('roundOutcome', roundOutcome);

          // if (roundOutcome.includes(true)) {
          //   wonLastRound = true;
          // } else {
          //   wonLastRound = false;
          // }

          this.roundOutcome = [];

          if (!canBet) {
            break;
          }
          j = i + 1;
        }

        this.lastRun = j;


        console.log('Outcomes: ', this.outcomes);
        console.log(`Bank after ${this.lastRun} rounds: `, this.bank);
        console.log('Won: ', this.won);
        console.log('Lost: ', this.loss);
        console.log('Winnings: ', +this.bank - 10000);
        console.log('***************************');
        console.log('***************************');
        resolve({
          rounds: this.lastRun,
          bank: this.bank,
          won: this.won,
          loss: this.loss,
          winnings: +this.bank - 10000
        });
      });
    },
    play (value) {
      console.log('play(value)', value);
      this.runSimulation(value).then(roundResults => {

        this.updateStats(roundResults);

        let facts = crossfilter(this.outcomes);

        console.log('facts:::::', facts.size());

        let winLossBankChart = new WinLossBankChart(facts);
        winLossBankChart.render();

        let winLossChart = new WinLossChart(facts);
        winLossChart.render();

        let hitsChart = new HitsChart(facts, this.myBets);
        hitsChart.render();

        // TODO Create inside/outside bet win/loss chart
      });
    },
    updateStats (roundResults) {
      document.querySelector('#rounds span').innerHTML = formatter.number(roundResults.rounds);
      document.querySelector('#bank span').innerHTML = formatter.money(roundResults.bank);
      document.querySelector('#won span').innerHTML = formatter.money(roundResults.won);
      document.querySelector('#loss span').innerHTML = formatter.money(roundResults.loss);
      document.querySelector('#winnings span').innerHTML = formatter.money(roundResults.winnings);
    }
  },
  mounted () {

// let facts = crossfilter();

    // document.addEventListener('click', event => {
    //   console.log('listening for click');
    //   let selectedRounds = document.getElementById('num-rounds');
    //   this.rounds = +selectedRounds.value;
    //
    //   if (event.target.matches('.play')) {
    //     if (this.canResetBank) {
    //       this.resetBank();
    //     }
    //     this.runSimulation().then(roundResults => {
    //
    //       this.updateStats(roundResults);
    //
    //       console.log('resolved -> then()');
    //       // facts.add(outcomes);
    //
    //       let facts = crossfilter(this.outcomes);
    //
    //       let winLossBankChart = new WinLossBankChart(facts);
    //       winLossBankChart.render();
    //
    //       let winLossChart = new WinLossChart(facts);
    //       winLossChart.render();
    //
    //       let hitsChart = new HitsChart(facts, myBets);
    //       hitsChart.render();
    //
    //       // TODO Create inside/outside bet win/loss chart
    //     });
    //   }

      // if (event.target.matches('.reset-game')) {
      //   console.log('resetting game');
      //   this.bank = 10000;
      //   this.roundOutcome = [];
      //   this.outcomes = [];
      //   this.lastRun = 0;
      //   this.won = 0;
      //   this.loss = 0;
      //   // facts.remove();
      //   dc.redrawAll();
      // }
    // })
  }
}
</script>
