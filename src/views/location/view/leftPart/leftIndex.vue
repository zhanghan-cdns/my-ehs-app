<template>
  <div>
    <img
      @click="boxshow = false"
      v-show="boxshow"
      src="/img/rydw/tan.png"
      class="tan-class"
    />
    <img
      @click="boxshow = true"
      v-show="!boxshow"
      src="/img/rydw/shou.png"
      class="shou-class"
    />
    <transition name="slide">
      <left-position v-if="!boxshow"></left-position>
    </transition>
  </div>
</template>

<script>
import LeftPosition from "./leftPosition.vue";
export default {
  name: "leftIndex",
  components: { LeftPosition },
  data() {
    return {
      boxshow: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.shou-class {
  position: absolute;
  right: -20px;
  top: 47%;
}
.tan-class {
  position: absolute;
  left: 0px;
  top: 47%;
  z-index: 99;
}
.slide-enter-active, .slide-leave-active{
  transition: all 1s linear
}
.slide-enter, .slide-leave-to {
  opacity: 0
}
</style>
