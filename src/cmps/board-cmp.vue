<template>
  <section class="board-container">
    <template v-for="group in currBoard.groups">
      <group-cmp :group="group"  :key="group.id"/>
    </template>
  </section>
</template>

<script>
import { board } from "../../database.js";
import groupCmp from "@/cmps/group-cmp.vue";

export default {
  components: {groupCmp},
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