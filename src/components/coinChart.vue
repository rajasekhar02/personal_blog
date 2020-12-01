<template>
  <div>
    <el-date-picker v-model="value1" value-format="dd-MM-yyyy"></el-date-picker>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import cryptoCurrentApi from "@/services/cryptoCurrency";
export default {
  props: ["coin_id"],
  components: {
    highcharts: Chart,
  },
  data: function () {
    return {
      chartOptions: {
        series: [],
        yAxis: [
          {
            title: {
              text: "vs INR",
            },
            opposite: true,
          },
          {
            title: {
              text: "market Caps",
            },
            opposite: false,
          },
          {
            title: {
              text: "total volumes",
            },
            opposite: false,
          },
        ],
      },
      value1: "23-12-2012",
    };
  },
  async mounted() {
    await this.initComponent();
  },
  methods: {
    async initComponent() {
      await this.getCoinHistoryByCoinId();
    },
    async getCoinHistoryByCoinId() {
      const response = await cryptoCurrentApi.getCoinHistoryByCoinId(
        this.coin_id,
        this.value1
      );
      const coinData = response.data;
      this.chartOptions.series = Object.keys(response.data).map((x, index) => {
        return {
          data: coinData[x],
          type: "line",
          yAxis: index,
          name: x,
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>