<template>
  <div class="hello">
    <ag-grid-vue style="height: 100vh;"
                 class="ag-theme-alpine"
                 :columnDefs="columnDefs"
                 rowSelection="multiple"
                 :rowData="rowData">
    </ag-grid-vue>
  </div>
</template>

<script>
import cryptoCurrentApi from '@/services/cryptoCurrency';
import { AgGridVue } from 'ag-grid-vue';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: {
    AgGridVue,
  },
  data() {
    return {
      columnDefs: null,
      rowData: null,
    };
  },
  beforeMount() {
    this.columnDefs = [
      {
        headerName: 'Coin Id', field: 'id', sortable: true, filter: true,
      },
      {
        headerName: 'Coin Name', field: 'name', sortable: true, filter: true,
      },
      {
        headerName: 'Coin Price', field: 'symbol', sortable: true, filter: true,
      },
    ];
  },
  async created() {
    await this.initComponent();
  },
  methods: {
    async initComponent() {
      try {
        this.loading = true;
        const response = await cryptoCurrentApi.getCoinsList();
        this.rowData = response.data;
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
