<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <agGridDemo></agGridDemo> -->
    <widget-vue prop1="1" prop2="string" prop3="true"></widget-vue>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import agGridDemo from '@/components/agGridDemo.vue'
import Vue from "vue"
export default {
  name: 'home',
  components: {
    HelloWorld,
    agGridDemo
  },
  beforeCreate(){
   Vue.customElement('widget-vue', {
    props: [
      'prop1',
      'prop2',
      'prop3'
    ],
    data: function(){
      return{
        message: 'Hello Vue!'
      }
    },
    template: '<p>{{ message }}, {{ prop1  }}, {{prop2}}, {{prop3}}</p>'
  });
  }
}
</script>
