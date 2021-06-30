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
            <section class="flex-shrink-0">


              <dl class="grid grid-cols-1 bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-4 md:divide-y-0 md:divide-x">
                <div>
                  <div class="px-4 py-4 sm:p-6">
                    <dt class="text-base font-normal text-gray-900">
                      Total Amount Lost
                    </dt>
                    <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                      <div class="flex items-baseline text-2xl font-semibold text-green-900">
                        <div id="loss"><span>$0</span></div>
                        <span class="ml-2 text-sm font-medium text-gray-500">
                                    from 70,946
                                </span>
                      </div>

                      <div
                          class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 md:mt-2 lg:mt-0">
                        <svg class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                             fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fill-rule="evenodd"
                                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="sr-only">
                                    Increased by
                                </span>
                        12%
                      </div>
                    </dd>
                  </div>
                </div>

                <div>
                  <div class="px-4 py-4 sm:p-6">
                    <dt class="text-base font-normal text-gray-900">
                      Total Amount Won
                    </dt>
                    <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                      <div class="flex items-baseline text-2xl font-semibold text-green-900">
                        <div id="won"><span>$0</span></div>
                        <span class="ml-2 text-sm font-medium text-gray-500">
                                            from 56.14%
                                        </span>
                      </div>

                      <div
                          class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 md:mt-2 lg:mt-0">
                        <svg class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                             fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fill-rule="evenodd"
                                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="sr-only">
                                    Increased by
                                </span>
                        2.02%
                      </div>
                    </dd>
                  </div>
                </div>

                <div>
                  <div class="px-4 py-4 sm:p-6">
                    <dt class="text-base font-normal text-gray-900">
                      Bank
                    </dt>
                    <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                      <div class="flex items-baseline text-2xl font-semibold text-green-900">
                        <div id="bank"><span>$10,000</span></div>
                        <span class="ml-2 text-sm font-medium text-gray-500">
                                            from 56.14%
                                        </span>
                      </div>

                      <div
                          class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 md:mt-2 lg:mt-0">
                        <svg class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                             fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fill-rule="evenodd"
                                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="sr-only">
                                    Increased by
                                </span>
                        2.02%
                      </div>
                    </dd>
                  </div>
                </div>

                <div>
                  <div class="px-4 py-4 sm:p-6">
                    <dt class="text-base font-normal text-gray-900">
                      Current Winnings
                    </dt>
                    <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                      <div class="flex items-baseline text-2xl font-semibold text-red-900">
                        <div id="winnings"><span>$0</span></div>
                        <span class="ml-2 text-sm font-medium text-gray-500">
                                 from 28.62%
                                </span>
                      </div>

                      <div
                          class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800 md:mt-2 lg:mt-0">
                        <svg class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                             fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fill-rule="evenodd"
                                d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="sr-only">
                                    Decreased by
                                </span>
                        4.05%
                      </div>
                    </dd>
                  </div>
                </div>

              </dl>

              <br>
              <!-- Dropdown Number of rounds -->
              <!--                    <div class="p-8 bg-gray-100" style="min-height: 360px;">-->
              <!--                        <div class="mx-auto w-64 text-right">-->
              <!--                            <div class="relative inline-block text-left">-->
              <!--                                <div>-->
              <!--                                    <button type="button"-->
              <!--                                            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"-->
              <!--                                            id="options-menu" aria-expanded="true" aria-haspopup="true">-->
              <!--                                        Options-->
              <!--                                        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"-->
              <!--                                             fill="currentColor" aria-hidden="true">-->
              <!--                                            <path fill-rule="evenodd"-->
              <!--                                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"-->
              <!--                                                  clip-rule="evenodd"></path>-->
              <!--                                        </svg>-->
              <!--                                    </button>-->
              <!--                                </div>-->
              <!--                                <transition enter-active-class="transition ease-out duration-100" enter-class="transform opacity-0 scale-95"-->
              <!--                                            enter-to-class="transform opacity-100 scale-100"-->
              <!--                                            leave-active-class="transition ease-in duration-75"-->
              <!--                                            leave-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">-->
              <!--                                    <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"-->
              <!--                                         role="menu" aria-orientation="vertical" aria-labelledby="options-menu">-->
              <!--                                        <div class="py-1" role="none">-->
              <!--                                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"-->
              <!--                                               role="menuitem">Account settings</a>-->
              <!--                                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"-->
              <!--                                               role="menuitem">Support</a>-->
              <!--                                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"-->
              <!--                                               role="menuitem">License</a>-->
              <!--                                            <form method="POST" action="#" role="none">-->
              <!--                                                <button type="submit"-->
              <!--                                                        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"-->
              <!--                                                        role="menuitem">-->
              <!--                                                    Sign out-->
              <!--                                                </button>-->
              <!--                                            </form>-->
              <!--                                        </div>-->
              <!--                                    </div>-->
              <!--                                </transition>-->
              <!--                            </div>-->
              <!--                        </div>-->
              <!--                    </div> &lt;!&ndash; End number of rounds dropdown &ndash;&gt;-->

            </section>

            <section class="flex flex-row justify-around items-center bg-gray-700 bg-opacity-0 pt-4 pb-4">
              <div id="hits-chart"></div>
              <div id="win-loss-chart"></div>
              <br>
              <div id="win-loss-row-chart" class="flex-shrink"></div>
            </section>

            <section class="flex-grow-0" style="height: 20%;">
              <!--            <div class="w-full mx-auto">-->
              <div class="bg-white overflow-hidden shadow">
                <div class="flex flex-row border-b border-gray-800 px-2 py-3 sm:px-6 bg-gray-700 justify-between">
                  <div>
                    <button type="button"
                            class="play inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      <svg class="-ml-0.5 mr-2 h-4 w-4" x-description="Heroicon name: solid/mail"
                           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                           aria-hidden="true">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                      Run Simulation
                    </button>

                    <button type="button"
                            class="reset-game inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <svg class="-ml-0.5 mr-2 h-4 w-4" x-description="Heroicon name: solid/mail"
                           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                           aria-hidden="true">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                      Reset
                    </button>
                  </div>

                  <div>
                    <select name="num-rounds" id="num-rounds">
                      <option value="1">1</option>
                      <option value="5" selected>5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="500">500</option>
                      <option value="1000">1000</option>
                    </select>


                    <span class="text-white " id="rounds">Spins <span>0</span></span>
                    <span class="text-white justify-self-end" id="current-bet">Current Bet: $<span>200</span></span>
                  </div>

                </div>
                <div id="table-wheel" class="flex bg-green-900 relative right-1/4">
                  <div id="wheel">
                    <div class="main">
                      <div class="plate" id="plate">
                        <ul class="inner">
                          <li class="wheel-number"><label><input type="radio" name="pit" value="32"/><span class="pit">32</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="15"/><span class="pit">15</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="19"/><span class="pit">19</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="4"/><span
                              class="pit">4</span></label></li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="21"/><span class="pit">21</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="2"/><span
                              class="pit">2</span></label></li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="25"/><span class="pit">25</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="17"/><span class="pit">17</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="34"/><span class="pit">34</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="6"/><span
                              class="pit">6</span></label></li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="27"/><span class="pit">27</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="13"/><span class="pit">13</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="36"/><span class="pit">36</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="11"/><span class="pit">11</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="30"/><span class="pit">30</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="8"/><span
                              class="pit">8</span></label></li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="23"/><span class="pit">23</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="10"/><span class="pit">10</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="5"/><span
                              class="pit">5</span></label></li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="24"/><span class="pit">24</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="16"/><span class="pit">16</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="33"/><span class="pit">33</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="1"/><span
                              class="pit">1</span></label></li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="20"/><span class="pit">20</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="14"/><span class="pit">14</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="31"/><span class="pit">31</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="9"/><span
                              class="pit">9</span></label></li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="22"/><span class="pit">22</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="18"/><span class="pit">18</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="29"/><span class="pit">29</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="7"/><span
                              class="pit">7</span></label></li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="28"/><span class="pit">28</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="12"/><span class="pit">12</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="35"/><span class="pit">35</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="3"/><span
                              class="pit">3</span></label></li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="26"/><span class="pit">26</span></label>
                          </li>
                          <li class="wheel-number"><label><input type="radio" name="pit" value="0"/><span
                              class="pit">0</span></label></li>
                        </ul>
                        <div class="wheel-data">
                          <div class="data-inner">
                            <div class="mask"></div>
                            <div class="wheel-result">
                              <!--                                                <div class="result-number">00</div>-->
                              <!--                                                <div class="result-color">red</div>-->
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="previous-results">
                        <ol class="previous-list">
                          <li class='visuallyhidden placeholder'>No results yet.</li>
                        </ol>
                      </div>
                    </div>
                  </div> <!-- End Wheel -->

                  <div id="table" class="relative p-5 pl-3 grid grid-rows-5 grid-cols-14 place-items-stretch font-roulette text-xl">
                    <div id="dbl_3_6" class="absolute spot-h dbl_3_6"></div>
                    <div id="dbl_6_9" class="absolute spot-h dbl_6_9"></div>
                    <div id="dbl_9_12" class="absolute spot-h dbl_9_12"></div>

                    <div id="dbl_12_15" class="absolute spot-h dbl_12_15"></div>
                    <div id="dbl_15_18" class="absolute spot-h dbl_15_18"></div>
                    <div id="dbl_18_21" class="absolute spot-h dbl_18_21"></div>
                    <div id="dbl_21_24" class="absolute spot-h dbl_21_24"></div>
                    <div id="dbl_24_27" class="absolute spot-h dbl_24_27"></div>
                    <div id="dbl_27_30" class="absolute spot-h dbl_27_30"></div>
                    <div id="dbl_30_33" class="absolute spot-h dbl_30_33"></div>
                    <div id="dbl_33_36" class="absolute spot-h dbl_33_36"></div>

                    <div id="dbl_3_2" class="absolute spot-h dbl_3_2"></div>
                    <div id="sqr_3_6_2_5" class="absolute spot-h sqr_3_6_2_5"></div>
                    <div id="dbl_6_5" class="absolute spot-h dbl_6_5"></div>
                    <div id="sqr_6_9_5_8" class="absolute spot-h sqr_6_9_5_8"></div>
                    <div id="dbl_9_8" class="absolute spot-h dbl_9_8"></div>
                    <div id="sqr_9_12_8_11" class="absolute spot-h sqr_9_12_8_11"></div>
                    <div id="dbl_12_11" class="absolute spot-h dbl_12_11"></div>
                    <div id="sqr_12_15_11_14" class="absolute spot-h sqr_12_15_11_14"></div>
                    <div id="dbl_15_14" class="absolute spot-h dbl_15_14"></div>
                    <div id="sqr_15_18_14_17" class="absolute spot-h sqr_15_18_14_17"></div>
                    <div id="dbl_18_17" class="absolute spot-h dbl_18_17"></div>
                    <div id="sqr_18_21_17_20" class="absolute spot-h sqr_18_21_17_20"></div>
                    <div id="dbl_21_20" class="absolute spot-h dbl_21_20"></div>
                    <div id="sqr_21_24_20_23" class="absolute spot-h sqr_21_24_20_23"></div>
                    <div id="dbl_24_23" class="absolute spot-h dbl_24_23"></div>
                    <div id="sqr_24_27_23_26" class="absolute spot-h sqr_24_27_23_26"></div>
                    <div id="dbl_27_26" class="absolute spot-h dbl_27_26"></div>
                    <div id="sqr_27_30_26_29" class="absolute spot-h sqr_27_30_26_29"></div>
                    <div id="dbl_30_29" class="absolute spot-h dbl_30_29"></div>
                    <div id="sqr_30_33_29_32" class="absolute spot-h sqr_30_33_29_32"></div>
                    <div id="dbl_33_32" class="absolute spot-h dbl_33_32"></div>
                    <div id="sqr_33_36_32_35" class="absolute spot-h sqr_33_36_32_35"></div>
                    <div id="dbl_36_35" class="absolute spot-h dbl_36_35"></div>


                    <div id="dbl_2_5" class="absolute spot-h dbl_2_5"></div>
                    <div id="dbl_5_8" class="absolute spot-h dbl_5_8"></div>
                    <div id="dbl_8_11" class="absolute spot-h dbl_8_11"></div>
                    <div id="dbl_11_14" class="absolute spot-h dbl_11_14"></div>
                    <div id="dbl_14_17" class="absolute spot-h dbl_14_17"></div>
                    <div id="dbl_17_20" class="absolute spot-h dbl_17_20"></div>
                    <div id="dbl_20_23" class="absolute spot-h dbl_20_23"></div>
                    <div id="dbl_23_26" class="absolute spot-h dbl_23_26"></div>
                    <div id="dbl_26_29" class="absolute spot-h dbl_26_29"></div>
                    <div id="dbl_29_32" class="absolute spot-h dbl_29_32"></div>
                    <div id="dbl_32_35" class="absolute spot-h dbl_32_35"></div>

                    <div id="dbl_2_1" class="absolute spot-h dbl_2_1"></div>
                    <div id="sqr_2_5_1_4" class="absolute spot-h sqr_2_5_1_4"></div>
                    <div id="dbl_5_4" class="absolute spot-h dbl_5_4"></div>
                    <div id="sqr_5_8_4_7" class="absolute spot-h sqr_5_8_4_7"></div>
                    <div id="dbl_8_7" class="absolute spot-h dbl_8_7"></div>
                    <div id="sqr_8_11_7_10" class="absolute spot-h sqr_8_11_7_10"></div>
                    <div id="dbl_11_10" class="absolute spot-h dbl_11_10"></div>
                    <div id="sqr_11_14_10_13" class="absolute spot-h sqr_11_14_10_13"></div>
                    <div id="dbl_14_13" class="absolute spot-h dbl_14_13"></div>
                    <div id="sqr_14_17_13_16" class="absolute spot-h "></div>
                    <div id="dbl_17_16" class="absolute spot-h dbl_17_16"></div>
                    <div id="sqr_17_20_16_19" class="absolute spot-h sqr_17_20_16_19"></div>
                    <div id="dbl_20_19" class="absolute spot-h dbl_20_19"></div>
                    <div id="sqr_20_23_19_22" class="absolute spot-h sqr_20_23_19_22"></div>
                    <div id="dbl_23_22" class="absolute spot-h dbl_23_22"></div>
                    <div id="sqr_23_26_22_25" class="absolute spot-h sqr_23_26_22_25"></div>
                    <div id="dbl_26_25" class="absolute spot-h dbl_26_25"></div>
                    <div id="sqr_26_29_25_28" class="absolute spot-h sqr_26_29_25_28"></div>
                    <div id="dbl_29_28" class="absolute spot-h dbl_29_28"></div>
                    <div id="sqr_29_32_28_31" class="absolute spot-h sqr_29_32_28_31"></div>
                    <div id="dbl_32_31" class="absolute spot-h dbl_32_31"></div>
                    <div id="sqr_32_35_31_34" class="absolute spot-h sqr_32_35_31_34"></div>
                    <div id="dbl_35_34" class="absolute spot-h dbl_35_34"></div>

                    <div id="dbl_1_4" class="absolute spot-h dbl_1_4"></div>
                    <div id="dbl_4_7" class="absolute spot-h dbl_4_7"></div>
                    <div id="dbl_7_10" class="absolute spot-h dbl_7_10"></div>
                    <div id="dbl_10_13" class="absolute spot-h dbl_10_13"></div>
                    <div id="dbl_13_16" class="absolute spot-h dbl_13_16"></div>
                    <div id="dbl_16_19" class="absolute spot-h dbl_16_19"></div>
                    <div id="dbl_19_22" class="absolute spot-h dbl_19_22"></div>
                    <div id="dbl_22_25" class="absolute spot-h dbl_22_25"></div>
                    <div id="dbl_25_28" class="absolute spot-h dbl_25_28"></div>
                    <div id="dbl_28_31" class="absolute spot-h dbl_28_31"></div>
                    <div id="dbl_31_34" class="absolute spot-h dbl_31_34"></div>

                    <div id="str_3_2_1" class="absolute spot-h str_3_2_1"></div>
                    <div id="line_3_6_2_5_1_4" class="absolute spot-h line_3_6_2_5_1_4"></div>
                    <div id="str_6_5_4" class="absolute spot-h str_6_5_4"></div>
                    <div id="line_6_9_5_8_4_7" class="absolute spot-h line_6_9_5_8_4_7"></div>
                    <div id="str_9_8_7" class="absolute spot-h str_9_8_7"></div>
                    <div id="line_9_12_8_11_7_10" class="absolute spot-h line_9_12_8_11_7_10"></div>
                    <div id="str_12_11_10" class="absolute spot-h str_12_11_10"></div>
                    <div id="line_12_15_11_14_10_13" class="absolute spot-h line_12_15_11_14_10_13"></div>
                    <div id="str_15_14_13" class="absolute spot-h str_15_14_13"></div>
                    <div id="line_15_18_14_17_13_16" class="absolute spot-h line_15_18_14_17_13_16"></div>
                    <div id="str_18_17_16" class="absolute spot-h str_18_17_16"></div>
                    <div id="line_18_21_17_20_16_19" class="absolute spot-h line_18_21_17_20_16_19"></div>
                    <div id="str_21_20_19" class="absolute spot-h str_21_20_19"></div>
                    <div id="line_21_24_20_23_19_22" class="absolute spot-h line_21_24_20_23_19_22"></div>
                    <div id="str_24_23_22" class="absolute spot-h str_24_23_22"></div>
                    <div id="line_24_27_23_26_22_25" class="absolute spot-h line_24_27_23_26_22_25"></div>
                    <div id="str_27_26_25" class="absolute spot-h str_27_26_25"></div>
                    <div id="line_27_30_26_29_25_28" class="absolute spot-h line_27_30_26_29_25_28"></div>
                    <div id="str_30_29_28" class="absolute spot-h str_30_29_28"></div>
                    <div id="line_30_33_29_32_28_31" class="absolute spot-h line_30_33_29_32_28_31"></div>
                    <div id="str_33_32_31" class="absolute spot-h str_33_32_31"></div>
                    <div id="line_33_36_32_35_31_34" class="absolute spot-h line_33_36_32_35_31_34"></div>
                    <div id="str_36_35_34" class="absolute spot-h str_36_35_34"></div>

                    <div id="_1st_12" class="absolute spot-h _1st_12"></div>
                    <div id="_2nd_12" class="absolute spot-h _2nd_12"></div>
                    <div id="_3rd_12" class="absolute spot-h _3rd_12"></div>

                    <div id="_1to18" class="absolute spot-h _1to18"></div>
                    <div id="_odd" class="absolute spot-h _odd"></div>
                    <div id="_even" class="absolute spot-h _even"></div>
                    <div id="_red" class="absolute spot-h _red"></div>
                    <div id="_black" class="absolute spot-h _black"></div>
                    <div id="_19to36" class="absolute spot-h _19to36"></div>
                    <div id="_1st_row" class="absolute spot-h _1st_row"></div>
                    <div id="_2nd_row" class="absolute spot-h _2nd_row"></div>
                    <div id="_3rd_row" class="absolute spot-h _3rd_row"></div>

                    <div id="dbl_0_3" class="absolute spot-h dbl_0_3"></div>
                    <div id="trip_0_3_2" class="absolute spot-h trip_0_3_2"></div>
                    <div id="dbl_0_2" class="absolute spot-h dbl_0_2"></div>
                    <div id="trip_0_2_1" class="absolute spot-h trip_0_2_1"></div>
                    <div id="dbl_0_1" class="absolute spot-h dbl_0_1"></div>
                    <div id="_zero" class="absolute spot-h _zero"></div>

                    <div class="spot pt-16 border border-t-3 p-4 bg-green-700 text-white text-3xl text-opacity-70 text-center align-text-middle row-span-3 rounded-tl rounded-bl border-l-4 border-b-4 border-t-4">
                      0
                    </div>

                    <div class="spot _1st-12 _1st-row _3 _3_6 _3_2 _3_6_2_5 border border-l-4 border-t-3 p-4 bg-red-700 text-white text-2xl text-center align-middle border-t-4">
                      3
                    </div>
                    <div class="spot _1st-12 _1st-row _6 _3_6 _6_9 _3_6_2_5 _6_5 _6_9_5_8 border border-t-3 p-4 bg-black text-white text-2xl text-center align-middle border-t-4">
                      6
                    </div>
                    <div class="spot _1st-12 _1st-row _9 _6_9 _9_12 _9_8 _9_12_8_11 _6_9_5_8 border border-t-3 p-4 bg-red-700 text-white text-2xl text-center align-middle border-t-4">
                      9
                    </div>
                    <div class="spot _1st-12 _1st-row _12 _9_12 _12_15 _12_11 _12_15_11_14 _9_12_8_11 border border-t-3 p-4 bg-red-700 text-white text-2xl text-center align-middle border-t-4">
                      12
                    </div>
                    <div class="spot _1st-12 _1st-row _15 _12_15 _15_18 _15_14 _15_18_14_17 _12_15_11_14 border border-t-3 p-4 bg-black text-white text-2xl text-center align-middle border-t-4">
                      15
                    </div>
                    <div class="spot _1st-12 _1st-row _18 _15_18 _18_21 _18_17 _18_21_17_20 _15_18_14_17 border border-t-3 p-4 bg-red-700 text-white text-2xl text-center align-middle border-t-4">
                      18
                    </div>
                    <div class="spot _1st-12 _1st-row _21 _18_21 _21_24 _21_20 _21_24_20_23 _18_21_17_20 border border-t-3 p-4 bg-red-700 text-white text-2xl text-center align-middle border-t-4">
                      21
                    </div>
                    <div class="spot _1st-12 _1st-row _24 _21_24 _24_27 _24_23 _24_27_23_26 _21_24_20_23 border border-t-3 p-4 bg-black text-white text-2xl text-center align-middle border-t-4">
                      24
                    </div>
                    <div class="spot _1st-12 _1st-row _27 _24_27 _27_30 _27_26 _27_30_26_29 _24_27_23_26 border border-t-3 p-4 bg-red-700 text-white text-2xl text-center align-middle border-t-4">
                      27
                    </div>
                    <div class="spot _1st-12 _1st-row _30 _27_30 _30_33 _30_29 _30_33_29_32 _27_30_26_29 border border-t-3 p-4 bg-red-700 text-white text-2xl text-center align-middle border-t-4">
                      30
                    </div>
                    <div class="spot _1st-12 _1st-row _33 _30_33 _33_36 _33_32 _33_36_32_35 _30_33_29_32 border border-t-3 p-4 bg-black text-white text-2xl text-center align-middle border-t-4">
                      33
                    </div>
                    <div class="spot _1st-12 _1st-row _36 _33_36 _36_35 _33_36_32_35 border border-r-4 border-t-3 p-4 bg-red-700 text-white text-2xl text-center align-middle border-t-4">
                      36
                    </div>
                    <div class="spot border border-t-3 p-4 bg-green-700 text-white text-opacity-70 text-base text-center align-middle rounded-tr rounded-br border-t-4 border-r-4">
                      2/1
                    </div>

                    <div class="spot _2 _3_2 _3_6_2_5 border border-l-4 p-4 bg-black text-white text-2xl text-center align-middle">2</div>
                    <div class="spot _5 _6_5 _3_6_2_5 _6_9_5_8 border p-4 bg-red-700 text-white text-2xl text-center align-middle">5</div>
                    <div class="spot _8 _9_8 _6_9_5_8 _9_12_8_11 border p-4 bg-black text-white text-2xl text-center align-middle">8</div>
                    <div class="spot border _11 _12_11 _12_15_11_14 _9_12_8_11  p-4 bg-black text-white text-2xl text-center align-middle">11</div>
                    <div class="spot border _14 _12_15_11_14 _15_14 _15_18_14_17 p-4 bg-red-700 text-white text-2xl text-center align-middle">14</div>
                    <div class="spot border _17 _15_18_14_17 _18_17 _18_21_17_20 p-4 bg-black text-white text-2xl text-center align-middle">17</div>
                    <div class="spot border _20 _18_21_17_20 _21_20 _21_24_20_23 p-4 bg-black text-white text-2xl text-center align-middle">20</div>
                    <div class="spot border _23 _21_24_20_23 _24_23 _24_27_23_26 p-4 bg-red-700 text-white text-2xl text-center align-middle">23</div>
                    <div class="spot border _26 _24_27_23_26 _27_26 _27_30_26_29 p-4 bg-black text-white text-2xl text-center align-middle">26</div>
                    <div class="spot border _29 _27_30_26_29 _30_29 _30_33_29_32 p-4 bg-black text-white text-2xl text-center align-middle">29</div>
                    <div class="spot border _32 _30_33_29_32 _33_32 _33_36_32_35 p-4 bg-red-700 text-white text-2xl text-center align-middle">32</div>
                    <div class="spot border _35 _33_36_32_35 _36_35 border-r-4 p-4 bg-black text-white text-2xl text-center align-middle">35</div>
                    <div class="spot border p-4 bg-green-700 text-white text-opacity-70 text-base text-center align-middle text-xs border-r-4 rounded-br rounded-tr">2/1</div>

                    <div class="spot border _1 border-l-4 p-4 bg-red-700 text-white text-2xl text-center align-middle border-b-4">1</div>
                    <div class="spot border _4 p-4 bg-black text-white text-2xl text-center align-middle border-b-4">4</div>
                    <div class="spot border _7 p-4 bg-red-700 text-white text-2xl text-center align-middle border-b-4">7</div>
                    <div class="spot border _10 p-4 bg-black text-white text-2xl text-center align-middle border-b-4">10</div>
                    <div class="spot border _13 p-4 bg-black text-white text-2xl text-center align-middle border-b-4">13</div>
                    <div class="spot border _16 p-4 bg-red-700 text-white text-2xl text-center align-middle border-b-4">16</div>
                    <div class="spot border _19 p-4 bg-red-700 text-white text-2xl text-center align-middle border-b-4">19</div>
                    <div class="spot border _22 p-4 bg-black text-white text-2xl text-center align-middle border-b-4">22</div>
                    <div class="spot border _25 p-4 bg-red-700 text-white text-2xl text-center align-middle border-b-4">25</div>
                    <div class="spot border _28 p-4 bg-black text-white text-2xl text-center align-middle border-b-4">28</div>
                    <div class="spot border _31 p-4 bg-black text-white text-2xl text-center align-middle border-b-4">31</div>
                    <div class="spot border _34 border-r-4 p-4 bg-red-700 text-white text-2xl text-center align-middle border-b-4">34</div>
                    <div class="spot border p-4 bg-green-700 text-white text-opacity-70 text-base text-center align-middle rounded-br rounded-tr border-b-4 border-r-4">
                      2/1
                    </div>

                    <div class="spot __1st-12 border p-4 bg-green-700 text-white text-opacity-70 text-4xl text-center align-middle col-span-4 col-start-2 border-l-4 rounded-tl">
                      1ST 12</div>
                    <div class="spot border p-4 bg-green-700 text-white text-opacity-70 text-4xl text-center align-middle col-span-4">2ND 12
                    </div>
                    <div class="spot border p-4 bg-green-700 text-white text-opacity-70 text-4xl text-center align-middle col-span-4 border-r-4 rounded-tr">
                      3RD 12
                    </div>

                    <div class="spot border p-2 pt-4 bg-green-700 text-white text-opacity-70 text-xl text-center align-middle col-span-2 col-start-2 rounded-bl border-b-4 border-l-4">
                      1 TO 18
                    </div>
                    <div class="spot border p-4 bg-green-700 text-white text-2xl text-opacity-70 text-center align-middle col-span-2 border-b-4">
                      EVEN
                    </div>

                    <div class="spot border p-4 bg-red-700 text-white text-2xl text-center align-middle col-span-2 border-b-4">RED</div>
                    <div class="spot border p-2 pt-4 bg-black text-white text-2xl text-center align-middle col-span-2 border-b-4">BLACK</div>

                    <div class="spot border p-4 bg-green-700 text-white text-2xl text-opacity-70 text-center align-middle col-span-2 border-b-4">ODD</div>
                    <div class="spot border p-2 pt-4 bg-green-700 text-white text-opacity-70 text-xl text-center align-middle col-span-2 rounded-br border-r-4 border-b-4">
                      19 TO 36
                    </div>
                  </div>

                  <div id="bets-container" class="overflow-y-auto">
                    <div class="bg-white h-full bg-opacity-10 shadow overflow-y-auto">
                      <ul class="divide-y divide-green-900">

                        <li>
                          <a href="#" class="block hover:bg-white hover:bg-opacity-5">
                            <div class="px-4 py-4 sm:px-6">
                              <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-white truncate">
                                  Split 3/6
                                </p>
                                <div class="ml-2 flex-shrink-0 flex">
                                  <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    $50
                                  </p>
                                  <p class="px-2 ml-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    $550
                                  </p>
                                </div>
                              </div>
                              <div class="mt-2 sm:flex sm:justify-start">
                                <span class="bet-spot-img w-6 h-6 text-center text-white rounded-full bg-red-800 red-bet">3</span>
                                <span class="bet-spot-img w-6 h-6 text-center text-white rounded-full bg-black red-bet">6</span>
                              </div>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="#" class="block hover:bg-white hover:bg-opacity-5">
                            <div class="px-4 py-4 sm:px-6">
                              <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-white truncate">
                                  19 to 36
                                </p>
                                <div class="ml-2 flex-shrink-0 flex">
                                  <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    $50
                                  </p>
                                  <p class="px-2 ml-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    $550
                                  </p>
                                </div>
                              </div>
                              <div class="mt-2 grid grid-cols-9 gap-0.5">
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">19</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">20</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">21</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">22</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">23</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">24</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">25</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">26</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">27</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">28</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">29</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">30</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">31</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">32</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">33</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">34</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">35</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">36</span>
                              </div>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="#" class="block hover:bg-white hover:bg-opacity-5">
                            <div class="px-4 py-4 sm:px-6">
                              <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-white truncate">
                                  1st 18
                                </p>
                                <!--                                <p class="text-sm font-medium text-white truncate">-->
                                <!--                                  1:11-->
                                <!--                                </p>-->
                                <!--                                <p class="text-sm font-medium text-white truncate">-->
                                <!--                                  37%-->
                                <!--                                </p>-->
                                <div class="ml-2 flex-shrink-0 flex">
                                  <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    $50
                                  </p>
                                  <p class="px-2 ml-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    $550
                                  </p>
                                </div>
                              </div>
                              <div class="mt-2 grid grid-cols-9">
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">1</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">2</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">3</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">4</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">5</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">6</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">7</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">8</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">9</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">10</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">11</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">12</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">13</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">14</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">15</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">16</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">17</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">18</span>
                              </div>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" class="block hover:bg-white hover:bg-opacity-5">
                            <div class="px-4 py-4 sm:px-6">
                              <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-white truncate">
                                  1st 18
                                </p>
                                <!--                                <p class="text-sm font-medium text-white truncate">-->
                                <!--                                  1:11-->
                                <!--                                </p>-->
                                <!--                                <p class="text-sm font-medium text-white truncate">-->
                                <!--                                  37%-->
                                <!--                                </p>-->
                                <div class="ml-2 flex-shrink-0 flex">
                                  <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    $50
                                  </p>
                                  <p class="px-2 ml-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    $550
                                  </p>
                                </div>
                              </div>
                              <div class="mt-2 grid grid-cols-9">
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">1</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">2</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">3</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">4</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">5</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">6</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">7</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">8</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">9</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">10</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">11</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">12</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">13</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">14</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">15</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">16</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">17</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">18</span>
                              </div>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" class="block hover:bg-white hover:bg-opacity-5">
                            <div class="px-4 py-4 sm:px-6">
                              <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-white truncate">
                                  1st 18
                                </p>
                                <!--                                <p class="text-sm font-medium text-white truncate">-->
                                <!--                                  1:11-->
                                <!--                                </p>-->
                                <!--                                <p class="text-sm font-medium text-white truncate">-->
                                <!--                                  37%-->
                                <!--                                </p>-->
                                <div class="ml-2 flex-shrink-0 flex">
                                  <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    $50
                                  </p>
                                  <p class="px-2 ml-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    $550
                                  </p>
                                </div>
                              </div>
                              <div class="mt-2 grid grid-cols-9">
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">1</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">2</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">3</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">4</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">5</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">6</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">7</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">8</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">9</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">10</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">11</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">12</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">13</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">14</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">15</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">16</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">17</span>
                                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">18</span>
                              </div>
                            </div>
                          </a>
                        </li>

                      </ul>
                    </div>
                  </div>

                  <div id="chips-container" class="absolute -bottom-8 right-1/4">
                    <div class="chips max-h-20">
                      <div class="shadow-md chip chip-red"></div>
                      <div class="shadow-md chip chip-blue"></div>
                      <div class="shadow-md chip chip-green"></div>
                      <div class="shadow-md chip chip-black"></div>
                    </div>
                  </div>
                </div>
              </div>
              <!--            </div>-->

            </section>
          </section>

          <!-- Secondary column (hidden on smaller screens) -->
          <aside class="hidden lg:block lg:flex-shrink-0 lg:order-last">
            <div class="h-full relative flex flex-col w-full border-l border-gray-200 bg-gray-100">
              <div class="h-full">
                <div class="flex flex-col">
                  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
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
        </main>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
