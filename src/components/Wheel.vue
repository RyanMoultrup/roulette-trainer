<template>
  <div id="wheel" class="wheel">
    <div class="main">
      <div class="plate" id="plate">
        <ul class="inner">
          <li class="wheel-number"><label><input type="radio" name="pit" value="32"/>
            <span class="pit">32</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="15"/>
            <span class="pit">15</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="19"/>
            <span class="pit">19</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="4"/>
            <span class="pit">4</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="21"/>
            <span class="pit">21</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="2"/>
            <span class="pit">2</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="25"/>
            <span class="pit">25</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="17"/>
            <span class="pit">17</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="34"/>
            <span class="pit">34</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="6"/>
            <span class="pit">6</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="27" />
            <span class="pit">27</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="13"/>
            <span class="pit">13</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="36"/>
            <span class="pit">36</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="11" />
            <span class="pit">11</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="30"/>
            <span class="pit">30</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="8"/>
            <span class="pit">8</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="23"/>
            <span class="pit">23</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="10"/>
            <span class="pit">10</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="5"/>
            <span class="pit">5</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="24"/>
            <span class="pit">24</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="16"/>
            <span class="pit">16</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="33"/>
            <span class="pit">33</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="1"/>
            <span class="pit">1</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="20"/>
            <span class="pit">20</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="14"/>
            <span class="pit">14</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="31"/>
            <span class="pit">31</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="9"/>
            <span class="pit">9</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="22"/>
            <span class="pit">22</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="18"/>
            <span class="pit">18</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="29"/>
            <span class="pit">29</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="7"/>
            <span class="pit">7</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="28"/>
            <span class="pit">28</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="12"/>
            <span class="pit">12</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="35"/>
            <span class="pit">35</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="3"/>
            <span class="pit">3</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="26"/>
            <span class="pit">26</span></label>
          </li>
          <li class="wheel-number"><label><input type="radio" name="pit" value="0"/>
            <span class="pit">0</span></label>
          </li>
        </ul>
        <div class="wheel-data reveal">
          <div class="data-inner">
            <div class="mask"></div>
            <div class="wheel-result font-roulette" :style="{'background-color': colorHex}">
              <div class="result-number">{{ spin }}</div>
              <div class="result-color">{{ color }}</div>
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
    <rounds-display class="flex justify-center gap-2" />
  </div> <!-- End Wheel -->
</template>

<script>
import spots from '../lib/table/spots';
import RoundsDisplay from "@/components/RoundsDisplay.vue";

export default {
  components: { RoundsDisplay },
  data () {
    return {
      spin: null,
      color: '',
      colorHex: 'gray'
    }
  },
  watch: {
    '$store.state.simulation.spin': function (val) {
      if (spots[val].color === 'green') {
        this.colorHex = spots[val].color;
      } else {
        this.colorHex = spots[val].color === 'red' ? '#B91C1C' : 'black';
      }
      this.color = spots[val].color;
      this.spin = val === 37 ? 0 : val;
    }
  }
}
</script>
