<template>
  <input
    class="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
    :id="id"
    :placeholder="placeholder"
    :type="type"
    :value="modelValue"
    @input="handleInput"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: { type: String, required: true },
    modelValue: { type: String, required: true },
    placeholder: { type: String, required: false },
    type: { type: String, required: true },
  },
  methods: {
    handleInput: function (event: Event) {
      const target = event.target as HTMLInputElement;
      this.$emit("update:modelValue", target.value);
    },
  },
});
</script>
