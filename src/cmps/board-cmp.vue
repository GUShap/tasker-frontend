<template>
  <section class="board-container">
    <group-list :groups="currGroups" />
  </section>
</template>

<script>
// import { board } from "../../database.js";
import groupList from "../cmps/group-list.vue";

export default {
  name: "main-board",
  components: {
    groupList,
  },
  props: ["board"],

  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {
    currGroups() {
      if (this.board) {
        return this.board.groups;
      } else {
        return null;
      }
    },
  },
  destroyed() {},
};
</script>