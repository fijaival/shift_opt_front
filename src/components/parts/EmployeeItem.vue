<script lang="ts">
export default {
  data() {
    return {
      showDetail: false,
    };
  },
  props: {
    employee: {
      type: Object,
      required: true,
    },
    deleteEmployee: {
      type: Function,
      required: true,
    },
    handleUpdateModal: {
      type: Function,
      required: true,
    },
  },

  methods: {
    toggleDetails() {
      this.showDetail = !this.showDetail;
    },
  },
};
</script>
<template>
  <span @click="toggleDetails()">
    {{ employee.last_name }} {{ employee.first_name }}
  </span>
  <button @click="deleteEmployee(employee.id)">削除</button>
  <button @click="handleUpdateModal(employee)">更新</button>

  <div v-if="showDetail">
    <div>
      {{ employee.id }}{{ employee.dependencies }} {{ employee.qualifications
      }}{{ employee.restrictions }}
    </div>
  </div>
</template>
