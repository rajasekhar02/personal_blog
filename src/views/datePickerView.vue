<template>
  <div>
    <cu-date-picker
      v-model="value1"
      :unlink-panels="true"
      value-format="dd-MM-yyyy"
      format="dd-MM-yyyy"
      type="cudaterange"
    >
    </cu-date-picker>
  </div>
</template>

<script>
import cuDatePicker from "@/components/picker/cuDatePicker";

export default {
  components: {
    cuDatePicker,
  },
  data() {
    return {
      value1: ["12-2-2000", "12-2-2000"],
    };
  },
};
</script>

<style lang="scss">
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
