<template>
    <div>
        <coin-chart :props="coin_id"></coin-chart>
    </div>
</template>

<script>
import coinChart from "@/components/coinChart";
    export default {
        props:[
            'coin_id'
        ],
        components:{
            coinChart
        },
        data:function(){
            return{
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>