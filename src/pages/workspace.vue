<template>
<section class="flex column align-center justify-center">
  <a>workspace</a> 
  <header>
  <title>title</title> 
<div>v</div>
<div>v</div>
<div>v</div>
  </header>

<board-filter/>
<group-list/>

</section>
</template>

<script>
import boardFilter from '@/cmps/board-filter.vue';
import groupList from '@/cmps/group-list.vue';
export default {
components:{
  boardFilter,
  groupList
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