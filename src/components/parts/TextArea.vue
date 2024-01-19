<template>
  <input
    class="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
    :id="id"
    :placeholder="placeholder"
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
<script>
export default {
  props: { modelValue: String, id: String, placeholder: String, type: String },
  emits: ["update:modelValue"],
};
</script>
