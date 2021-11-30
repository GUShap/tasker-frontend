<template>
  <div class="home">
    <h1>Home</h1>
    <main-nav/>
    <router-view/>
  </div>
</template>

<script>
import mainNav from '@/cmps/main-nav.vue';

export default {
 components:{
   mainNav
 },
 props:[],
 data(){
 return{
 }
 },
 created(){
 },
 methods: {
 },
 computed:{
 },
 destroyed(){
 }
 }
</script>
