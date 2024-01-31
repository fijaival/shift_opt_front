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
  <span> {{ driver.last_name }} {{ driver.first_name }} </span>
  <button @click="deleteDriver(driver.id)">削除</button>
  <button @click="handleModal(driver)">更新</button>
</template>
