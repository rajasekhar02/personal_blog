<template>
  <div class="about">
    <component :is="currentComponent"></component>
  </div>
</template>
<script>
import Vue from "vue"
import loader from "@/components/loader"
  export default {
    components:{
      loader
    },
    data() {
      return {
        currentComponent:'loader'
      }
    },
    mounted(){
      this.initComponent();
    },
    methods:{
      initComponent(){
        setTimeout( ()=>{
          Vue.component('vScrollerDemo',()=> import('@/components/vScrollerDemo'))
          this.currentComponent='vScrollerDemo'
        },1000)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>