<template>
   <div
        class="dashed-circle cursor-pointer"
        :class="[size]"
        @click="select"
    ><span class="chip-value">{{ formatChipValue() }}</span>
    </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: () => {
        return 'sm';
      }
    },
    color: {
      type: String,
      default: () => {
        return 'red';
      }
    },
    chipValue: {
      type: Number,
      default: () => {
        return '5000';
      }
    },
    emitSelection: {
      type: Boolean,
      default: () => {
        return true;
      }
    }
  },
  methods: {
    formatChipValue () {
      if (this.chipValue < 10000) return this.chipValue;
      if (this.chipValue >= 10000 && this.chipValue < 100000) return `${this.chipValue.toString().slice(0, 2)}K`;
      if (this.chipValue >= 100000 && this.chipValue < 1000000) return `${this.chipValue.toString().slice(0, 3)}K`;
      if (this.chipValue === 1000000) return '1mil'
      else return this.chipValue;
    },
    select () {
      if (this.emitSelection) {
        this.$emit('chipSelected', {value: parseInt(this.chipValue), color: this.color});
      }
    }
  }
}
</script>

<style scoped>
.dashed-circle {
  position: relative;
  display: block;
  width: 100px;
  height: 100px;
  border: 13px dashed white;
  border-radius: 50%;
  line-height: 75px;
  text-align: center;
  font-family: lobster;
  color: white;
}
.dashed-circle:before {
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: -16px;
  border-radius: 50%;
  background: orange;
  content: '';
  box-shadow: 0 0 0 5px #282828 inset, 0 0 0 10px #969696 inset, 0 0 6px rgba(255, 255, 255, 0.2);
}
.dashed-circle:after {
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 5px;
  border: 3px dashed white;
  border-radius: 50%;
  background: rgba(0,0,0,0.4);
  content: '';
}

.md.dashed-circle {
  width: 50px;
  height: 50px;
  border: 7px dashed white;
  border-radius: 50%;
  line-height: 37px;
}
.md.dashed-circle:before {
  margin: -9px;
  border-radius: 50%;
}

.md.dashed-circle:after {
  margin: 5px;
  border: 1px dashed white;
  border-radius: 50%;
}

.sm .chip-value { display: none }

.sm.dashed-circle {
  width: 25px;
  height: 25px;
  border: 3px dashed white;
  border-radius: 50%;
  line-height: 17px;
}

.sm.dashed-circle:before {
  margin: -4px;
  border-radius: 50%;
  box-shadow: none;
}

.sm.dashed-circle:after {
  margin: 2px;
  border: 1px dashed white;
  border-radius: 50%;
}

.dashed-circle:before {
  background: v-bind(color);
}










