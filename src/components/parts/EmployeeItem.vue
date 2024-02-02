<script lang="ts">
import { Employee } from "../../types";
export default {
  data() {
    return {
      showDetail: false,
    };
  },
  props: {
    employee: {
      type: Object as () => Employee,
      required: true,
    },
    deleteEmployee: {
      type: Function,
      required: true,
    },

    setTargetEmployee: {
      type: Function,
      required: true,
    },
    setShowModal: {
      type: Function,
      required: true,
    },
  },

  methods: {
    toggleDetails() {
      this.showDetail = !this.showDetail;
    },
    handleModal(employee: Employee) {
      this.setTargetEmployee(employee);
      this.setShowModal();
    },
    deleteTarget(employeeId: number) {
      this.deleteEmployee(employeeId);
    },
  },
};
</script>
<template>
  <div class="px-6 py-4 text-left rounded-lg" @click="handleModal(employee)">
    <div class="mb-4 flex justify-between items-center">
      <h3 class="text-xl font-semibold text-gray-800">
        {{ employee.last_name }} {{ employee.first_name }}
      </h3>
      <button
        v-if="employee.id"
        @click.stop="deleteTarget(employee.id)"
        class="p-2 text-red-500 hover:text-red-700 transition-colors duration-200 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <div class="space-y-2">
      <div class="flex flex-wrap -m-1">
        <div v-for="qual in employee.qualifications" :key="qual.id">
          <div class="m-1">
            <div
              class="flex items-center justify-center bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full shadow"
            >
              {{ qual.name }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-base font-medium text-gray-700">
        依存関係: <span v-if="employee.dependencies.length == 0">なし</span>
      </p>
      <ul class="pl-4">
        <li v-for="(dep, index) in employee.dependencies" :key="dep.id">
          {{ index + 1 }}. {{ dep.last_name }} {{ dep.first_name }}
        </li>
      </ul>

      <div v-for="res in employee.restrictions" :key="res.id">
        <p class="text-base text-gray-700">
          <span class="font-medium">{{ res.name }}:</span> {{ res.value }}回
        </p>
      </div>
    </div>
  </div>
</template>
