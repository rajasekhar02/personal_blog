<template>
  <div>
    From:<el-date-picker
      v-model="value1"
      value-format="dd-MM-yyyy"
      @change="getCoinHistoryByCoinId"
    ></el-date-picker>
    <el-button id="button"></el-button>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue';
import cryptoCurrentApi from '@/services/cryptoCurrency';
import { DateTime } from 'luxon';
import Worker from '@/worker/parser.worker.js';

export default {
  props: ['coin_id'],
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      chartOptions: {
        series: [],
        yAxis: [
          {
            title: {
              text: 'vs INR',
            },
            opposite: true,
          },
          {
            title: {
              text: 'market Caps',
            },
            opposite: false,
          },
          {
            title: {
              text: 'total volumes',
            },
            opposite: false,
          },
        ],
      },
      format: 'dd-MM-yyyy',
      value1: '23-11-2020',
      worker: undefined,
    };
  },
  async mounted() {
    await this.initComponent();
    this.registerWorker();
  },
  methods: {
    registerWorker() {
      this.worker = new Worker();
      let result;
      this.worker.onmessage = function (event) {
        if (!result) {
          result = document.createElement('div');
          result.setAttribute('id', 'result');

          document.body.append(result);
        }
        result.innerText = JSON.stringify(event.data);
      };
      const button = document.getElementById('button');
      button.addEventListener('click', () => {
        this.worker.postMessage({ postMessage: true });
      });
    },
    getDateDiff(timeZone) {
      const endDate = DateTime.local();
      const startDate = DateTime.fromFormat(this.value1, this.format);
      return endDate.diff(startDate, 'days').toObject();
    },
    async initComponent() {
      await this.getCoinHistoryByCoinId();
    },
    async getCoinHistoryByCoinId() {
      const dateDiff = this.getDateDiff().days;
      const response = await cryptoCurrentApi.getCoinHistoryByCoinId(
        this.coin_id,
        dateDiff,
      );
      const coinData = response.data;
      this.chartOptions.series = Object.keys(response.data).map((x, index) => ({
        data: coinData[x],
        type: 'line',
        yAxis: index,
        name: x,
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
