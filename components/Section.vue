<template>
  <section>
    <div class="header">
      <div>
        <slot name="header" />
      </div>
      <button
        class="btn transparent toggle-button"
        :class="{
          show: !isShowContent,
        }"
        v-if="hiddenable"
        @click="toggleContent"
      ></button>
    </div>
    <div class="content">
      <SpoilerTransition :isVisible="isShowContent">
        <slot name="content" />
        <slot name="default" />
      </SpoilerTransition>
    </div>
  </section>
</template>

<script setup>
import SpoilerTransition from './Assistants/SpoilerTransition';

const props = defineProps({
  hiddenable: {
    type: Boolean,
    default: true,
  },
});

const { hiddenable } = toRefs(props);

const isShowContent = ref(true);
const toggleContent = function () {
  if (hiddenable.value) {
    isShowContent.value = !isShowContent.value;
  }
};
</script>

<style lang="scss" scoped>
.header {
  min-height: 2.4em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  border-top: 1px solid #ebe8e8;
  background-color: #f7f7f7;
  padding: 1rem;
  border-radius: 0 0 2px 2px;
  margin-bottom: 1rem;

  .toggle-button {
    height: fit-content;

    &::after {
      content: '▲';
    }
    &.show::after {
      content: '▼';
    }
  }
}

.content {
  padding: 0 1rem;
}
</style>
