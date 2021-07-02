<template>
  <div id="table" class="relative p-5 pl-3 grid grid-rows-5 grid-cols-14 place-items-stretch font-roulette text-xl">
    <div id="dbl_3_6" class="absolute spot-h dbl_3_6" @click="placeBet"></div>
    <div id="dbl_6_9" class="absolute spot-h dbl_6_9" @click="placeBet"></div>
    <div id="dbl_9_12" class="absolute spot-h dbl_9_12" @click="placeBet"></div>

    <div id="dbl_12_15" class="absolute spot-h dbl_12_15" @click="placeBet"></div>
    <div id="dbl_15_18" class="absolute spot-h dbl_15_18" @click="placeBet"></div>
    <div id="dbl_18_21" class="absolute spot-h dbl_18_21" @click="placeBet"></div>
    <div id="dbl_21_24" class="absolute spot-h dbl_21_24" @click="placeBet"></div>
    <div id="dbl_24_27" class="absolute spot-h dbl_24_27" @click="placeBet"></div>
    <div id="dbl_27_30" class="absolute spot-h dbl_27_30" @click="placeBet"></div>
    <div id="dbl_30_33" class="absolute spot-h dbl_30_33" @click="placeBet"></div>
    <div id="dbl_33_36" class="absolute spot-h dbl_33_36" @click="placeBet"></div>

    <div id="dbl_3_2" class="absolute spot-h dbl_3_2" @click="placeBet"></div>
    <div id="sqr_3_6_2_5" class="absolute spot-h sqr_3_6_2_5" @click="placeBet"></div>
    <div id="dbl_6_5" class="absolute spot-h dbl_6_5" @click="placeBet"></div>
    <div id="sqr_6_9_5_8" class="absolute spot-h sqr_6_9_5_8" @click="placeBet"></div>
    <div id="dbl_9_8" class="absolute spot-h dbl_9_8" @click="placeBet"></div>
    <div id="sqr_9_12_8_11" class="absolute spot-h sqr_9_12_8_11" @click="placeBet"></div>
    <div id="dbl_12_11" class="absolute spot-h dbl_12_11" @click="placeBet"></div>
    <div id="sqr_12_15_11_14" class="absolute spot-h sqr_12_15_11_14" @click="placeBet"></div>
    <div id="dbl_15_14" class="absolute spot-h dbl_15_14" @click="placeBet"></div>
    <div id="sqr_15_18_14_17" class="absolute spot-h sqr_15_18_14_17" @click="placeBet"></div>
    <div id="dbl_18_17" class="absolute spot-h dbl_18_17" @click="placeBet"></div>
    <div id="sqr_18_21_17_20" class="absolute spot-h sqr_18_21_17_20" @click="placeBet"></div>
    <div id="dbl_21_20" class="absolute spot-h dbl_21_20" @click="placeBet"></div>
    <div id="sqr_21_24_20_23" class="absolute spot-h sqr_21_24_20_23" @click="placeBet"></div>
    <div id="dbl_24_23" class="absolute spot-h dbl_24_23" @click="placeBet"></div>
    <div id="sqr_24_27_23_26" class="absolute spot-h sqr_24_27_23_26" @click="placeBet"></div>
    <div id="dbl_27_26" class="absolute spot-h dbl_27_26" @click="placeBet"></div>
    <div id="sqr_27_30_26_29" class="absolute spot-h sqr_27_30_26_29" @click="placeBet"></div>
    <div id="dbl_30_29" class="absolute spot-h dbl_30_29" @click="placeBet"></div>
    <div id="sqr_30_33_29_32" class="absolute spot-h sqr_30_33_29_32" @click="placeBet"></div>
    <div id="dbl_33_32" class="absolute spot-h dbl_33_32" @click="placeBet"></div>
    <div id="sqr_33_36_32_35" class="absolute spot-h sqr_33_36_32_35" @click="placeBet"></div>
    <div id="dbl_36_35" class="absolute spot-h dbl_36_35" @click="placeBet"></div>


    <div id="dbl_2_5" class="absolute spot-h dbl_2_5" @click="placeBet"></div>
    <div id="dbl_5_8" class="absolute spot-h dbl_5_8" @click="placeBet"></div>
    <div id="dbl_8_11" class="absolute spot-h dbl_8_11" @click="placeBet"></div>
    <div id="dbl_11_14" class="absolute spot-h dbl_11_14" @click="placeBet"></div>
    <div id="dbl_14_17" class="absolute spot-h dbl_14_17" @click="placeBet"></div>
    <div id="dbl_17_20" class="absolute spot-h dbl_17_20" @click="placeBet"></div>
    <div id="dbl_20_23" class="absolute spot-h dbl_20_23" @click="placeBet"></div>
    <div id="dbl_23_26" class="absolute spot-h dbl_23_26" @click="placeBet"></div>
    <div id="dbl_26_29" class="absolute spot-h dbl_26_29" @click="placeBet"></div>
    <div id="dbl_29_32" class="absolute spot-h dbl_29_32" @click="placeBet"></div>
    <div id="dbl_32_35" class="absolute spot-h dbl_32_35" @click="placeBet"></div>

    <div id="dbl_2_1" class="absolute spot-h dbl_2_1" @click="placeBet"></div>
    <div id="sqr_2_5_1_4" class="absolute spot-h sqr_2_5_1_4" @click="placeBet"></div>
    <div id="dbl_5_4" class="absolute spot-h dbl_5_4" @click="placeBet"></div>
    <div id="sqr_5_8_4_7" class="absolute spot-h sqr_5_8_4_7" @click="placeBet"></div>
    <div id="dbl_8_7" class="absolute spot-h dbl_8_7" @click="placeBet"></div>
    <div id="sqr_8_11_7_10" class="absolute spot-h sqr_8_11_7_10" @click="placeBet"></div>
    <div id="dbl_11_10" class="absolute spot-h dbl_11_10" @click="placeBet"></div>
    <div id="sqr_11_14_10_13" class="absolute spot-h sqr_11_14_10_13" @click="placeBet"></div>
    <div id="dbl_14_13" class="absolute spot-h dbl_14_13" @click="placeBet"></div>
    <div id="sqr_14_17_13_16" class="absolute spot-h " @click="placeBet"></div>
    <div id="dbl_17_16" class="absolute spot-h dbl_17_16" @click="placeBet"></div>
    <div id="sqr_17_20_16_19" class="absolute spot-h sqr_17_20_16_19" @click="placeBet"></div>
    <div id="dbl_20_19" class="absolute spot-h dbl_20_19" @click="placeBet"></div>
    <div id="sqr_20_23_19_22" class="absolute spot-h sqr_20_23_19_22" @click="placeBet"></div>
    <div id="dbl_23_22" class="absolute spot-h dbl_23_22" @click="placeBet"></div>
    <div id="sqr_23_26_22_25" class="absolute spot-h sqr_23_26_22_25" @click="placeBet"></div>
    <div id="dbl_26_25" class="absolute spot-h dbl_26_25" @click="placeBet"></div>
    <div id="sqr_26_29_25_28" class="absolute spot-h sqr_26_29_25_28" @click="placeBet"></div>
    <div id="dbl_29_28" class="absolute spot-h dbl_29_28" @click="placeBet"></div>
    <div id="sqr_29_32_28_31" class="absolute spot-h sqr_29_32_28_31" @click="placeBet"></div>
    <div id="dbl_32_31" class="absolute spot-h dbl_32_31" @click="placeBet"></div>
    <div id="sqr_32_35_31_34" class="absolute spot-h sqr_32_35_31_34" @click="placeBet"></div>
    <div id="dbl_35_34" class="absolute spot-h dbl_35_34" @click="placeBet"></div>

    <div id="dbl_1_4" class="absolute spot-h dbl_1_4" @click="placeBet"></div>
    <div id="dbl_4_7" class="absolute spot-h dbl_4_7" @click="placeBet"></div>
    <div id="dbl_7_10" class="absolute spot-h dbl_7_10" @click="placeBet"></div>
    <div id="dbl_10_13" class="absolute spot-h dbl_10_13" @click="placeBet"></div>
    <div id="dbl_13_16" class="absolute spot-h dbl_13_16" @click="placeBet"></div>
    <div id="dbl_16_19" class="absolute spot-h dbl_16_19" @click="placeBet"></div>
    <div id="dbl_19_22" class="absolute spot-h dbl_19_22" @click="placeBet"></div>
    <div id="dbl_22_25" class="absolute spot-h dbl_22_25" @click="placeBet"></div>
    <div id="dbl_25_28" class="absolute spot-h dbl_25_28" @click="placeBet"></div>
    <div id="dbl_28_31" class="absolute spot-h dbl_28_31" @click="placeBet"></div>
    <div id="dbl_31_34" class="absolute spot-h dbl_31_34" @click="placeBet"></div>

    <div id="str_3_2_1" class="absolute spot-h str_3_2_1" @click="placeBet"></div>
    <div id="line_3_6_2_5_1_4" class="absolute spot-h line_3_6_2_5_1_4" @click="placeBet"></div>
    <div id="str_6_5_4" class="absolute spot-h str_6_5_4" @click="placeBet"></div>
    <div id="line_6_9_5_8_4_7" class="absolute spot-h line_6_9_5_8_4_7" @click="placeBet"></div>
    <div id="str_9_8_7" class="absolute spot-h str_9_8_7" @click="placeBet"></div>
    <div id="line_9_12_8_11_7_10" class="absolute spot-h line_9_12_8_11_7_10" @click="placeBet"></div>
    <div id="str_12_11_10" class="absolute spot-h str_12_11_10" @click="placeBet"></div>
    <div id="line_12_15_11_14_10_13" class="absolute spot-h line_12_15_11_14_10_13" @click="placeBet"></div>
    <div id="str_15_14_13" class="absolute spot-h str_15_14_13" @click="placeBet"></div>
    <div id="line_15_18_14_17_13_16" class="absolute spot-h line_15_18_14_17_13_16" @click="placeBet"></div>
    <div id="str_18_17_16" class="absolute spot-h str_18_17_16" @click="placeBet"></div>
    <div id="line_18_21_17_20_16_19" class="absolute spot-h line_18_21_17_20_16_19" @click="placeBet"></div>
    <div id="str_21_20_19" class="absolute spot-h str_21_20_19" @click="placeBet"></div>
    <div id="line_21_24_20_23_19_22" class="absolute spot-h line_21_24_20_23_19_22" @click="placeBet"></div>
    <div id="str_24_23_22" class="absolute spot-h str_24_23_22" @click="placeBet"></div>
    <div id="line_24_27_23_26_22_25" class="absolute spot-h line_24_27_23_26_22_25" @click="placeBet"></div>
    <div id="str_27_26_25" class="absolute spot-h str_27_26_25" @click="placeBet"></div>
    <div id="line_27_30_26_29_25_28" class="absolute spot-h line_27_30_26_29_25_28" @click="placeBet"></div>
    <div id="str_30_29_28" class="absolute spot-h str_30_29_28" @click="placeBet"></div>
    <div id="line_30_33_29_32_28_31" class="absolute spot-h line_30_33_29_32_28_31" @click="placeBet"></div>
    <div id="str_33_32_31" class="absolute spot-h str_33_32_31" @click="placeBet"></div>
    <div id="line_33_36_32_35_31_34" class="absolute spot-h line_33_36_32_35_31_34" @click="placeBet"></div>
    <div id="str_36_35_34" class="absolute spot-h str_36_35_34" @click="placeBet"></div>

    <div id="_1st_12" class="absolute spot-h _1st_12" @click="placeBet"></div>
    <div id="_2nd_12" class="absolute spot-h _2nd_12" @click="placeBet"></div>
    <div id="_3rd_12" class="absolute spot-h _3rd_12" @click="placeBet"></div>

    <div id="_1to18" class="absolute spot-h _1to18" @click="placeBet"></div>
    <div id="_odd" class="absolute spot-h _odd" @click="placeBet"></div>
    <div id="_even" class="absolute spot-h _even" @click="placeBet"></div>
    <div id="_red" class="absolute spot-h _red" @click="placeBet"></div>
    <div id="_black" class="absolute spot-h _black" @click="placeBet"></div>
    <div id="_19to36" class="absolute spot-h _19to36" @click="placeBet"></div>
    <div id="_1st_row" class="absolute spot-h _1st_row" @click="placeBet"></div>
    <div id="_2nd_row" class="absolute spot-h _2nd_row" @click="placeBet"></div>
    <div id="_3rd_row" class="absolute spot-h _3rd_row" @click="placeBet"></div>

    <div id="dbl_0_3" class="absolute spot-h dbl_0_3" @click="placeBet"></div>
    <div id="trip_0_3_2" class="absolute spot-h trip_0_3_2" @click="placeBet"></div>
    <div id="dbl_0_2" class="absolute spot-h dbl_0_2" @click="placeBet"></div>
    <div id="trip_0_2_1" class="absolute spot-h trip_0_2_1" @click="placeBet"></div>
    <div id="dbl_0_1" class="absolute spot-h dbl_0_1" @click="placeBet"></div>
    <div id="_zero" class="absolute spot-h _zero" @click="placeBet"></div>

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
</template>

<script>
import Bet from '../lib/table/Bet'

export default {
  name: 'Board',
  methods: {
    placeBet (event) {
      this.$emit('betPlaced', new Bet(event.target.id, 50));
      // this.$emit('betPlaced', { bet: new Bet(event.target.id, 50) });
    },
  }
}
</script>
