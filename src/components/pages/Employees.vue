<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import type { NewEmployee, Employee } from "../../types";

import EmployeeModal from "../globals/EmployeeModal.vue";

interface TypeOfEmployee {
  first_name: string;
  id: number;
  last_name: string;
  showDetails: boolean;
}

export default {
  name: "EmployeeView",
  components: {
    EmployeeModal,
  },
  data() {
    return {
      Employees: [] as TypeOfEmployee[],
      targetEmployee: {
        last_name: "",
        first_name: "",
        qualifications: [],
        restrictions: [],
        dependencies: [],
      } as NewEmployee,

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
    toggleDetails(employee: TypeOfEmployee) {
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
        this.targetEmployee.first_name = employee.first_name;
        this.targetEmployee.last_name = employee.last_name;
        employee.dependencies.map((dep) => {
          this.targetEmployee.qualifications.push(dep.id);
        });
        employee.qualifications.map((qual) => {
          if (qual.id) {
            this.targetEmployee.qualifications.push(qual.id);
          }
        });
        employee.restrictions.map((rest) => {
          const tmpRest = { id: rest.id, value: rest.value };
          this.targetEmployee.restrictions.push(tmpRest);
        });
      } else {
        this.initializeState();
      }
      console.log(this.targetEmployee);
    },
    async handleUpdateModal(employee: Employee) {
      this.setTargetEmployee(employee);
      this.showUpdateModal = !this.showUpdateModal;
    },
    removeEmployee(employeeId: number) {
      this.deleteEmployee(employeeId);
    },
  },
};
</script>

<template>
  <div>
    <ul>
      <li v-for="employee in getEmployees" :key="employee.id">
        <span @click="toggleDetails(employee)">
          {{ employee.last_name }} {{ employee.first_name }}
        </span>
        <button @click="deleteEmployee(employee.id)">削除</button>
        <button @click="handleUpdateModal(employee)">更新</button>

        <div v-if="employee.showDetails">
          <div>
            {{ employee.id }}{{ employee.dependencies }}
            {{ employee.qualifications }}{{ employee.restrictions }}
          </div>
        </div>
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
      v-if="!targetEmployee.first_name"
      @closeModal="handleAddModal"
      :employee="targetEmployee"
      title="新規従業員登録"
      buttonTitle="追加"
      :handleEmployee="addEmployee"
    />

    <EmployeeModal
      v-show="showUpdateModal"
      v-if="targetEmployee.first_name"
      @closeModal="handleUpdateModal"
      :employee="targetEmployee"
      title="従業員情報の更新"
      buttonTitle="更新"
      :handleEmployee="addEmployee"
    />
  </div>
</template>
