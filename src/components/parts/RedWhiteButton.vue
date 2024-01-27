<template>
  <button
    type="button"
    class="text-red-400 hover:text-white border border-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-red-500"
    @click="clickButton"
  >
    {{ label }}
  </button>
</template>
<script lang="ts">
export default {
  props: {
    label: String,
    removeItem: { type: Function, required: false },
    addInput: { type: Function, required: false },
    index: { type: Number, required: false },
  },
  methods: {
    clickButton() {
      if (this.removeItem) {
        this.removeItem(this.index);
      } else if (this.addInput) {
        this.addInput();
      }
    },
  },
};
</script>
