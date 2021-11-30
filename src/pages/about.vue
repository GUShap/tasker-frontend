<template>
  <div class="about">
    <h1>This is an about page</h1>
    <pre>
      {{board}}
    </pre>
  </div>
</template>

<script>

import {board} from '../../database.js';

export default {
  setup() {
    
  },
  data(){
    return{
      board : board
    }
  }
}
</script>