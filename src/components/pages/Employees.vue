<script lang="ts">
import aspida from "@aspida/axios";
import api from "../../../api/$api";

interface TypeOfEmployee {
  first_name: string;
  id: number;
  last_name: string;
}

interface NewEmployee {
  first_name: string;
  last_name: string;
}

interface postRes {
  id: number;
  message: string;
}

export default {
  name: "EmployeeView",
  data() {
    return {
      Employees: [] as TypeOfEmployee[],
      newEmployee: { first_name: "", last_name: "" } as NewEmployee,
    };
  },
  mounted() {
    this.fetchEmployee();
  },
  methods: {
    async fetchEmployee() {
      try {
        const client = api(aspida(this.$axios));
        const response = await client.v1.employees.get();
        console.log(response);

        // レスポンスが正しい場合、Employeesに格納
        if (response.status === 200 && response.body) {
          this.Employees = response.body;
        } else {
          // レスポンスが不正の場合、エラーを投げる
          throw new Error("Invalid response");
        }
      } catch (error) {
        console.error("Error fetching Employees:", error);
      }
    },
    async addEmployee() {
      try {
        const csrfToken = this.$store.getters["csrf/getCsrfAccessToken"];
        const client = api(aspida(this.$axios));
        const headers = {
          "X-CSRF-TOKEN": csrfToken,
        };
        const body = {
          last_name: "テストです",
          first_name: "テス",
          qualifications: [5],
          restrictions: [],
          dependencies: [],
        };
        const response = await client.v1.employees.post({
          body: body,
          config: { headers },
        });

        if (response.status === 200) {
          // this.Employees.push(response.data);
          console.log(response);
          console.log(this.newEmployee);
        } else {
          throw new Error("Failed to add new Employee");
        }
      } catch (error) {
        console.error("Error adding new Employee:", error);
      }
    },
  },
};
</script>

<template>
  <p class="bg-blue-200 text-2xl p-4">Hello World!</p>
  <!-- <div class="container mx-auto mt-4"> -->
  <button class="btn btn-primary" @click="fetchEmployee">結果を出力</button>

  <div>
    <input v-model="newEmployee.first_name" placeholder="名前" />
    <input v-model="newEmployee.last_name" placeholder="苗字" />
    <button class="btn btn-secondary" @click="addEmployee">追加</button>
  </div>

  <!-- 結果の表示例 -->
  <div>
    <ul>
      <li v-for="Employee in Employees" :key="Employee.id">
        {{ Employee.last_name }} {{ Employee.first_name }}
      </li>
    </ul>
  </div>
</template>
