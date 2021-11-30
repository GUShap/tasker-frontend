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
<board/>

</section>
</template>

<script>
import boardFilter from '@/cmps/board-filter.vue';
import board from '@/cmps/board.vue';
export default {
components:{
  boardFilter,
  board
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