/*
.chips {
  margin: 0 50px;
  padding: 20px 0;
  text-align: center;
  background-color: #014D43;
  box-shadow: 0 0 0 5px #282828 inset, 0 0 0 10px #969696 inset, 0 0 6px rgba(255, 255, 255, 0.2);
}
.pokerchip {
  margin: 1em;
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5), 0 0 3px 0 rgba(0, 0, 0, 0.4) inset;
  border-radius: 50%;
  background-size: 100px 100px;
  background-position: center center;
}
/*
.pokerchip:before {
  position: absolute;
  content: "";
  z-index: 1;
  width: 117px;
  height: 117px;
  border-radius: 50%;
  top: 9px;
  left: 9px;
  background-size: 151px 151px;
  background-position: center center;
}

.pokerchip:after {
  z-index: 2;
  position: absolute;
  content: "25";
  text-align: center;
  font: bold 50px/111px Arial;
  white-space: pre;
  width: 111px;
  height: 111px;
  border-radius: 50%;
  top: 20px;
  left: 20px;
  text-shadow: -1px -1px 0px rgba(0, 0, 0, 0.3), 1px 1px 0px rgba(255, 255, 255, 0.2);
}


.chips {
  margin: 0 50px;
  padding: 20px 0;
  text-align: center;
  background-color: #014D43;
  box-shadow: 0 0 0 5px #282828 inset, 0 0 0 10px #969696 inset, 0 0 6px rgba(255, 255, 255, 0.2);
}
.pokerchip {
  margin: 1em;
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5), 0 0 3px 0 rgba(0, 0, 0, 0.4) inset;
  border-radius: 50%;
  background-size: 151px 151px;
  background-position: center center;
}

.md.pokerchip {
  width: 40px;
  height: 40px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5), 0 0 3px 0 rgba(0, 0, 0, 0.4) inset;
  border-radius: 50%;
  background-size: 151px 151px;
}

.pokerchip:before {
  position: absolute;
  content: "";
  z-index: 1;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  top: 7px;
  left: 7px;
  background-size: 151px 151px;
  background-position: center center;
}


.pokerchip:after {
  z-index: 200;
  position: absolute;
  content: "25";
  text-align: center;
  font: bold 35px/61px Arial;
  white-space: pre;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  top: 18%;
  left: 18%;
}

.md.pokerchip:after {
  z-index: 200;
  position: absolute;
  content: "25";
  text-align: center;
  font: bold 10px/61px Arial;
  white-space: pre;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  top: 8%;
  left: 8%;
}

.white {
  background-image: linear-gradient(0deg, transparent 0, transparent 67.5px, #fff 67.5px, #fff 83.5px, transparent 83.5px, transparent 151px), linear-gradient(60deg, transparent 0, transparent 97.4304px, #fff 97.4304px, #fff 113.4304px, transparent 113.4304px, transparent 151px), linear-gradient(120deg, #dddddd 0, #dddddd 97.4304px, #fff 97.4304px, #fff 113.4304px, #dddddd 113.4304px, #dddddd 151px);
}

.white:after {
  content: "1";
  background: #dddddd;
  color: #C1C1C1;
}
.red {
  background-image: linear-gradient(0deg, transparent 0, transparent 67.5px, #fff 67.5px, #fff 83.5px, transparent 83.5px, transparent 151px), linear-gradient(60deg, transparent 0, transparent 97.4304px, #fff 97.4304px, #fff 113.4304px, transparent 113.4304px, transparent 151px), linear-gradient(120deg, #800000 0, #800000 97.4304px, #fff 97.4304px, #fff 113.4304px, #800000 113.4304px, #800000 151px);
}

.red:after {
  content: "5";
  background: #800000;
  color: #6C0000;
}
.blue {
  background-image: linear-gradient(0deg, transparent 0, transparent 67.5px, #fff 67.5px, #fff 83.5px, transparent 83.5px, transparent 151px), linear-gradient(60deg, transparent 0, transparent 97.4304px, #fff 97.4304px, #fff 113.4304px, transparent 113.4304px, transparent 151px), linear-gradient(120deg, #000099 0, #000099 97.4304px, #fff 97.4304px, #fff 113.4304px, #000099 113.4304px, #000099 151px);
}

.blue:after {
  content: "10";
  background: #000099;
  color: #00016C;
}
.green {
  background-image: linear-gradient(0deg, transparent 0, transparent 67.5px, #fff 67.5px, #fff 83.5px, transparent 83.5px, transparent 151px), linear-gradient(60deg, transparent 0, transparent 97.4304px, #fff 97.4304px, #fff 113.4304px, transparent 113.4304px, transparent 151px), linear-gradient(120deg, #008000 0, #008000 97.4304px, #fff 97.4304px, #fff 113.4304px, #008000 113.4304px, #008000 151px);
}

.green:after {
  content: "25";
  background: #008000;
  color: #016C00;
}

.black-chip {
  background-image: linear-gradient(0deg, transparent 0, transparent 67.5px, #fff 67.5px, #fff 83.5px, transparent 83.5px, transparent 151px), linear-gradient(60deg, transparent 0, transparent 97.4304px, #fff 97.4304px, #fff 113.4304px, transparent 113.4304px, transparent 151px), linear-gradient(120deg, #222222 0, #222222 97.4304px, #fff 97.4304px, #fff 113.4304px, #222222 113.4304px, #222222 151px);
}

.md.black-chip {
  background-image: linear-gradient(0deg, transparent 0, transparent 67.5px, #fff 67.5px, #fff 83.5px, transparent 83.5px, transparent 151px), linear-gradient(60deg, transparent 0, transparent 97.4304px, #fff 97.4304px, #fff 113.4304px, transparent 113.4304px, transparent 151px), linear-gradient(120deg, #222222 0, #222222 97.4304px, #fff 97.4304px, #fff 113.4304px, #222222 113.4304px, #222222 151px);
}

.black:before {
  border: 8px solid #222222;
  background-image: linear-gradient(0deg, transparent 0, transparent 69.5px, #EBEBEB 69.5px, #EBEBEB 81.5px, transparent 81.5px, transparent 151px), linear-gradient(30deg, transparent 0, transparent 98.7104px, #EBEBEB 98.7104px, #EBEBEB 110.7104px, transparent 110.7104px, transparent 151px), linear-gradient(60deg, transparent 0, transparent 98.7104px, #EBEBEB 98.7104px, #EBEBEB 110.7104px, transparent 110.7104px, transparent 151px), linear-gradient(90deg, transparent 0, transparent 69.5px, #EBEBEB 69.5px, #EBEBEB 81.5px, transparent 81.5px, transparent 151px), linear-gradient(120deg, transparent 0, transparent 98.7104px, #EBEBEB 98.7104px, #EBEBEB 110.7104px, transparent 110.7104px, transparent 151px), linear-gradient(150deg, #000000 0, #000000 98.7104px, #EBEBEB 98.7104px, #EBEBEB 110.7104px, #000000 110.7104px, #000000 151px);

.black-chip:after {
  content: "100";
  background: #222222;
  color: #000000;
}

/* ========================= */

/*.chip {*/
/*  background-image: url("../assets/chips.png");*/
/*  border-radius: 50%;*/
/*  display: inline-block;*/
/*}*/

/*.chip.lg {*/
/*  background-repeat: no-repeat;*/
/*  background-size: 391px 391px;*/
/*  height: 100px;*/
/*  width: 100px;*/
/*}*/

/*.chip.md {*/
/*  background-repeat: no-repeat;*/
/*  background-size: 128px 128px;*/
/*  height: 35px;*/
/*  width: 35px;*/
/*}*/

/*.chip.sm {*/
/*  background-repeat: no-repeat;*/
/*  background-size: 94px 94px;*/
/*  height: 25px;*/
/*  width: 25px;*/
/*}*/

/*.chip.xs {*/
/*  background-repeat: no-repeat;*/
/*  background-size: 65px 65px;*/
/*  height: 19px;*/
/*  width: 19px;*/
/*}*/

/*.chip.xs .chip-value {display: none;}*/

/*.chip.lg .chip-value {*/
/*  font-size: 1.25rem;*/
/*}*/

/*.chip.md .chip-value {*/
/*  font-size: .5rem;*/
/*}*/

/*.chip.sm .chip-value {*/
/*  font-size: 0.25rem;*/
/*}*/

/*.chip-red {*/
/*  background-position: 50% 25%;*/
/*}*/

/*.chip-blue {*/
/*  background-position: 3% 25%;*/
/*}*/

/*.chip-green {*/
/*  background-position: 3% 75%;*/
/*}*/

/*.chip-black {*/
/*  background-position: 97% 25%;*/
/*} */
</style>
