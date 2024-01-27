<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import { Employee, ChaseChange } from "../../types";

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
        this.addEmployee(employee);
        console.log("こいつを追加処理");
        console.log(employee);
      } else {
        // 更新APIを呼び出し
        this.updateEmployee(employee);
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

    updateEmployee(updatedEmployee: Employee) {
      const changes = {} as ChaseChange;
      Object.keys(updatedEmployee).forEach((key) => {
        if (this.targetEmployee[key] !== updatedEmployee[key]) {
          changes[key] = updatedEmployee[key];
        }
      });
      console.log(changes);
      console.log(updatedEmployee);
      console.log(this.targetEmployee);
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
