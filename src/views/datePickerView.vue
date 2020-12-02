<template>
    <div>
         <cu-date-picker
            v-model="value1"
            value-format="dd-MM-yyyy HH:mm"
            format="dd-MM-yyyy, HH:mm"
            type="cudaterange"
        >
    </cu-date-picker>
    </div>
</template>

<script>
import cuDatePicker from '@/components/picker/cuDatePicker';

export default {
  components: {
    cuDatePicker,
  },
  data() {
    return {
      value1: ['12-2-2000 23:23', '12-2-2000 23:23'],
    };
  },
};
</script>

<style lang="scss">
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%
}
</style>
