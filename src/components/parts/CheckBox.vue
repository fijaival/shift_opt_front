<template>
  <input
    :id="`checkbox-${qualification.id}`"
    type="checkbox"
    :value="qualification.id"
    @change="handleChange"
    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
  />
</template>
<script lang="ts">
export default {
  props: {
    id: String,
    qualification: {
      type: Object,
      required: true,
    },
    updateQualifications: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handleChange() {
      this.updateQualifications(this.qualification.id);
    },
  },
};
</script>
