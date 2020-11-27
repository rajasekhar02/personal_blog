<template>
  <div class="hello">
    <recycle-scroller
      class="scroller"
      :items="rowData"
      direction="vertical"
      :pageMode="true"
      :buffer="50"
      :item-size="32"
      key-field="id"
      v-slot="{ item }"
    >
      <el-row>
        <el-col :span="8">
          <el-input v-model="item.name"> </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="item.name"> </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="item.name"> </el-input>
        </el-col>
      </el-row>
    </recycle-scroller>
  </div>
</template>

<script>
import cryptoCurrentApi from "@/services/cryptoCurrency";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data: function () {
    return {
      columnDefs: null,
      rowData: [],
    };
  },
  beforeMount() {
    this.columnDefs = [
      { headerName: "Coin Id", field: "id", sortable: true, filter: true },
      { headerName: "Coin Name", field: "name", sortable: true, filter: true },
      {
        headerName: "Coin Price",
        field: "symbol",
        sortable: true,
        filter: true,
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
