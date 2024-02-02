<script lang="ts">
import type { Driver } from "../../types";

export default {
  props: {
    driver: {
      type: Object as () => Driver,
      required: true,
    },
    deleteDriver: {
      type: Function,
      required: true,
    },

    setTargetDriver: {
      type: Function,
      required: true,
    },
    setShowModal: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handleModal(driver: Driver) {
      this.setTargetDriver(driver);
      this.setShowModal();
    },
  },
};
</script>

<template>
  <div
    class="flex justify-between items-center cursor-pointer overflow-hidden rounded shadow-lg hover:bg-gray-100 bg-white rounded-lg shadow-lg p-5"
    @click="handleModal(driver)"
  >
    <p class="text-gray-900 text-lg font-semibold">
      {{ driver.last_name }} {{ driver.first_name }}
    </p>
    <button
      v-if="driver.id"
      @click.stop="deleteDriver(driver.id)"
      class="p-2 text-red-500 hover:text-red-700 transition-colors duration-200 ease-in-out"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>
