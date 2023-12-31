<script lang="ts">
import { reactive } from "vue";

interface TypeOfDriver {
  id: number;
  firstName: string;
  lastName: string;
}

interface TypeOfDrivers {
  [id: number]: TypeOfDriver;
}

const drivers = reactive<TypeOfDrivers>({});

export default {
  name: "DriverView",
  data() {
    return {
      id: 0,
      firstName: "",
      lastName: "",
    };
  },
  methods: {
    async fetchDriver() {
      try {
        const response = await this.$axios.get("/drivers", {
          withCredentials: true,
        });
        // 例: response.data が TypeOfDriver 型のデータを返すと仮定
        if (
          response.data &&
          response.data.firstName &&
          response.data.lastName
        ) {
          this.firstName = response.data.firstName;
          this.lastName = response.data.lastName;
        } else {
          console.error("Invalid data structure received");
        }
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    },
  },
};
</script>

<template>
  <p class="bg-blue-200 text-2xl p-4">Hello World!</p>
  <div class="container mx-auto mt-4">
    <button class="btn btn-primary" @click="fetchDriver">結果を出力</button>
  </div>
  <!-- 結果の表示例 -->
  <div v-if="firstName && lastName">
    <p>First Name: {{ firstName }}</p>
    <p>Last Name: {{ lastName }}</p>
  </div>
</template>
