<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import EmployeeAddModal from "./EmployeeAddModal.vue";

interface TypeOfEmployee {
  first_name: string;
  id: number;
  last_name: string;
  showDetails: boolean;
}

interface NewEmployee {
  first_name: string;
  last_name: string;
}

// interface postRes {
//   id: number;
//   message: string;
// }

export default {
  name: "EmployeeView",
  components: {
    EmployeeAddModal, // コンポーネントをローカルに登録
  },
  data() {
    return {
      Employees: [] as TypeOfEmployee[],
      newEmployee: { first_name: "", last_name: "" } as NewEmployee,
      showContent: false,
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
    }),
    toggleDetails(employee: TypeOfEmployee) {
      employee.showDetails = !employee.showDetails;
    },
    handleModal() {
      this.showContent = !this.showContent;
    },
  },
};
</script>

<template>
  <!-- <p class="bg-blue-200 text-2xl p-4">Hello World!</p> -->
  <!-- <div class="container mx-auto mt-4"> -->
  <!-- <button class="btn btn-primary" @click="fetchEmployes">結果を出力</button> -->

  <!-- <div>
    <input v-model="newEmployee.first_name" placeholder="名前" />
    <input v-model="newEmployee.last_name" placeholder="苗字" />
    <button class="btn btn-secondary" @click="addEmployee">追加</button>
  </div> -->

  <!-- 結果の表示例 -->
  <div>
    <ul>
      <li v-for="employee in getEmployees" :key="employee.id">
        <span @click="toggleDetails(employee)">
          {{ employee.last_name }} {{ employee.first_name }}
        </span>
        <button @click="deleteEmployee(employee.id)">削除</button>

        <div v-if="employee.showDetails">
          <!-- または v-show="employee.showDetails" -->
          <div>
            {{ employee.id }}{{ employee.dependencies }}
            {{ employee.qualifications }}{{ employee.restrictions }}
          </div>
        </div>
      </li>
    </ul>
    <button
      class="bg-red-500 hover:bg-red-400 text-white rounded px-4 py-2"
      @click="handleModal"
    >
      従業員を追加
    </button>

    <EmployeeAddModal v-show="showContent" @from-child="handleModal" />
  </div>
</template>
