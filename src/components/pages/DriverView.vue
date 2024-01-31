<script lang="ts">
import { Driver } from "../../types";
import { mapActions, mapGetters } from "vuex";
import DriverItem from "../parts/DriverItem.vue";

import DriverModal from "../globals/DriverModal.vue";

export default {
  name: "DriverView",
  components: {
    DriverModal,
    DriverItem,
  },
  data() {
    return {
      targetDriver: {
        last_name: "",
        first_name: "",
      } as Driver,
      shoWModal: false,
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
      updateDriver: "driver/updateDriver",
    }),
    initializeState() {
      this.targetDriver = {
        last_name: "",
        first_name: "",
      };
    },

    setTargetDriver(driver: Driver) {
      this.targetDriver = JSON.parse(JSON.stringify(driver)); //employeeにはidがあるがこれでいいのか
    },
    setShowModal() {
      if (this.shoWModal) {
        console.log("EmployeesのtargetEmployeeの初期化");
        this.initializeState();
      }
      this.shoWModal = !this.shoWModal;
    },
    async saveDriver(newDriver: Driver) {
      if (!newDriver.id) {
        this.addDriver(newDriver);
      } else {
        try {
          await this.updateDriver(newDriver);
          this.fetchDrivers();
        } catch (error) {
          console.error(error + "従業員の更新に失敗しました");
        }
      }
    },
  },
};
</script>

<template>
  <!-- 結果の表示例 -->
  <div>
    <ul>
      <li v-for="driver in getDrivers" :key="driver.id">
        <DriverItem
          :driver="driver"
          :deleteDriver="deleteDriver"
          :setShowModal="setShowModal"
          :setTargetDriver="setTargetDriver"
        />
      </li>
    </ul>
    <button
      class="bg-red-500 hover:bg-red-400 text-white rounded px-4 py-2"
      @click="setShowModal"
    >
      ドライバーを追加
    </button>
    <DriverModal
      v-show="shoWModal"
      :closeModal="setShowModal"
      :driver="targetDriver"
      :saveDriver="saveDriver"
    />
  </div>
</template>
