<template>
  <div
    class="shadow-md chip cursor-pointer flex"
    :class="[size, chipColor]"
    @click="select"
  ><span class="chip-value m-auto">{{ chipValue }}</span></div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: () => {
        return 'chip-sm';
      }
    },
    color: {
      type: String,
      default: () => {
        return 'red';
      }
    },
    chipValue: {
      type: String,
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
  computed: {
    chipColor (color) {
      console.log('color', color.color);
      return `chip-${color.color}`;
    }
  },
  methods: {
    select () {
      if (this.emitSelection) {
        console.log('Emitting value', this.chipValue);
        this.$emit('chipSelected', {value: parseInt(this.chipValue), color: this.color});
      }
    }
  }
}
</script>

<style>
.chip {
  background-image: url("../assets/chips.png");
  border-radius: 50%;
  display: inline-block;
}

.chip.lg {
  background-repeat: no-repeat;
  background-size: 400px 400px;
  height: 109px;
  width: 109px;
}

.chip.md {
  background-repeat: no-repeat;
  background-size: 128px 128px;
  height: 35px;
  width: 35px;
}

.chip.sm {
  background-repeat: no-repeat;
  background-size: 94px 94px;
  height: 25px;
  width: 25px;
}

.chip.xs {
  background-repeat: no-repeat;
  background-size: 65px 65px;
  height: 19px;
  width: 19px;
}

.chip.xs .chip-value {display: none;}

.chip.lg .chip-value {
  font-size: 1.25rem;
}

.chip.md .chip-value {
  font-size: .5rem;
}

.chip.sm .chip-value {
  font-size: 0.25rem;
}

.chip-red {
  background-position: 50% 25%;
}

.chip-blue {
  background-position: 3% 25%;
}

.chip-green {
  background-position: 3% 75%;
}

.chip-black {
  background-position: 97% 25%;
}
</style>
