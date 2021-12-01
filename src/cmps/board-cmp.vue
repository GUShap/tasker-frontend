<template>
  <section class="board-container">
      <group-list :groups="currBoard.groups"/>
  </section>
</template>

<script>
import { board } from "../../database.js";
import groupList from "../cmps/group-list.vue";

export default {
  name:'main-board',
  components: {
    groupList
    },
  props: [],

  data() {
    return {
      currBoard: board,
    };
  },
  created() {},
  methods: {},
  computed: {},
  destroyed() {},
};
</script>