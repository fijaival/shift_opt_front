<script lang="ts">
import { Driver, DriverName } from "../../types";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DriverView",
  data() {
    return {
      drivers: [] as Driver[],
      newDriver: { first_name: "", last_name: "" } as DriverName,
      isValidNewDriver: false,
    };
  },
  computed: {
    ...mapGetters({
      getDrivers: "driver/getDrivers",
    }),
  },
  mounted() {
    this.fetchDrivers();
  },
  methods: {
    ...mapActions({
      fetchDrivers: "driver/fetchDrivers",
      addDriver: "driver/addDriver",
      deleteDriver: "driver/deleteDriver",
    }),

    validateInput() {
      if (
        typeof this.newDriver.first_name !== "string" ||
        typeof this.newDriver.last_name !== "string"
      ) {
        console.error("Error: Invalid input type");
        return;
      }

      this.isValidNewDriver =
        this.newDriver.first_name.trim() !== "" &&
        this.newDriver.last_name.trim() !== "";
    },
  },
};
</script>

<template>
  <p class="bg-blue-200 text-2xl p-4">ドライバー情報</p>
  <div class="container mx-auto mt-4">
    <button class="btn btn-primary" @click="fetchDrivers">結果を出力</button>

    <!-- 新しいドライバーの追加フォーム -->
    <div>
      <input
        v-model="newDriver.last_name"
        placeholder="姓"
        @input="validateInput"
      />
      <input
        v-model="newDriver.first_name"
        placeholder="名"
        @input="validateInput"
      />

      <button
        class="btn btn-secondary"
        @click="addDriver(newDriver)"
        :disabled="!isValidNewDriver"
      >
        追加
      </button>
    </div>
  </div>

  <!-- 結果の表示例 -->
  <div>
    <ul>
      <li v-for="driver in getDrivers" :key="driver.id">
        {{ driver.last_name }} {{ driver.first_name }}
        <button @click="deleteDriver(driver.id)">削除</button>
      </li>
    </ul>
  </div>
</template>
