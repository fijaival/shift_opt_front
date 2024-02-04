<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import { Employee, EmployeeWithId } from "../../types";

import EmployeeModal from "../parts/employee/EmployeeModal.vue";
import EmployeeItem from "../parts/employee/EmployeeItem.vue";

import organizeData from "../../utils/organizeData";

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
    this.loadEmployees();
  },
  methods: {
    ...mapActions({
      loadEmployees: "employee/loadEmployees",
      removeEmployee: "employee/removeEmployee",
      createEmployee: "employee/createEmployee",
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

    async saveEmployee(employee: Employee) {
      if (!employee.id) {
        try {
          await this.createEmployee(employee);

          this.loadEmployees();
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
        try {
          await this.updateEmployee(change);
          this.loadEmployees();
        } catch (error) {
          console.error(error + "従業員の更新に失敗しました。");
        }
      }
    },

    deleteEmployee(employeeId: number) {
      this.removeEmployee(employeeId);
    },

    setTargetEmployee(employee: EmployeeWithId) {
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
  <div class="container mx-auto px-4">
    <div
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr"
    >
      <div
        class="max-w-sm cursor-pointer overflow-hidden rounded shadow-lg hover:bg-gray-100"
        v-for="employee in getEmployees"
        :key="employee.id"
      >
        <EmployeeItem
          :employee="employee"
          :deleteEmployee="deleteEmployee"
          :setShowModal="setShowModal"
          :setTargetEmployee="setTargetEmployee"
        />
      </div>
      <div
        class="max-w-sm cursor-pointer overflow-hidden rounded shadow-lg hover:bg-gray-100"
      >
        <div
          class="flex h-ful min-h-48 items-center justify-center"
          @click="setShowModal"
        >
          <div class="text-xl font-bold">＋追加</div>
        </div>
      </div>
    </div>
    <EmployeeModal
      v-show="shoWModal"
      :closeModal="setShowModal"
      :employee="targetEmployee"
      :saveEmployee="saveEmployee"
    />
  </div>
</template>
