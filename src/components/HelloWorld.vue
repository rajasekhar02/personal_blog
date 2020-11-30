<template>
  <div class="hello">
   <el-table :data="response.data">
     <el-table-column prop="id"></el-table-column>
     <el-table-column prop="name"></el-table-column>
     <el-table-column prop="symbol"></el-table-column>
   </el-table>
  </div>
</template>

<script>
import cryptoCurrentApi from '@/services/cryptoCurrency';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      response: undefined,
    };
  },
  async mounted() {
    await cryptoCurrentApi.getCurrencyApiStatus();
    const response = await cryptoCurrentApi.getCoinsList();
    console.log(response);
    // this.response = response.data
  },
  methods: {

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
