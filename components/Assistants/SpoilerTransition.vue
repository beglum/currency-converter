<template>
  <div>
    <transition
      name="slide"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
    >
      <div v-if="isVisible">
        <slot name="default" />
      </div>
    </transition>
  </div>
</template>

<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: true,
  },
});

const { enter, afterEnter, leave } = useSlideAnimation();
</script>

<style scoped>
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.slide-enter-active,
.slide-leave-active {
  transition: height 0.4s ease-in-out;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  height: 0;
}
</style>
