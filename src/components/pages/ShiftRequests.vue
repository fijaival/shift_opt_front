<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Employee ID</th>
          <th v-for="day in daysOfMonth" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in getEmployees" :key="employee.id">
          <td>{{ employee.last_name }} {{ employee.first_name }}</td>
          <td v-for="day in daysOfMonth" :key="day">
            {{ getVacationType(employee.id, day) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>{{ getRequests }}</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      month: "2023-11",
    };
  },
  computed: {
    ...mapGetters({
      getEmployees: "employee/getEmployees",
      getRequests: "request/getRequests",
    }),
    daysOfMonth() {
      const year = parseInt(this.month.split("-")[0]);
      const month = parseInt(this.month.split("-")[1]);
      const daysInMonth = new Date(year, month, 0).getDate();
      return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    },
    employees() {
      const employeeIds = new Set(
        this.getRequests.map((vacation) => vacation.employee_id)
      );
      return [...employeeIds];
    },
  },
  mounted() {
    this.loadRequests({ year: 2023, month: 11 });
    console.log(this.getEmployees);
  },
  methods: {
    ...mapActions({
      loadRequests: "request/loadRequests",
    }),
    getVacationType(employeeId, day) {
      const date = `${this.month}-${day.toString().padStart(2, "0")}`;
      const vacation = this.getRequests.find(
        (vacation) =>
          vacation.employee_id === employeeId && vacation.date === date
      );
      return vacation ? vacation.type_of_vacation : "";
    },
  },
};
</script>
