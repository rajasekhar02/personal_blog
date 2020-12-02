<template>
  <div>
    <coin-chart :coin_id="coin_id"></coin-chart>
  </div>
</template>

<script>
import coinChart from '@/components/coinChart';

export default {
  props: ['coin_id'],
  components: {
    coinChart,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>
