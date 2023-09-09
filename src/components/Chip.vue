<template>
  <div class="relative z-0">
    <div
        class="dashed-circle cursor-pointer"
        :class="[size]"
        @click="select"
    ><span class="chip-value">{{ formatChipValue() }}</span>
    </div>
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
        return 'darkred';
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
  width: 75px;
  height: 75px;
  border: 7px dashed white;
  border-radius: 50%;
  line-height: 60px;
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
  margin: -11px;
  border-radius: 50%;
  background: orange;
  content: '';
  box-shadow: 0 0 0 5px #282828 inset, 0 0 0 8px #969696 inset, 0 0 4px rgba(255, 255, 255, 0.2);
}
.dashed-circle:after {
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 4px;
  border: 2px dashed white;
  border-radius: 50%;
  background: rgba(0,0,0,0.4);
  content: '';
}

.xl.dashed-circle {
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
.xl.dashed-circle:before {
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
.xl.dashed-circle:after {
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
  border: 6px dashed white;
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
</style>
