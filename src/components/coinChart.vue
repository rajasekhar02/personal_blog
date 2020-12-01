<template>
    <div>
        <highcharts :options="chartOptions"></highcharts>
        {{coin_id}}
    </div>
</template>

<script>
import {Chart} from "highcharts-vue";
    export default {
        props:[
            'coin_id'
        ],
        components:{
            highcharts:Chart
        },
        data:function(){
            return{
                chartOptions:{
                    series:[{
          data: [1,2,3] // sample data
        }]
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>