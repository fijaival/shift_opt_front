<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import { newEmployee } from "../../types";

export default {
  name: "EmployeeAddModal",
  data() {
    return {
      newEmployee: {
        last_name: "",
        first_name: "",
        qualifications: [],
        restrictions: [],
        dependencies: [],
      } as newEmployee,
      isValidNewEmployee: false,
      restrictionInputs: [
        {
          selectedRestrictionId: null as number | null,
          value: null as number | null,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getEmployees: "employee/getEmployees",
      getQualifications: "qualification/getQualifications",
      getRestrictions: "restriction/getRestrictions",
    }),
  },

  methods: {
    ...mapActions({
      addEmployee: "employee/addEmployee",
    }),
    clickEvent() {
      this.$emit("from-child");
    },
    stopEvent(event: Event) {
      event.stopPropagation();
    },
    validateInput() {
      this.isValidNewEmployee =
        this.newEmployee.first_name.trim() !== "" &&
        this.newEmployee.last_name.trim() !== "";
    },
    updateQualifications(qualificationId: number) {
      const index = this.newEmployee.qualifications.indexOf(qualificationId);
      if (index === -1) {
        // 資格がまだリストにない場合、リストに追加する
        this.newEmployee.qualifications.push(qualificationId);
      } else {
        // 既にリストに存在する場合、リストから削除する
        this.newEmployee.qualifications.splice(index, 1);
      }
    },
    addRestrictionInput() {
      this.restrictionInputs.push({ selectedRestrictionId: null, value: null });
    },
    removeRestriction(index: any) {
      this.restrictionInputs.splice(index, 1);
    },
    async submitRestrictions() {
      this.newEmployee.restrictions = this.restrictionInputs
        .filter((ri) => ri.selectedRestrictionId !== null && ri.value !== null)
        .map((ri) => ({
          id: ri.selectedRestrictionId as number,
          value: ri.value as number,
        }));
    },
    updateDependencies(dependenciesID: number) {
      const index = this.newEmployee.dependencies.indexOf(dependenciesID);
      if (index === -1) {
        // 資格がまだリストにない場合、リストに追加する
        this.newEmployee.dependencies.push(dependenciesID);
      } else {
        // 既にリストに存在する場合、リストから削除する
        this.newEmployee.dependencies.splice(index, 1);
      }
    },
    async registerNewEmployee() {
      await this.submitRestrictions();
      console.log(this.newEmployee);
      this.addEmployee(this.newEmployee);
      // this.addEmployee(this.newEmployee)
    },
  },
};
</script>
<template>
  <div id="overlay" @click="clickEvent">
    <div id="content" @click="stopEvent">
      <div>
        <input
          v-model="newEmployee.last_name"
          placeholder="姓"
          @input="validateInput"
        />
        <input
          v-model="newEmployee.first_name"
          placeholder="名"
          @input="validateInput"
        />
      </div>

      <br />
      <div v-for="qualification in getQualifications" :key="qualification.id">
        <input
          type="checkbox"
          :value="qualification.id"
          @change="updateQualifications(qualification.id)"
        />
        {{ qualification.name }}
      </div>
      <br />
      <div>回数制限</div>
      <div v-for="(restrictionInput, index) in restrictionInputs" :key="index">
        <select v-model="restrictionInput.selectedRestrictionId">
          <option
            v-for="restriction in getRestrictions"
            :key="restriction.id"
            :value="restriction.id"
          >
            {{ restriction.name }}
          </option>
        </select>
        最大
        <input
          type="number"
          v-model="restrictionInput.value"
          placeholder="数値を入力"
        />回
        <button @click="removeRestriction(index)">削除</button>
      </div>
      <button @click="addRestrictionInput">+ 追加</button>
      <br />
      <button @click="submitRestrictions">制限を保存</button>

      <div>
        <p>必要な従業員</p>
        <select v-model="newEmployee.dependencies[0]">
          <option
            v-for="employee in getEmployees"
            :key="employee.id"
            :value="employee.id"
          >
            {{ employee.last_name }} {{ employee.first_name }}
          </option>
        </select>
      </div>
      <button
        class="bg-red-500 hover:bg-red-400 text-white rounded px-4 py-2"
        @click="registerNewEmployee"
      >
        追加
      </button>

      <p><button @click="clickEvent">cancel</button></p>
    </div>
  </div>
</template>

<style scoped>
#overlay {
  /*　要素を重ねた時の順番　*/
  z-index: 1;

  /*　画面全体を覆う設定　*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  /*　画面の中央に要素を表示させる設定　*/
  display: flex;
  align-items: center;
  justify-content: center;
}

#content {
  z-index: 2;
  width: 80%;
  padding: 1em;
  background: #fff;
}
</style>
