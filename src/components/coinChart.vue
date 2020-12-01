<template>
  <div>
    From:<el-date-picker
      v-model="value1"
      value-format="dd-MM-yyyy"
      @change="getCoinHistoryByCoinId"
    ></el-date-picker>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import cryptoCurrentApi from "@/services/cryptoCurrency";
import { DateTime } from "luxon";
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
      format: "dd-MM-yyyy",
      value1: "23-11-2020",
    };
  },
  async mounted() {
    await this.initComponent();
  },
  methods: {
    getDateDiff(timeZone) {
      const endDate = DateTime.local();
      const startDate = DateTime.fromFormat(this.value1, this.format);
      return endDate.diff(startDate, "days").toObject();
    },
    async initComponent() {
      await this.getCoinHistoryByCoinId();
    },
    async getCoinHistoryByCoinId() {
      const dateDiff = this.getDateDiff().days;
      const response = await cryptoCurrentApi.getCoinHistoryByCoinId(
        this.coin_id,
        dateDiff
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