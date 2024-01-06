<script lang="ts">
import aspida from "@aspida/axios";
import api from "../../../api/$api";

interface Driver {
  id: number;
  first_name: string;
  last_name: string;
}

interface DriverName {
  first_name: string;
  last_name: string;
}

interface PostResponse {
  id: number;
  message: string;
}

export default {
  name: "DriverView",
  data() {
    return {
      drivers: [] as Driver[],
      newDriver: { first_name: "", last_name: "" } as DriverName,
      isValidNewDriver: false,
    };
  },
  mounted() {
    this.fetchDrivers();
  },
  methods: {
    async fetchDrivers() {
      try {
        const client = api(aspida(this.$axios));
        const response = await client.v1.drivers.get();

        if (response.status === 200 && response.body) {
          this.drivers = response.body;
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (error) {
        console.error("Error fetching drivers: ", error);
      }
    },
    async addDriver() {
      try {
        const csrfToken = this.$store.getters["csrf/getCsrfAccessToken"];
        const client = api(aspida(this.$axios));
        const headers = {
          "X-CSRF-TOKEN": csrfToken,
        };
        const response = await client.v1.drivers.post({
          body: this.newDriver,
          config: { headers },
        });
        console.log(response);

        if (response.status === 201) {
          const newDriverResponse: PostResponse = response.body;
          this.drivers.push({
            id: newDriverResponse.id,
            ...this.newDriver,
          });
          this.newDriver = { first_name: "", last_name: "" };
          this.isValidNewDriver = false;
        } else {
          throw new Error("Failed to add new driver");
        }
      } catch (error) {
        console.log(error);
        console.error("Error adding new driver: ", error);
      }
    },

    async deleteDriver(driverId: number) {
      try {
        const csrfToken = this.$store.getters["csrf/getCsrfAccessToken"];
        const client = api(aspida(this.$axios));
        const headers = {
          "X-CSRF-TOKEN": csrfToken,
        };
        const response = await client.v1.drivers._driverId(driverId).delete({
          config: { headers },
        });
        console.log(response);
        if (response.status === 200) {
          this.drivers = this.drivers.filter(
            (driver) => driver.id !== driverId
          );
        } else {
          throw new Error("Failed to delete driver");
        }
      } catch (error) {
        console.error("Error deleting driver: ", error);
      }
    },

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
        @click="addDriver"
        :disabled="!isValidNewDriver"
      >
        追加
      </button>
    </div>
  </div>

  <!-- 結果の表示例 -->
  <div>
    <ul>
      <li v-for="driver in drivers" :key="driver.id">
        {{ driver.last_name }} {{ driver.first_name }}
        <button @click="deleteDriver(driver.id)">削除</button>
      </li>
    </ul>
  </div>
</template>
