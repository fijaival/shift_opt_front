<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import { Employee, EmployeeWithId } from "../../types";

import EmployeeModal from "../globals/EmployeeModal.vue";
import EmployeeItem from "../parts/EmployeeItem.vue";

import organizeData from "../../lib/organizeData";

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
      } as Employee,

      shoWModal: false,
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
      updateEmployee: "updateEmployee/updateEmployee",
    }),
    toggleDetails(employee: ShowDetail) {
      employee.showDetails = !employee.showDetails;
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

    // 未実装
    async saveEmployee(employee: Employee) {
      if (!employee.id) {
        try {
          await this.addEmployee(employee);

          this.fetchEmployes();
        } catch (error) {
          console.error("Employee fetchエラー", error);
        }
      } else {
        // 更新APIを呼び出し
        const change = organizeData(
          employee as EmployeeWithId,
          this.targetEmployee
        );
        console.log(change);
        // const body = change.restrictions.post[0];
        // console.log(body);
        await this.updateEmployee(change);

        // もしすべての処理が上手くいけば
        this.fetchEmployes();
      }
    },

    removeEmployee(employeeId: number) {
      this.deleteEmployee(employeeId);
    },

    setTargetEmployee(employee: Employee) {
      this.targetEmployee = JSON.parse(JSON.stringify(employee)); //employeeにはidがあるがこれでいいのか
    },
    setShowModal() {
      if (this.shoWModal) {
        console.log("EmployeesのtargetEmployeeの初期化");
        this.initializeState();
      }
      this.shoWModal = !this.shoWModal;
    },
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
          :setShowModal="setShowModal"
          :setTargetEmployee="setTargetEmployee"
        />
      </li>
    </ul>
    <button
      class="bg-red-500 hover:bg-red-400 text-white rounded px-4 py-2"
      @click="setShowModal"
    >
      従業員を追加
    </button>

    <EmployeeModal
      v-show="shoWModal"
      :closeModal="setShowModal"
      :employee="targetEmployee"
      :saveEmployee="saveEmployee"
    />
  </div>
</template>
