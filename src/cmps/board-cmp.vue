<template>
  <section>
    <h1>group</h1>
    <section v-for="(group, idx) in currBoard.groups" :key="idx">
      <group-cmp :group="group" />
    </section>
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