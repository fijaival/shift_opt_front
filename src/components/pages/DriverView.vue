<script lang="ts">
import { Driver } from "../../types";
import { mapActions, mapGetters } from "vuex";
import DriverItem from "../parts/driver/DriverItem.vue";

import DriverModal from "../parts/driver/DriverModal.vue";

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
    this.loadDrivers();
  },
  methods: {
    ...mapActions({
      loadDrivers: "driver/loadDrivers",
      createDriver: "driver/createDriver",
      removeDriver: "driver/removeDriver",
      updateDriver: "driver/updateDriver",
    }),
    initializeState() {
      this.targetDriver = {
        last_name: "",
        first_name: "",
      };
    },

    setTargetDriver(driver: Driver) {
      this.targetDriver = JSON.parse(JSON.stringify(driver)); //driverにはidがあるがこれでいいのか
    },
    setShowModal() {
      console.log(this.getDrivers);
      if (this.shoWModal) {
        console.log("EmployeesのtargetEmployeeの初期化");
        this.initializeState();
      }
      this.shoWModal = !this.shoWModal;
    },
    async saveDriver(newDriver: Driver) {
      if (!newDriver.id) {
        this.createDriver(newDriver);
      } else {
        try {
          await this.updateDriver(newDriver);
          this.loadDrivers();
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
  <div class="flex flex-wrap -m-2 max-w-4xl mx-auto">
    <div class="p-2 w-full" v-for="driver in getDrivers" :key="driver.id">
      <DriverItem
        :driver="driver"
        :deleteDriver="removeDriver"
        :setShowModal="setShowModal"
        :setTargetDriver="setTargetDriver"
      />
    </div>
    <div
      class="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
      @click="setShowModal"
    >
      <div
        class="max-w-sm cursor-pointer overflow-hidden rounded shadow-lg hover:bg-gray-100 bg-white rounded-lg shadow-lg p-5"
      >
        <div class="text-xl font-bold">＋追加</div>
      </div>
    </div>
    <DriverModal
      v-show="shoWModal"
      :closeModal="setShowModal"
      :driver="targetDriver"
      :saveDriver="saveDriver"
    />
  </div>
</template>
