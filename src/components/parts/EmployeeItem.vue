<script lang="ts">
import { Employee } from "../..//types";
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
  },
};
</script>
<template>
  <span @click="toggleDetails()">
    {{ employee.last_name }} {{ employee.first_name }}
  </span>
  <button @click="deleteEmployee(employee.id)">削除</button>
  <button @click="handleModal(employee)">更新</button>

  <div v-if="showDetail">
    <div>
      {{ employee.id }}
      <div>
        依存関係{{ employee.dependencies.length }}：{{ employee.dependencies }}
      </div>
      <div>
        資格{{ employee.qualifications.length }}:{{ employee.qualifications }}
      </div>
      <div>
        制約条件{{ employee.restrictions.length }}: {{ employee.restrictions }}
      </div>
    </div>
  </div>
</template>
