<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import type { EmployeePostBody } from "../../types/axios";
import { Employee } from "../../types";

import EmployeeModal from "../globals/EmployeeModal.vue";
import EmployeeItem from "../parts/EmployeeItem.vue";

interface ShowDetail {
  id: number;
  showDetails: boolean;
}

export default {
  name: "EmployeeView",
  components: {
    EmployeeModal,
    EmployeeItem,
  },
  data() {
    return {
      targetEmployee: {
        last_name: "",
        first_name: "",
        qualifications: [],
        restrictions: [],
        dependencies: [],
      } as EmployeePostBody,

      showAddModal: false,
      showUpdateModal: false,
    };
  },
  computed: {
    ...mapGetters({
      getEmployees: "employee/getEmployees",
    }),
  },
  mounted() {
    this.fetchEmployes();
  },
  methods: {
    ...mapActions({
      fetchEmployes: "employee/fetchEmployees",
      deleteEmployee: "employee/deleteEmployee",
      addEmployee: "employee/addEmployee",
    }),
    toggleDetails(employee: ShowDetail) {
      employee.showDetails = !employee.showDetails;
    },
    handleAddModal() {
      this.showAddModal = !this.showAddModal;
    },
    initializeState() {
      this.targetEmployee = {
        last_name: "",
        first_name: "",
        qualifications: [],
        restrictions: [],
        dependencies: [],
      };
    },
    setTargetEmployee(employee: Employee) {
      // 更新するターゲットをtargetEmployeeにセットする
      if (!this.showUpdateModal) {
        this.targetEmployee = JSON.parse(JSON.stringify(employee)); //employeeにはidがあるがこれでいいのか
        console.log(employee.id);
      } else {
        console.log("EmployeesのtargetEmployeeの初期化");
        this.initializeState();
      }
    },
    async handleUpdateModal(employee: Employee) {
      console.log(employee);
      this.setTargetEmployee(employee);
      this.showUpdateModal = !this.showUpdateModal;
    },
    removeEmployee(employeeId: number) {
      this.deleteEmployee(employeeId);
    },
  },
  upDateEmployees() {
    // ここで条件分岐して
  },
};
</script>

<template>
  <div>
    <ul>
      <li v-for="employee in getEmployees" :key="employee.id">
        <EmployeeItem
          :employee="employee"
          :deleteEmployee="deleteEmployee"
          :handleUpdateModal="handleUpdateModal"
        />
      </li>
    </ul>
    <button
      class="bg-red-500 hover:bg-red-400 text-white rounded px-4 py-2"
      @click="handleAddModal"
    >
      従業員を追加
    </button>

    <EmployeeModal
      v-show="showAddModal"
      @closeModal="handleAddModal"
      :employee="targetEmployee"
      title="新規従業員登録"
      buttonTitle="追加"
      :handleEmployee="addEmployee"
    />

    <EmployeeModal
      v-show="showUpdateModal"
      @closeModal="handleUpdateModal"
      :employee="targetEmployee"
      title="従業員情報の更新"
      buttonTitle="更新"
      :handleEmployee="addEmployee"
    />
  </div>
</template>
